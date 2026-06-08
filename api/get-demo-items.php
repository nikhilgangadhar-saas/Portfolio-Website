<?php
header("Access-Control-Allow-Origin: https://dev.nikhilgangadhar.com");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once __DIR__ . '/home/u312587281/ng-config.php';

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

    $stmt = $pdo->query("
        SELECT
            item_code AS code,
            item_title AS title,
            item_type AS itemType,
            description,
            delivery_mode AS deliveryMode
        FROM demo_items
        WHERE is_active = 1
          AND is_coming_soon = 0
        ORDER BY sort_order ASC, item_title ASC
    ");

    $items = $stmt->fetchAll();

    echo json_encode([
        "success" => true,
        "items" => $items
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Server error"
    ]);
}
?>