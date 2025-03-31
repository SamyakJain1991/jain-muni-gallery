<?php
header('Content-Type: application/json');
$events = json_decode(file_get_contents('events.json'), true);
echo json_encode($events ? $events : []);
?>
