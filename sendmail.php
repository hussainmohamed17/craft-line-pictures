<?php

$to = "hussainsonoor@gmail.com";

$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$eventType = $_POST['eventType'];
$message = $_POST['message'];

$subject = "New Photography Booking Request";

$body = "
Name: $name

Email: $email

Phone: $phone

Event Type: $eventType

Message:
$message
";

$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";

if(mail($to, $subject, $body, $headers)) {
    echo "
    <script>
        alert('Message Sent Successfully!');
        window.location.href='root.html';
    </script>";
} else {
    echo "
    <script>
        alert('Failed to Send Message!');
        window.history.back();
    </script>";
}

?>