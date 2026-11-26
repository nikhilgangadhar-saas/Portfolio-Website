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
    $alternative = $boundary . '-body';
    $type = substr($filename, -5) === '.xlsx'
        ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    $contactUrl = "https://nikhilgangadhar.com/contact?product=$slug";
    $text = "Your sample is ready\r\n\r\n"
        . "$title\r\n$description\r\n\r\n"
        . "Open the attached file in a compatible Office editor. It contains illustrative data so you can try the workflow before using your own records.\r\n\r\n"
        . "Ask about pricing and access to the full version:\r\n$contactUrl\r\n\r\n"
        . "NG Advisory Co.\r\n";
    $safeTitle = htmlspecialchars($title, ENT_QUOTES, 'UTF-8');
    $safeDescription = htmlspecialchars($description, ENT_QUOTES, 'UTF-8');
    $safeFilename = htmlspecialchars($filename, ENT_QUOTES, 'UTF-8');
    $safeContactUrl = htmlspecialchars($contactUrl, ENT_QUOTES, 'UTF-8');
    $html = <<<HTML
<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;background:#eef3f9;color:#0f172a;font-family:Arial,sans-serif">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#eef3f9">
    <tr><td align="center" style="padding:24px 12px">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#ffffff;border:1px solid #dbe5f1">
        <tr><td style="padding:22px 24px;background:#102442;color:#ffffff;font-size:16px;font-weight:bold">NG Advisory Co.</td></tr>
        <tr><td style="padding:26px 24px">
          <h1 style="margin:0 0 12px;font-size:26px;line-height:1.2">Your sample is ready</h1>
          <p style="margin:0 0 18px;font-size:15px;line-height:1.6;color:#334155">Open the attached file in a compatible Office editor to try the workflow with illustrative data.</p>
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f0f6ff;border-left:4px solid #2563eb">
            <tr><td style="padding:16px">
              <h2 style="margin:0 0 6px;font-size:17px;line-height:1.4">$safeTitle</h2>
              <p style="margin:0 0 8px;font-size:14px;line-height:1.6;color:#334155">$safeDescription</p>
              <p style="margin:0;font-size:12px;line-height:1.5;color:#475569;word-break:break-word">$safeFilename</p>
            </td></tr>
          </table>
          <p style="margin:20px 0 12px;font-size:15px;line-height:1.6;color:#334155">Need the full version? Contact us for pricing and access.</p>
          <a href="$safeContactUrl" style="display:inline-block;background:#102442;color:#ffffff;padding:12px 16px;text-decoration:none;font-size:14px;font-weight:bold">Ask About the Full Version</a>
        </td></tr>
        <tr><td style="padding:16px 24px;border-top:1px solid #dbe5f1;font-size:12px;line-height:1.5;color:#475569">You received this email because a sample was requested on our website.</td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>
HTML;
    $html = str_replace(["\r\n", "\r"], "\n", $html);
    $html = str_replace("\n", "\r\n", $html);
    $headers = "From: NG Advisory Co. <no-reply@nikhilgangadhar.com>\r\n"
        . "MIME-Version: 1.0\r\nContent-Type: multipart/mixed; boundary=\"$boundary\"";
    $message = "--$boundary\r\nContent-Type: multipart/alternative; boundary=\"$alternative\"\r\n\r\n"
        . "--$alternative\r\nContent-Type: text/plain; charset=UTF-8\r\n"
        . "Content-Transfer-Encoding: quoted-printable\r\n\r\n"
        . quoted_printable_encode($text) . "\r\n"
        . "--$alternative\r\nContent-Type: text/html; charset=UTF-8\r\n"
        . "Content-Transfer-Encoding: quoted-printable\r\n\r\n"
        . quoted_printable_encode($html) . "\r\n--$alternative--\r\n"
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
