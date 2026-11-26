<?php
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

function respond(int $status, string $message, bool $success = false, bool $newDelivery = false): void
{
    http_response_code($status);
    echo json_encode(['success' => $success, 'message' => $message, 'newDelivery' => $newDelivery]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    respond(405, 'Method not allowed.');
}

$body = json_decode(file_get_contents('php://input', false, null, 0, 4096), true);
$email = is_string($body['email'] ?? null) ? trim($body['email']) : '';
$slug = is_string($body['product'] ?? null) ? $body['product'] : '';

$samples = [
    'stock-reconciliation-template' => ['Stock Count & Reconciliation Workbook', 'stock-reconciliation-template-sample.xlsx', 'Compare book stock with your physical count and record how you plan to resolve each variance.'],
    'inventory-ageing-template' => ['Inventory Ageing Workbook', 'inventory-ageing-template-sample.xlsx', 'Review days held and ageing buckets from stock receipt dates and a reporting date.'],
    'internal-audit-action-tracker' => ['Audit Action Tracker', 'internal-audit-action-tracker-sample.xlsx', 'Record findings, assign action owners and due dates, and track evidence through follow-up.'],
    'warehouse-sop-starter-pack' => ['Warehouse SOP Starter Pack', 'warehouse-sop-starter-pack-sample.docx', 'Review the checks and handoffs in a warehouse receiving procedure.'],
    'internal-audit-plan-checklist' => ['Internal Audit Plan & Checklist Pack', 'internal-audit-plan-checklist-sample.docx', 'See how to plan an audit and record evidence against each control.'],
    'approval-matrix-template' => ['Approval Matrix Template', 'approval-matrix-template-sample.docx', 'Map who can request, review, and approve operational decisions.'],
];

if (strlen($email) > 254 || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(400, 'Enter a valid email address.');
}
if (!isset($samples[$slug])) {
    respond(400, 'This sample is unavailable.');
}

[$title, $filename, $description] = $samples[$slug];
$attachment = @file_get_contents(__DIR__ . '/../downloads/' . $filename);
if ($attachment === false) {
    respond(503, 'The sample is temporarily unavailable. Please try again later.');
}

try {
    $configPath = '/home/u312587281/domains/nikhilgangadhar.com/ng-config.php';
    if (!is_readable($configPath)) {
        throw new RuntimeException('Sample request configuration is unavailable');
    }
    require $configPath;
    $pdo = new PDO(
        "mysql:host=$DB_HOST;dbname=$DB_NAME;charset=utf8mb4",
        $DB_USER,
        $DB_PASS,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS ng_sample_requests (
            id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(254) NOT NULL,
            product_slug VARCHAR(80) NOT NULL,
            request_day DATE NOT NULL,
            requested_at DATETIME NOT NULL,
            mailed_at DATETIME NULL,
            delivery_status ENUM('pending', 'accepted', 'failed') NOT NULL,
            UNIQUE KEY sample_per_day (email, product_slug, request_day)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    ");
    $requestDay = gmdate('Y-m-d');
    $insert = $pdo->prepare("
        INSERT INTO ng_sample_requests
            (email, product_slug, request_day, requested_at, delivery_status)
        VALUES (?, ?, ?, UTC_TIMESTAMP(), 'pending')
        ON DUPLICATE KEY UPDATE id = id
    ");
    $insert->execute([$email, $slug, $requestDay]);
    if ($insert->rowCount() === 0) {
        $existing = $pdo->prepare("
            SELECT delivery_status FROM ng_sample_requests
            WHERE email = ? AND product_slug = ? AND request_day = ?
        ");
        $existing->execute([$email, $slug, $requestDay]);
        if ($existing->fetchColumn() === 'accepted') {
            respond(200, 'This sample was already sent today. Check your inbox or spam folder.', true);
        }
        $retry = $pdo->prepare("
            UPDATE ng_sample_requests SET delivery_status = 'pending', requested_at = UTC_TIMESTAMP()
            WHERE email = ? AND product_slug = ? AND request_day = ?
              AND delivery_status IN ('failed', 'pending')
              AND requested_at < UTC_TIMESTAMP() - INTERVAL 5 MINUTE
        ");
        $retry->execute([$email, $slug, $requestDay]);
        if ($retry->rowCount() === 0) {
            respond(429, 'A recent request is on record. Check your inbox or try again in a few minutes.');
        }
    }

    $boundary = 'ng-' . bin2hex(random_bytes(16));
    $type = substr($filename, -5) === '.xlsx'
        ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    $text = "Hello,\r\n\r\nYour requested sample is attached.\r\n\r\n"
        . "$title\r\n$description\r\n\r\n"
        . "This sample uses illustrative data and is intended to preview the workflow. "
        . "Open it with a compatible Office editor.\r\n\r\n"
        . "For pricing or access to the full version, visit:\r\n"
        . "https://nikhilgangadhar.com/contact?product=$slug\r\n\r\n"
        . "NG Advisory Co.\r\n";
    $headers = "From: NG Advisory Co. <no-reply@nikhilgangadhar.com>\r\n"
        . "MIME-Version: 1.0\r\nContent-Type: multipart/mixed; boundary=\"$boundary\"";
    $message = "--$boundary\r\nContent-Type: text/plain; charset=UTF-8\r\n"
        . "Content-Transfer-Encoding: quoted-printable\r\n\r\n"
        . quoted_printable_encode($text) . "\r\n"
        . "--$boundary\r\nContent-Type: $type; name=\"$filename\"\r\n"
        . "Content-Disposition: attachment; filename=\"$filename\"\r\n"
        . "Content-Transfer-Encoding: base64\r\n\r\n"
        . chunk_split(base64_encode($attachment)) . "--$boundary--\r\n";
    $accepted = @mail($email, "Your sample from NG Advisory Co. - $title", $message, $headers);
    $update = $pdo->prepare("
        UPDATE ng_sample_requests SET delivery_status = ?, mailed_at = IF(?, UTC_TIMESTAMP(), NULL)
        WHERE email = ? AND product_slug = ? AND request_day = ?
    ");
    $update->execute([$accepted ? 'accepted' : 'failed', $accepted ? 1 : 0, $email, $slug, $requestDay]);
    if (!$accepted) {
        respond(503, 'We couldn’t send the sample. Please try again later.');
    }
    respond(200, 'Sample sent. Check your inbox or spam folder for the attachment.', true, true);
} catch (Throwable $error) {
    error_log('Sample request failed: ' . get_class($error) . ' (' . $error->getCode() . ')');
    respond(503, 'Sample email is temporarily unavailable. Please try again later.');
}
