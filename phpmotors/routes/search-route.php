<?php

session_start();

require_once '../library/connections.php'; //get the database connection file
require_once '../library/functions.php';
require_once '../models/main-model.php'; //get the PHP Motors model for use as needed
require_once '../models/vehicles-model.php';
require_once '../models/uploads-model.php';
require_once '../models/search-model.php';

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
  // echo $searchParam;
}

$pagNavNumb = trim(filter_input(INPUT_POST, 'pagNavNumb'));
if ($pagNavNumb == NULL) {
  $pagNavNumb = trim(filter_input(INPUT_GET, 'pagNavNumb'));
  // echo $pagNavNumb;
}


switch ($action) {
  case 'search_dmy':
    $counter = 0;
    $results = searchInventory($searchParam);
    $pagNavSeg = [];
    $_SESSION["pagNav"] = [];
    $fullResults = "";
    $displayedResults = "";

    if (!$results) {
      $message = "Sorry, no results found.";
      include '../views/search-results.php';
      exit;
    } else if ($searchParam == "") {
      $message = "Please type something into the Search Bar!";
      include '../views/search-results.php';
      exit;
    } else {
      $message = "<h1>Results for: $searchParam</h1>";
      if ($pagNavNumb == 0) {
        $_SESSION["pagNav"] = [];
      }
      foreach ($results as $result) {
        $counter++;
        // $fullResults .= singleResult_HTML($result);
        array_push($pagNavSeg, singleResult_HTML($result));
        if (count($pagNavSeg) % 10 == 0) {
          array_push($_SESSION["pagNav"], $pagNavSeg);
          $pagNavSeg = [];
        } else if (count($results) == $counter) {
          array_push($_SESSION["pagNav"], $pagNavSeg);
          $pagNavSeg = [];
        }
      }
      $message .= "<h2>About $counter results found</h2>";
      foreach ($_SESSION["pagNav"][$pagNavNumb] as $elementBlock) {
        $displayedResults .= $elementBlock;
      }


      $pagNav_bar = establishPagNav($searchParam, $pagNavNumb);
      // echo $counter;

      include '../views/search-results.php';
      exit;
    }
    break;
  default:

    break;
}
