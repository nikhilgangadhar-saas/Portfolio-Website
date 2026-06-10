<?php
header("Access-Control-Allow-Origin: https://dev.nikhilgangadhar.com");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once '/home/u312587281/domains/nikhilgangadhar.com/ng-config.php';

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "GET") {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Method not allowed"]);
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
        SELECT
            payment_key,
            payment_name,
            due_day,
            completed_month,
            CASE
                WHEN completed_month = :currentMonth THEN 1
                ELSE 0
            END AS is_completed,
            sort_order,
            updated_at
        FROM radar_payment_status
        WHERE is_active = 1
        ORDER BY sort_order ASC
    ");

    $stmt->execute([
        ":currentMonth" => $currentMonth
    ]);

    echo json_encode([
        "success" => true,
        "currentMonth" => $currentMonth,
        "payments" => $stmt->fetchAll()
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Server error"
    ]);
}
?>