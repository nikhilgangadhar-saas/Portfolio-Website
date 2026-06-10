<?php
header("Access-Control-Allow-Origin: https://dev.nikhilgangadhar.com");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once '/home/u312587281/domains/nikhilgangadhar.com/ng-config.php';

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Method not allowed"]);
    exit;
}

$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Invalid JSON"]);
    exit;
}

$firstName = trim($data["firstName"] ?? "");
$lastName = trim($data["lastName"] ?? "");
$email = strtolower(trim($data["email"] ?? ""));
$phone = trim($data["phone"] ?? "");
$company = trim($data["company"] ?? "");
$roleTitle = trim($data["roleTitle"] ?? "");
$country = trim($data["country"] ?? "");
$linkedinUrl = trim($data["linkedinUrl"] ?? "");
$demoItemCode = trim($data["demoItemCode"] ?? "");
$message = trim($data["message"] ?? "");
$sourcePage = trim($data["sourcePage"] ?? "");

$userIp = $_SERVER["REMOTE_ADDR"] ?? "";
$userAgent = $_SERVER["HTTP_USER_AGENT"] ?? "";

if (
    $firstName === "" ||
    $lastName === "" ||
    $email === "" ||
    $company === "" ||
    $roleTitle === "" ||
    $country === "" ||
    $demoItemCode === ""
) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Please complete all required fields."
    ]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Please enter a valid email address."
    ]);
    exit;
}

if ($linkedinUrl !== "" && !filter_var($linkedinUrl, FILTER_VALIDATE_URL)) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Please enter a valid LinkedIn URL or leave it blank."
    ]);
    exit;
}

try {
    $pdo = new PDO(
        "mysql:host=$DB_HOST;dbname=$DB_NAME;charset=utf8mb4",
        $DB_USER,
        $DB_PASS,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]
    );

    $pdo->beginTransaction();

    $itemStmt = $pdo->prepare("
        SELECT id, item_code, item_title, item_type, is_active, is_coming_soon, access_cost_count, delivery_mode
        FROM demo_items
        WHERE item_code = :item_code
        LIMIT 1
    ");

    $itemStmt->execute([
        ":item_code" => $demoItemCode
    ]);

    $demoItem = $itemStmt->fetch();

    if (!$demoItem || (int)$demoItem["is_active"] !== 1) {
        $pdo->rollBack();

        http_response_code(400);
        echo json_encode([
            "success" => false,
            "message" => "The selected demo item is not available."
        ]);
        exit;
    }

    if ((int)$demoItem["is_coming_soon"] === 1) {
        $pdo->rollBack();

        http_response_code(400);
        echo json_encode([
            "success" => false,
            "message" => "This demo is marked as coming soon. Please select an available item."
        ]);
        exit;
    }

    $userStmt = $pdo->prepare("
        SELECT id
        FROM demo_users
        WHERE email = :email
        LIMIT 1
    ");

    $userStmt->execute([
        ":email" => $email
    ]);

    $existingUser = $userStmt->fetch();

    if ($existingUser) {
        $userId = (int)$existingUser["id"];

        $updateUserStmt = $pdo->prepare("
            UPDATE demo_users
            SET
                first_name = :first_name,
                last_name = :last_name,
                phone = :phone,
                company = :company,
                role_title = :role_title,
                country = :country,
                linkedin_url = :linkedin_url
            WHERE id = :id
        ");

        $updateUserStmt->execute([
            ":first_name" => $firstName,
            ":last_name" => $lastName,
            ":phone" => $phone !== "" ? $phone : null,
            ":company" => $company,
            ":role_title" => $roleTitle,
            ":country" => $country,
            ":linkedin_url" => $linkedinUrl !== "" ? $linkedinUrl : null,
            ":id" => $userId
        ]);
    } else {
        $insertUserStmt = $pdo->prepare("
            INSERT INTO demo_users
            (
                first_name,
                last_name,
                email,
                phone,
                company,
                role_title,
                country,
                linkedin_url
            )
            VALUES
            (
                :first_name,
                :last_name,
                :email,
                :phone,
                :company,
                :role_title,
                :country,
                :linkedin_url
            )
        ");

        $insertUserStmt->execute([
            ":first_name" => $firstName,
            ":last_name" => $lastName,
            ":email" => $email,
            ":phone" => $phone !== "" ? $phone : null,
            ":company" => $company,
            ":role_title" => $roleTitle,
            ":country" => $country,
            ":linkedin_url" => $linkedinUrl !== "" ? $linkedinUrl : null
        ]);

        $userId = (int)$pdo->lastInsertId();
    }

    $countStmt = $pdo->prepare("
        SELECT COALESCE(SUM(di.access_cost_count), 0) AS used_access_count
        FROM demo_access_requests dar
        JOIN demo_items di ON di.id = dar.demo_item_id
        WHERE dar.user_id = :user_id
          AND dar.status IN ('REQUESTED', 'EMAIL_SENT', 'ACCESS_GRANTED')
    ");

    $countStmt->execute([
        ":user_id" => $userId
    ]);

    $usedAccessCount = (int)($countStmt->fetch()["used_access_count"] ?? 0);
    $requestedCost = (int)$demoItem["access_cost_count"];

    if (($usedAccessCount + $requestedCost) > 3) {
        $limitStmt = $pdo->prepare("
            INSERT INTO demo_access_requests
            (
                user_id,
                demo_item_id,
                status,
                message,
                user_ip,
                user_agent
            )
            VALUES
            (
                :user_id,
                :demo_item_id,
                'LIMIT_REACHED',
                :message,
                :user_ip,
                :user_agent
            )
        ");

        $limitStmt->execute([
            ":user_id" => $userId,
            ":demo_item_id" => (int)$demoItem["id"],
            ":message" => $message !== "" ? $message : null,
            ":user_ip" => $userIp,
            ":user_agent" => $userAgent
        ]);

        $pdo->commit();

        echo json_encode([
            "success" => false,
            "limitReached" => true,
            "message" => "You have already used the available demo access limit. Please contact me for a walkthrough or extended access."
        ]);
        exit;
    }

    $accessToken = bin2hex(random_bytes(32));
    $tokenExpiresAt = null;

    if ($demoItem["item_type"] === "SQL_PLAYGROUND") {
        $tokenExpiresAt = date("Y-m-d H:i:s", strtotime("+30 minutes"));
    } elseif ($demoItem["item_type"] === "APP_TRIAL") {
        $tokenExpiresAt = date("Y-m-d H:i:s", strtotime("+7 days"));
    } else {
        $tokenExpiresAt = date("Y-m-d H:i:s", strtotime("+7 days"));
    }

    $insertRequestStmt = $pdo->prepare("
        INSERT INTO demo_access_requests
        (
            user_id,
            demo_item_id,
            status,
            access_token,
            token_expires_at,
            message,
            delivery_email_sent_at,
            user_ip,
            user_agent
        )
        VALUES
        (
            :user_id,
            :demo_item_id,
            'EMAIL_SENT',
            :access_token,
            :token_expires_at,
            :message,
            NOW(),
            :user_ip,
            :user_agent
        )
    ");

    $insertRequestStmt->execute([
        ":user_id" => $userId,
        ":demo_item_id" => (int)$demoItem["id"],
        ":access_token" => $accessToken,
        ":token_expires_at" => $tokenExpiresAt,
        ":message" => $message !== "" ? $message : null,
        ":user_ip" => $userIp,
        ":user_agent" => $userAgent
    ]);

    $requestId = (int)$pdo->lastInsertId();

    $pdo->commit();

    $fullName = $firstName . " " . $lastName;
    $demoTitle = $demoItem["item_title"];
    $deliveryMode = $demoItem["delivery_mode"];

    $baseUrl = "https://dev.nikhilgangadhar.com";

    $accessLink = $baseUrl . "/demos";
    $deliveryNote = "I will share the requested demo asset or next step on this email address.";

    if ($deliveryMode === "TOKEN_LINK" && $demoItem["item_type"] === "SQL_PLAYGROUND") {
        $accessLink = $baseUrl . "/demos/sql-playground?token=" . urlencode($accessToken);
        $deliveryNote = "Your SQL Playground link is active for 30 minutes from the time of request.";
    } elseif ($deliveryMode === "APP_REDIRECT") {
        $accessLink = $baseUrl . "/demos";
        $deliveryNote = "Your app trial request has been received. Trial access details will be shared once the demo environment is ready.";
    } elseif ($deliveryMode === "WHATSAPP_ACTIVATION") {
        $accessLink = $baseUrl . "/demos";
        $deliveryNote = "Your WhatsApp or AI demo activation request has been received. Activation instructions will be shared when the demo is available.";
    } elseif ($deliveryMode === "EMAIL_LINK") {
        $deliveryNote = "The requested document or asset will be shared on this email address.";
    }

    $userSubject = "Demo Access Request Received - NG Advisory Co.";

    $userEmailBody = "
Hello $fullName,

Thank you for requesting access to:

$demoTitle

$deliveryNote

Access / reference link:
$accessLink

Important:
Please use a working email address for demo delivery. If you do not see the email, please check your Spam, Promotions, or Junk folder.

Demo access is controlled so the environment remains available and secure. Each email address can access up to 3 demo assets. For deeper access or a walkthrough, you can contact me directly through the website.

Regards,
NG Advisory Co.
";

    $userHeaders = "From: no-reply@nikhilgangadhar.com\r\n";
    $userHeaders .= "Reply-To: $NOTIFY_EMAIL\r\n";

    @mail($email, $userSubject, $userEmailBody, $userHeaders);

    $adminSubject = "New Demo Access Request - NG Advisory Co.";

    $adminEmailBody = "
New demo access request:

Name: $fullName
Email: $email
Phone: $phone
Company: $company
Role: $roleTitle
Country: $country
LinkedIn: $linkedinUrl

Requested Demo:
$demoTitle
Code: {$demoItem["item_code"]}
Type: {$demoItem["item_type"]}
Delivery Mode: $deliveryMode

Message:
$message

Used Access Count Before Request:
$usedAccessCount

Request ID:
$requestId

Source Page:
$sourcePage

User Agent:
$userAgent
";

    $adminHeaders = "From: no-reply@nikhilgangadhar.com\r\n";
    $adminHeaders .= "Reply-To: $email\r\n";

    @mail($NOTIFY_EMAIL, $adminSubject, $adminEmailBody, $adminHeaders);

    echo json_encode([
        "success" => true,
        "message" => "Your request has been received. Please check your email for the next step.",
        "requestId" => $requestId,
        "remainingAccess" => max(0, 3 - ($usedAccessCount + $requestedCost))
    ]);
} catch (Exception $e) {
    if (isset($pdo) && $pdo->inTransaction()) {
        $pdo->rollBack();
    }

    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Server error. Please try again later."
    ]);
}
?>