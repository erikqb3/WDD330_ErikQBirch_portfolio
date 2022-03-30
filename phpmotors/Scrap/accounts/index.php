<?php
//This is the accounts controller

session_start();

require_once '../library/connections.php'; //get the database connection file
require_once '../models/main-model.php'; //get the PHP Motors model for use as needed
require_once '../models/accounts-model.php'; //get the accounts model
require_once '../library/functions.php';

$classifications = getClassifications();
$clientList = getClients_ID();
// var_dump($classifications); //var_dump displays info about a variable, array, or object
// exit;

// Build a navigation bar using the $classifications array
$navList = establishNav($classifications);

$action = filter_input(INPUT_POST, 'action');
if ($action == NULL) {
  $action = filter_input(INPUT_GET, 'action');
}


switch ($action) {
  case 'go_admin':
    $_SESSION['loggedIn'] = TRUE;
    include "../views/admin.php";
    break;
  case 'go_logIn':
    if ($_SESSION['loggedIn'] == false) {
      message("");
    }
    include '../views/logIn.php';
    break;
  case 'do_logIn':
    $clientEmail = trim(filter_input(INPUT_POST, 'clientEmail', FILTER_SANITIZE_EMAIL));
    $clientEmail = validateEmail($clientEmail);
    $clientPassword = trim(filter_input(INPUT_POST, 'clientPassword', FILTER_SANITIZE_FULL_SPECIAL_CHARS));
    $passwordCheck = checkPassword($clientPassword);

    // Run basic checks, return if errors
    if (empty($clientEmail) || empty($passwordCheck)) {
      message('<p class="notice">Please provide a valid email address and password.</p>');
      include '../views/logIn.php';
      exit;
    }

    // A valid password exists, proceed with the login process
    // Query the client data based on the email address
    $clientData = getClient($clientEmail);
    // Compare the password just submitted against
    // the hashed password for the matching client
    $hashCheck = password_verify($clientPassword, $clientData['clientPassword']);
    // If the hashes don't match create an error
    // and return to the login view

    // echo $clientPassword;
    // echo $hashCheck;
    if (!$hashCheck) {
      message('<p class="notice">Please check your password and try again.</p>');
      include '../views/logIn.php';
      exit;
    }
    // A valid user exists, log them in
    $_SESSION['loggedIn'] = TRUE;
    // Remove the password from the array
    // the array_pop function removes the last
    // element from an array
    array_pop($clientData);
    // Store the array into the session
    $_SESSION['clientData'] = $clientData;
    // Send them to the admin view
    // include '../views/admin.php';.
    message("<p> You are logged in!</p>");
    include '../views/admin.php'; //works
    // header('Location: /phpmotors/views/admin.php')



    exit;
    break;
  case 'do_logout':
    $_SESSION['clientData'] = [];
    $_SESSION['loggedIn'] = FALSE;
    header('Location: /phpmotors/index.php');
    break;
  case 'go_register':
    include '../views/registration.php';
    break;
  case 'do_register':
    //Find length of clientID
    $counter = 0;

    foreach ($clientList as $singleClient) {
      $counter++;
    }
    $clientId = $counter + 1;

    // Filter and store the data
    // $clientId = filter_input(INPUT_POST, 'clientId'); //you produce your own clientId value, no need to filter
    $clientFirstname = trim(filter_input(INPUT_POST, 'clientFirstname', FILTER_SANITIZE_FULL_SPECIAL_CHARS));
    $clientLastname = trim(filter_input(INPUT_POST, 'clientLastname', FILTER_SANITIZE_FULL_SPECIAL_CHARS));
    $clientEmail = trim(filter_input(INPUT_POST, 'clientEmail', FILTER_SANITIZE_EMAIL));
    $clientPassword = trim(filter_input(INPUT_POST, 'clientPassword', FILTER_SANITIZE_FULL_SPECIAL_CHARS));

    //Validate Email and Password
    $clientEmail = validateEmail($clientEmail);
    $checkPassword = checkPassword($clientPassword);

    $existingEmail = checkExistingEmail($clientEmail);

    // Check for existing email address in the table
    if ($existingEmail) {
      message('<p class="notice">That email address already exists. Try logging in instead.</p>');
      include '../views/logIn.php';
      exit;
    }

    // Check for missing data
    if (empty($clientFirstname) || empty($clientLastname) || empty($clientEmail) || empty($checkPassword)) {
      message('<p>Please provide information for all empty form fields.</p>');
      include '../views/registration.php';
      exit;
    }

    // Hash the checked password
    $hashedPassword = password_hash($clientPassword, PASSWORD_DEFAULT);

    // Send the data to the model
    $regOutcome = regClient($clientId, $clientFirstname, $clientLastname, $clientEmail, $hashedPassword);

    // Check and report the result
    if ($regOutcome === 1) {
      setcookie('firstname', $clientFirstname, strtotime('+1 year'), '/'); // PARAMETERS = name, value, expiry, path ('/' means the cookie will e visible to the entire website)
      message("Thanks for registering $clientFirstname. Please use your email and password to login.");
      header('Location: /phpmotors/routes/accounts-route.php/?action=go_logIn');
      exit;
    } else {
      message("<p>Sorry $clientFirstname, but the registration failed. Please try again.</p>");
      include '../views/registration.php';
      exit;
    }
    break;
  case "go_clientUpdate":
    $clientEmail = $_SESSION['clientData']['clientEmail'];
    $clientInfo = getClient($clientEmail);

    if (count($clientInfo) < 1) {
      $message = "Sorry, your account could not be found";
    }
    include '../views/client-update.php';
    exit;
    break;
  case "do_clientUpdate":
    // $_SESSION['clientData']['clientId'] = filter_input(INPUT_POST, 'clientId', FILTER_SANITIZE_NUMBER_INT);
    $_SESSION['clientData']['clientFirstname'] = trim(filter_input(INPUT_POST, 'clientFirstname', FILTER_SANITIZE_FULL_SPECIAL_CHARS));
    $_SESSION['clientData']['clientLastname'] = trim(filter_input(INPUT_POST, 'clientLastname', FILTER_SANITIZE_FULL_SPECIAL_CHARS));
    $_SESSION['clientData']['clientEmail'] = trim(filter_input(INPUT_POST, 'clientEmail', FILTER_SANITIZE_EMAIL));

    $clientInfo = getClient($_SESSION['clientData']['clientEmail']); //need for clientId
    // echo $clientInfo['clientId'] . $clientInfo['clientFirstname'];

    // echo $clientInfo['clientId'] . $_SESSION['clientData']['clientFirstname'] . $_SESSION['clientData']['clientLastname'] . $_SESSION['clientData']['clientEmail'] . $_SESSION['clientData']['clientId'];
    if (empty($clientInfo['clientId']) || empty($_SESSION['clientData']['clientFirstname']) || empty($_SESSION['clientData']['clientLastname']) || empty($_SESSION['clientData']['clientEmail'])) {
      $message = "<p>Sorry! Please fill out all areas. Please try again!</p>";
      include '../views/client-update.php';
      exit;
    }
    $updateResult = updateAccount($clientInfo['clientId'], $_SESSION['clientData']['clientFirstname'], $_SESSION['clientData']['clientLastname'], $_SESSION['clientData']['clientEmail']);
    if ($updateResult) {
      // echo $_SESSION['clientData']['clientFirstname'];
      message("<p>Account info successfully been changed.");
      header('location: /phpmotors/routes/accounts-route.php');
      exit;
    } else {
      message("<p>Error. Account settings not updated.</p>");
      include '../views/client-update.php';
      exit;
    }
    break;
  case 'do_passwordUpdate':
    // 0 check if inputs are empty
    // 1 Check if password is correct
    // 2 Check if desired password = confirmed password
    // 3 hash confirmed password

    $clientInfo = getClient($_SESSION['clientData']['clientEmail']);

    $clientPassword = trim(filter_input(INPUT_POST, 'clientPassword', FILTER_SANITIZE_FULL_SPECIAL_CHARS));
    $desiredPassword = trim(filter_input(INPUT_POST, 'desiredPassword', FILTER_SANITIZE_FULL_SPECIAL_CHARS));
    $confirmPassword = trim(filter_input(INPUT_POST, 'confirmPassword', FILTER_SANITIZE_FULL_SPECIAL_CHARS));

    if (empty($clientPassword) || empty($desiredPassword) || empty($confirmPassword)) {
      $message = '<p class="notice">Please fill out the input boxes.</p>';
      include '../views/client-update.php';
      exit;
    }
    $hashCheck = password_verify($clientPassword, $clientInfo['clientPassword']);
    if (!$hashCheck) {
      $message = '<p class="notice">Please check your password and try again.</p>';
      include '../views/client-update.php';
      exit;
    }
    if ($desiredPassword != $confirmPassword) {
      echo "DPasword and CPasword don't match";
      $message = '<p class="notice">Your Desired Password and Confirm Password don\'t match</p>';
      include '../views/client-update.php';
      exit;
    }
    $hashedPassword = password_hash($desiredPassword, PASSWORD_DEFAULT);
    echo $hashedPassword;
    $_SESSION['clientData']['clientPassword'] = $hashedPassword;
    changeEmail($clientInfo['clientId'], $hashedPassword);
    // $_SESSION['clientData']['clientPassword'] = $desiredPassword;
    // changeEmail($clientInfo['clientId'], $desiredPassword);
    $message = '<p class="notice">Password Changed!!!</p>';
    message($message);
    header('location: /phpmotors/routes/accounts-route.php');
    exit;



    // echo "DPassword and CPassword don't match";

    // echo $clientData['clientPassword'] . "clientPASSWORD";



    // echo "WORKS";

    break;
  default:
    include '../views/admin.php';
    exit;
}
