<?php

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');           
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

require_once __DIR__ . '/db.php';

try {
    $pdo = getDB();

    // Fetch the latest 20 messages, only public fields
    // We assume there is an 'id' or 'created_at' column for sorting
    // We'll try to sort by 'id' descending to get latest first
    $stmt = $pdo->query(
        'SELECT `name`, `message`, `created_at` 
         FROM `messages` 
         ORDER BY `id` DESC 
         LIMIT 20'
    );

    $messages = $stmt->fetchAll();

    echo json_encode([
        'success' => true,
        'data' => $messages
    ]);

} catch (PDOException $e) {
    // If 'created_at' or 'id' doesn't exist, try a simpler query
    try {
        $stmt = $pdo->query('SELECT `name`, `message` FROM `messages` LIMIT 20');
        $messages = $stmt->fetchAll();
        echo json_encode([
            'success' => true,
            'data' => $messages
        ]);
    } catch (Exception $inner) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => 'Database error.'
        ]);
    }
}
