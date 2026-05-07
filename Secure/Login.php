<?php
$host = "localhost";
$db = "u564554205_Aura";
$user = "u564554205_Aura";
$pass = "aakunneHost1216";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Database Connection Failed: " . $conn->connect_error);
}
?>
?>