<?php
// require ReCaptcha class
require('../recaptcha-master/src/autoload.php');

// configure
// an email address that will be in the From field of the email.
$from = 'Thingmill contact bot <contact@thingmill.fr>';

// an email address that will receive the email with the output of the form
$sendTo = 'Contact form thingmill.fr <contact@thingmill.fr>';

// subject of the email
$subject = 'Nouveau message du site : thingmill.fr';

// form field names and their translations.
// array variable name => Text to appear in the email
$fields = array('name' => 'Prénom', 'surname' => 'Nom', 'phone' => 'Téléphone', 'email' => 'Email', 'message' => 'Message');

// message that will be displayed when everything is OK :)
$okMessage = 'Merci votre message a bien été transmis à notre équipe';

$captchaerror = 'Vous devez valider le ReCaptcha';

// If something goes wrong, we will display this message.
$errorMessage = 'Une erreur est survenue.';

// ReCaptch Secret
$recaptchaSecret = '6LfgD5UUAAAAAECFQxD9gt6Bml2TCPxe_6T-D1ZY';

// let's do the sending

// if you are not debugging and don't need error reporting, turn this off by error_reporting(0);
error_reporting(E_ALL & ~E_NOTICE);

try {
    if (!empty($_POST)) {

        // validate the ReCaptcha, if something is wrong, we throw an Exception,
        // i.e. code stops executing and goes to catch() block

        if (!isset($_POST['g-recaptcha-response'])) {
            throw new \Exception('ReCaptcha is not set.');
        }

        // do not forget to enter your secret key from https://www.google.com/recaptcha/admin

        $recaptcha = new \ReCaptcha\ReCaptcha($recaptchaSecret, new \ReCaptcha\RequestMethod\CurlPost());

        // we validate the ReCaptcha field together with the user's IP address

        $response = $recaptcha->verify($_POST['g-recaptcha-response'], $_SERVER['REMOTE_ADDR']);

        if (!$response->isSuccess()) {
            throw new \Exception($captchaerror);
        }

        // everything went well, we can compose the message, as usually

        $emailText = "Vous avez reçu un mail provenant du site \n=============================\n";

        foreach ($_POST as $key => $value) {
            // If the field exists in the $fields array, include it in the email
            if (isset($fields[$key])) {
                $emailText .= "$fields[$key]: $value\n";
            }
        }

        // All the neccessary headers for the email.
        $headers = array('Content-Type: text/plain; charset="UTF-8";',
            'From: ' . $from,
            'Reply-To: ' . $from,
            'Return-Path: ' . $from,
        );

        // Send email
        mail($sendTo, $subject, $emailText, implode("\n", $headers));

        $responseArray = array('type' => 'success', 'message' => $okMessage);
    }
} catch (\Exception $e) {
    $responseArray = array('type' => 'danger', 'message' => $e->getMessage());
}

if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
    $encoded = json_encode($responseArray);

    header('Content-Type: application/json');

    echo $encoded;
} else {
    echo $responseArray['message'];
}
