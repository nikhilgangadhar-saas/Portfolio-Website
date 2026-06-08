<?php
header("Access-Control-Allow-Origin: https://dev.nikhilgangadhar.com");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once __DIR__ . '/home/u312587281/ng-config.php';

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

$name = trim($data["name"] ?? "");
$email = trim($data["email"] ?? "");
$company = trim($data["company"] ?? "");
$country = trim($data["country"] ?? "");
$reason = trim($data["reason"] ?? "");
$message = trim($data["message"] ?? "");
$sourcePage = trim($data["sourcePage"] ?? "");
$userAgent = $_SERVER["HTTP_USER_AGENT"] ?? "";

if ($name === "" || $email === "" || $reason === "" || $message === "") {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Required fields missing"]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Invalid email address"]);
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

    $stmt = $pdo->prepare("
        INSERT INTO ng_leads
        (Name, Email, Company, Country, Reason, Message, SourcePage, UserAgent)
        VALUES
        (:name, :email, :company, :country, :reason, :message, :sourcePage, :userAgent)
    ");

    $stmt->execute([
        ":name" => $name,
        ":email" => $email,
        ":company" => $company,
        ":country" => $country,
        ":reason" => $reason,
        ":message" => $message,
        ":sourcePage" => $sourcePage,
        ":userAgent" => $userAgent
    ]);

    $subject = "New Lead - NG Business Systems";

    $emailBody = "
New lead submitted:

Name: $name
Email: $email
Company: $company
Country: $country
Reason: $reason

Message:
$message

Source Page:
$sourcePage
";

    $headers = "From: no-reply@nikhilgangadhar.com\r\n";
    $headers .= "Reply-To: $email\r\n";

    @mail($NOTIFY_EMAIL, $subject, $emailBody, $headers);

    echo json_encode([
        "success" => true,
        "message" => "Lead submitted successfully"
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Server error"
    ]);
}
?>