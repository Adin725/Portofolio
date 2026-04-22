<?php

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');           
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Tangani preflight (OPTIONS) request dari browser
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// ── Validasi Method 
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed. Gunakan POST.']);
    exit;
}

// ── Baca Input (JSON atau form-encoded) 
$contentType = $_SERVER['CONTENT_TYPE'] ?? '';

if (str_contains($contentType, 'application/json')) {
    $raw  = file_get_contents('php://input');
    $data = json_decode($raw, true);
} else {
    $data = $_POST;
}

// ── Sanitasi & Validasi Input
$name    = trim($data['name']    ?? '');
$email   = trim($data['email']   ?? '');
$subject = trim($data['subject'] ?? '');
$message = trim($data['message'] ?? '');

$errors = [];

if ($name === '' || mb_strlen($name) > 100) {
    $errors[] = 'Nama gak valid, harus 1-100 karakter !.';
}
if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || mb_strlen($email) > 150) {
    $errors[] = 'Email kamu gak valid.';
}
if ($subject === '' || mb_strlen($subject) > 200) {
    $errors[] = 'Subjek gak valid, harus 1–200 karakter!.';
}
if ($message === '') {
    $errors[] = 'Pesan gak boleh kosong!.';
}

if (!empty($errors)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'error' => implode(' ', $errors)]);
    exit;
}

// ── Simpan ke Database 
require_once __DIR__ . '/db.php';

try {
    $pdo = getDB();

    $stmt = $pdo->prepare(
        'INSERT INTO `messages` (`name`, `email`, `subject`, `message`, `ip_address`)
         VALUES (:name, :email, :subject, :message, :ip)'
    );

    $stmt->execute([
        ':name'    => $name,
        ':email'   => $email,
        ':subject' => $subject,
        ':message' => $message,
        ':ip'      => $_SERVER['REMOTE_ADDR'] ?? null,
    ]);

    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Pesan berhasil dikirim! Terima kasih telah menghubungi saya :)',
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error'   => 'Terjadi kesalahan server. Silakan coba lagi nanti yah.',
    ]);
}
