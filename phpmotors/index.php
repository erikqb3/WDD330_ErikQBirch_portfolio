<?php

session_start();

//This is the main controller
require_once 'library/connections.php'; //get the database connection file
require_once 'models/main-model.php'; //get the PHP Motors modell for use as needed
require_once 'library/functions.php';

$classifications = getClassifications();
// var_dump($classifications); //var_dump displays info about a variable, array, or object
// exit;



// Build a navigation bar using the $classifications array
$navList = establishNav($classifications);
// echo $navList;
// exit;


$action = trim(filter_input(INPUT_POST, 'action'));
if ($action == NULL) {
  $action = trim(filter_input(INPUT_GET, 'action'));
}

// Check if the firstname cookie exists, get its value
if (isset($_COOKIE['firstname'])) {
  $cookieFirstname = filter_input(INPUT_COOKIE, 'firstname', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
}


switch ($action) {
  case 'template':
    include 'views/template.php';
    exit;
    break;
  case 'vehicleManagement':
    if ((!$_SESSION['loggedIn']) && ($_SESSION['clientData']['clientLevel'] != 3)) {
      header('Location: /phpmotors/index.php');
      exit;
    } else {
      include 'views/vehicle-man.php';
    }
    exit;
    break;
    // case 'go_admin':
    //   // $_SESSION['loggedIn'] = TRUE;
    //   include "views/admin.php";
    //   break;
  case 'oof':
    include 'views/oof.php';
    // include './index.php';
    exit;
    break;
  case 'search_dmy':
    include 'views/search-results.php';
    exit;
    break;
  default:
    include 'views/home.php';
}
