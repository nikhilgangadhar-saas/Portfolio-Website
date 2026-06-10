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

$paymentKey = trim($data["paymentKey"] ?? "");

if ($paymentKey === "") {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "paymentKey is required"]);
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

    $uaeDate = new DateTime("now", new DateTimeZone("Asia/Dubai"));
    $currentMonth = $uaeDate->format("Y-m");

    $stmt = $pdo->prepare("
        UPDATE radar_payment_status
        SET completed_month = :completedMonth
        WHERE payment_key = :paymentKey
          AND is_active = 1
    ");

    $stmt->execute([
        ":completedMonth" => $currentMonth,
        ":paymentKey" => $paymentKey
    ]);

    if ($stmt->rowCount() === 0) {
        http_response_code(404);
        echo json_encode([
            "success" => false,
            "message" => "Payment item not found"
        ]);
        exit;
    }

    echo json_encode([
        "success" => true,
        "message" => "Payment marked complete",
        "paymentKey" => $paymentKey,
        "completedMonth" => $currentMonth
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Server error"
    ]);
}
?>