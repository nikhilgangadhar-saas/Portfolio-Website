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

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "GET") {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Method not allowed"]);
    exit;
}

function fetchYahooQuote($symbol, $name) {
    $url = "https://query1.finance.yahoo.com/v8/finance/chart/" . urlencode($symbol) . "?range=1d&interval=1d";

    $ch = curl_init($url);

    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 12,
        CURLOPT_HTTPHEADER => [
            "User-Agent: Mozilla/5.0",
            "Accept: application/json"
        ]
    ]);

    $body = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

    curl_close($ch);

    if (!$body || $httpCode < 200 || $httpCode >= 300) {
        return [
            "symbol" => $symbol,
            "name" => $name,
            "price" => null,
            "changePercent" => null,
            "status" => "failed"
        ];
    }

    $data = json_decode($body, true);
    $result = $data["chart"]["result"][0] ?? null;

    if (!$result) {
        return [
            "symbol" => $symbol,
            "name" => $name,
            "price" => null,
            "changePercent" => null,
            "status" => "no_data"
        ];
    }

    $meta = $result["meta"] ?? [];

    $price = $meta["regularMarketPrice"] ?? null;
    $previousClose = $meta["chartPreviousClose"] ?? null;

    $changePercent = null;

    if ($price && $previousClose) {
        $changePercent = (($price - $previousClose) / $previousClose) * 100;
    }

    return [
        "symbol" => $symbol,
        "name" => $name,
        "price" => $price,
        "previousClose" => $previousClose,
        "changePercent" => $changePercent,
        "currency" => $meta["currency"] ?? "USD",
        "status" => "ok"
    ];
}

$assets = [
    ["symbol" => "GLD", "name" => "GLD"],
    ["symbol" => "SLV", "name" => "SLV"],
    ["symbol" => "VOO", "name" => "VOO"],
    ["symbol" => "QQQ", "name" => "QQQ"],
    ["symbol" => "BND", "name" => "BND"],
    ["symbol" => "GC=F", "name" => "Gold Futures"],
    ["symbol" => "SI=F", "name" => "Silver Futures"]
];

$quotes = [];

foreach ($assets as $asset) {
    $quotes[] = fetchYahooQuote($asset["symbol"], $asset["name"]);
}

echo json_encode([
    "success" => true,
    "provider" => "yahoo-chart",
    "quotes" => $quotes,
    "fetchedAt" => gmdate("c")
]);
?>