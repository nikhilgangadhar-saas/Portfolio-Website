<?php
$origin = $_SERVER["HTTP_ORIGIN"] ?? "";

$allowedOrigins = [
    "https://nikhilgangadhar.com",
    "https://dev.nikhilgangadhar.com"
];

if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
}

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
    if (!isset($RADAR_FUEL_API_KEY) || trim($RADAR_FUEL_API_KEY) === "") {
        throw new Exception("Fuel API key not configured");
    }

    $url = "https://uae-fuel-prices-api.vercel.app/api/v1/fuel-prices?lang=en&format=full";

    $ch = curl_init($url);

    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 12,
        CURLOPT_HTTPHEADER => [
            "x-api-key: " . $RADAR_FUEL_API_KEY,
            "Accept: application/json"
        ]
    ]);

    $responseBody = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($responseBody === false || $httpCode < 200 || $httpCode >= 300) {
        throw new Exception("Fuel API failed");
    }

    $providerData = json_decode($responseBody, true);

    if (!$providerData) {
        throw new Exception("Invalid fuel API response");
    }

    echo json_encode([
        "success" => true,
        "provider" => "uae-fuel-prices-api",
        "data" => $providerData,
        "fetchedAt" => gmdate("c")
    ]);
} catch (Exception $e) {
    http_response_code(500);

    echo json_encode([
        "success" => false,
        "message" => "Failed to load fuel prices"
    ]);
}
?>