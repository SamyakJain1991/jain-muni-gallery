<?php
header('Content-Type: text/plain');
$data = json_decode(file_get_contents('php://input'), true);

// Load existing events
$events = json_decode(file_get_contents('events.json'), true) ?: [];

// Add new event
$events[] = $data;

// Save back to file
file_put_contents('events.json', json_encode($events));
echo "Event Updated Successfully!";
?>
