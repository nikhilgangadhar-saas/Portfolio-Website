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

function fetchStooqQuote($symbol) {
    $url = "https://stooq.com/q/l/?s=" . urlencode($symbol) . "&f=sd2t2ohlcv&h&e=csv";

    $context = stream_context_create([
        "http" => [
            "timeout" => 8,
            "header" => "User-Agent: Mozilla/5.0\r\n"
        ]
    ]);

    $csv = @file_get_contents($url, false, $context);

    if (!$csv) {
        return null;
    }

    $lines = array_map("trim", explode("\n", trim($csv)));

    if (count($lines) < 2) {
        return null;
    }

    $headers = str_getcsv($lines[0]);
    $values = str_getcsv($lines[1]);

    if (count($headers) !== count($values)) {
        return null;
    }

    $row = array_combine($headers, $values);

    if (!$row || ($row["Close"] ?? "N/D") === "N/D") {
        return null;
    }

    $open = is_numeric($row["Open"] ?? null) ? (float)$row["Open"] : null;
    $close = is_numeric($row["Close"] ?? null) ? (float)$row["Close"] : null;

    $changePercent = null;

    if ($open && $close) {
        $changePercent = (($close - $open) / $open) * 100;
    }

    return [
        "symbol" => $symbol,
        "date" => $row["Date"] ?? null,
        "time" => $row["Time"] ?? null,
        "open" => $open,
        "high" => is_numeric($row["High"] ?? null) ? (float)$row["High"] : null,
        "low" => is_numeric($row["Low"] ?? null) ? (float)$row["Low"] : null,
        "close" => $close,
        "volume" => $row["Volume"] ?? null,
        "changePercent" => $changePercent
    ];
}

$symbols = [
    "gld.us" => "GLD",
    "slv.us" => "SLV",
    "voo.us" => "VOO",
    "qqq.us" => "QQQ",
    "bnd.us" => "BND",
    "xauusd" => "Gold Spot",
    "xagusd" => "Silver Spot"
];

$quotes = [];

foreach ($symbols as $stooqSymbol => $displayName) {
    $quote = fetchStooqQuote($stooqSymbol);

    $quotes[] = [
        "key" => $stooqSymbol,
        "name" => $displayName,
        "quote" => $quote
    ];
}

echo json_encode([
    "success" => true,
    "provider" => "stooq",
    "quotes" => $quotes,
    "fetchedAt" => gmdate("c")
]);
?>