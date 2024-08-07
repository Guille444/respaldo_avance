<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require_once('./PHPMailer/src/Exception.php');
require_once('./PHPMailer/src/PHPMailer.php');
require_once('./PHPMailer/src/SMTP.php');

header('Content-type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization");
header("Access-Control-Allow-Methods: GET,PUT,POST,DELETE,PATCH,OPTIONS");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

$method = $_SERVER['REQUEST_METHOD'];
if ($method == "OPTIONS") {
    die();
}

// Cambia los nombres de las claves para que coincidan con los enviados desde React Native
$pin = isset($_POST['codigo_recuperacion']) ? $_POST['codigo_recuperacion'] : '';
$alias = isset($_POST['alias_cliente']) ? $_POST['alias_cliente'] : '';
$email = isset($_POST['correo_cliente']) ? $_POST['correo_cliente'] : '';

// Verifica que se reciben los valores correctamente
error_log("Alias recibido en PHP: " . $alias);
error_log("PIN recibido en PHP: " . $pin);
error_log("Email recibido en PHP: " . $email);

try {
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->SMTPDebug = 0;
    $mail->Debugoutput = 'html';

    $mail->setFrom("soportesaar@gmail.com");
    $mail->SMTPAuth = true;
    $mail->SMTPSecure = 'ssl';
    $mail->Host = "smtp.gmail.com";
    $mail->Port = 465;
    $mail->Username = "soportesaar@gmail.com";
    $mail->Password = "grmhcnhakxcqfggk";

    $mail->addAddress($email);
    $mail->Subject = 'Recuperación de contraseña';

    $mail->isHTML(true);
    $mail->CharSet = 'utf-8';
    $html = "<html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #d1cdb8;
                    color: #000;
                    text-align: center;
                    padding: 50px;
                }
                .container {
                    background-color: #f0f0f0;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    max-width: 400px;
                    margin: auto;
                }
                .header {
                    font-size: 24px;
                    margin-bottom: 20px;
                }
                .pin {
                    font-size: 36px;
                    letter-spacing: 10px;
                    font-weight: bold;
                    margin: 20px 0;
                }
                .message {
                    font-size: 18px;
                    margin-top: 20px;
                }
                .footer {
                    font-size: 14px;
                    color: #888;
                    margin-top: 30px;
                }
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>Recuperación de contraseña</div>
                <p>Hola, <strong>$alias</strong>.</p>
                <p>Este es tu código de recuperación: <strong class='pin'>$pin</strong></p>
                <p class='message'>Si no solicitó este código, ignore este mensaje.</p>
                <div class='footer'>SAAR - Sistema de Administración Automotriz Rodríguez</div>
            </div>
        </body>
        </html>";
    $mail->Body = $html;
    $mail->send();

    echo json_encode(['status' => true, 'message' => 'Correo enviado correctamente']);
} catch (Exception $e) {
    echo json_encode(['status' => false, 'message' => 'Error al enviar el correo: ' . $e->getMessage()]);
}
