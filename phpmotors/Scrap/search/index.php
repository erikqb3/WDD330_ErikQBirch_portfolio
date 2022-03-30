<?php

session_start();

require_once '../library/connections.php'; //get the database connection file
require_once '../library/functions.php';
require_once '../models/main-model.php'; //get the PHP Motors model for use as needed
require_once '../models/vehicles-model.php';
require_once '../models/uploads-model.php';

$classifications = getClassifications();
$inventory = getInventoryID();

// Build a navigation bar using the $classifications array
$navList = establishNav($classifications);

$action = trim(filter_input(INPUT_POST, 'action'));
if ($action == NULL) {
  $action = trim(filter_input(INPUT_GET, 'action'));
  // echo $action;
}

$searchParam = trim(filter_input(INPUT_POST, 'searchParam'));
if ($searchParam == NULL) {
  $searchParam = trim(filter_input(INPUT_GET, 'searchParam'));
  echo $searchParam;
}


switch ($action) {
  case 'search_dmy':

    include '../views/search-results.php';
    exit;
    break;
  default:

    break;
}
