<?php

session_start();

require_once '../library/connections.php'; //get the database connection file
require_once '../library/functions.php';
require_once '../models/main-model.php'; //get the PHP Motors model for use as needed
require_once '../models/vehicles-model.php';
require_once '../models/uploads-model.php';

$classifications = getClassifications();
$inventory = getInventoryID();
// echo $classificationList;



// Build a navigation bar using the $classifications array
$navList = establishNav($classifications);


$action = trim(filter_input(INPUT_POST, 'action'));
if ($action == NULL) {
  $action = trim(filter_input(INPUT_GET, 'action'));
  // echo $action;
}




switch ($action) {
  case 'go_add-classification': //Send user to add-classifcation page
    include '../views/add-classification.php';
    exit;
    break;
  case 'do_insertClassification':
    //Step1: extract input
    //Step2: test if there is input
    //Step3: if input exists, count number of carclassifcation to in order to get accurate classificationId number
    //Step4: send data to module which sends to database and return to page

    //Step1
    $classificationName = trim(filter_input(INPUT_POST, 'classificationName', FILTER_SANITIZE_FULL_SPECIAL_CHARS));
    $counter = 0;

    //Step2
    if (empty($classificationName)) {
      $message = "<p>Please provide information of what car classification you want to add</p>";
      include '../views/add-classification.php';
      exit;
    };

    //Step3
    foreach ($classifications as $classification) {
      $counter++;
    }
    $classificationId = $counter + 1;

    //Step4
    $outcome = newClassification($classificationId, $classificationName);
    header("Location: /phpmotors/routes/vehicles-route.php");
    // include "../views/vehicle-man.php";
    exit;
    break;
  case 'go_add-vehicle': //enable uptodate classificationName list and send to addVehicle page
    include '../views/add-vehicle.php'; //needs to be below it all so that the web page can read the variable it will attach
    exit;
    break;
  case 'do_insertVehicle':
    //Step1: extract input
    // $inventoryId = filter_input(INPUT_POST, 'invId');
    // $counter = 0;


    // foreach ($inventory as $inventoryItem) {
    //   $counter++;
    // }
    // $invId = $counter + 1;

    $invMake = trim(filter_input(INPUT_POST, 'invMake', FILTER_SANITIZE_FULL_SPECIAL_CHARS));
    $invModel = trim(filter_input(INPUT_POST, 'invModel', FILTER_SANITIZE_FULL_SPECIAL_CHARS));
    $invDescription = trim(filter_input(INPUT_POST, 'invDescription', FILTER_SANITIZE_FULL_SPECIAL_CHARS));

    $imgName = $_FILES['file1']['name'];
    $imgMatch = checkExistingImage($imgName);

    // $invImage = trim(filter_input(INPUT_POST, 'invImage', FILTER_SANITIZE_URL));
    // $invThumbnail = trim(filter_input(INPUT_POST, 'invThumbnail', FILTER_SANITIZE_URL));
    $invPrice = trim(filter_input(INPUT_POST, 'invPrice', FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION));
    $invMiles = trim(filter_input(INPUT_POST, 'invMiles', FILTER_SANITIZE_NUMBER_FLOAT));
    $invColor = trim(filter_input(INPUT_POST, 'invColor', FILTER_SANITIZE_FULL_SPECIAL_CHARS));
    $classificationId = trim(filter_input(INPUT_POST, 'classificationId', FILTER_SANITIZE_NUMBER_FLOAT));


    if (empty($invMake) || empty($invModel) || empty($invDescription) || empty($imgName) || ($imgMatch) || empty($invPrice) || empty($invMiles) || empty($invColor) || empty($classificationId)) {
      $message = "<p>Sorry! Please fill out all areas. Please try again.</p>";
      include '../views/add-vehicle.php';
      exit;
    } else {
      $outcome = newVehicle($invId, $invMake, $invModel, $invDescription, $invImage, $invThumbnail, $invPrice, $invMiles, $invColor, $classificationId);
      $imgPath = uploadFile('file1');
      $result = storeImages($imgPath, $invId, $imgName, $imgPrimary);
      $message = "<p>Your new vehicle has been added! Thank You!</p>";
      include '../views/add-vehicle.php';
      exit;
    }
    break;
  case 'do_updateVehicle':
    $classificationId = filter_input(INPUT_POST, 'classificationId', FILTER_SANITIZE_NUMBER_INT);


    $invId = filter_input(INPUT_POST, 'invId', FILTER_SANITIZE_NUMBER_INT);
    $invMake = trim(filter_input(INPUT_POST, 'invMake', FILTER_SANITIZE_FULL_SPECIAL_CHARS));
    $invModel = trim(filter_input(INPUT_POST, 'invModel', FILTER_SANITIZE_FULL_SPECIAL_CHARS));
    $invDescription = trim(filter_input(INPUT_POST, 'invDescription', FILTER_SANITIZE_FULL_SPECIAL_CHARS));
    $invImage = trim(filter_input(INPUT_POST, 'invImage', FILTER_SANITIZE_URL));
    $invThumbnail = trim(filter_input(INPUT_POST, 'invThumbnail', FILTER_SANITIZE_URL));
    $invPrice = trim(filter_input(INPUT_POST, 'invPrice', FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION));
    $invMiles = trim(filter_input(INPUT_POST, 'invMiles', FILTER_SANITIZE_NUMBER_FLOAT));
    $invColor = trim(filter_input(INPUT_POST, 'invColor', FILTER_SANITIZE_FULL_SPECIAL_CHARS));
    $classificationId = trim(filter_input(INPUT_POST, 'classificationId', FILTER_SANITIZE_NUMBER_FLOAT));

    // echo $invId, $invMake, $invModel, $invDescription, $invImage, $invThumbnail, $invPrice, $invMiles, $invColor, $classificationId;
    // exit;


    if (empty($invId) || empty($invMake) || empty($invModel) || empty($invDescription) || empty($invImage) || empty($invThumbnail) || empty($invPrice) || empty($invMiles) || empty($invColor) || empty($classificationId)) {
      $message = "<p>Sorry! Please fill out all areas. Please try again.</p>";
      include '../views/vehicle-update.php';
      exit;
    }
    $updateResult = updateVehicle($invId, $invMake, $invModel, $invDescription, $invImage, $invThumbnail, $invPrice, $invMiles, $invColor, $classificationId);
    if ($updateResult) {
      $message = "<p>Congratulations, the $invMake $invModel was successfully updated!</p>";
      $_SESSION['message'] = $message;
      header('location: /phpmotors/routes/vehicles-route.php/');
      exit;
    } else {
      $message = "<p>Error. The new vehicle was not updated.</p>";
      include '../views/vehicle-update.php';
      exit;
    }
    break;

  case 'do_deleteVehicle':
    // $classificationId = filter_input(INPUT_POST, 'classificationId', FILTER_SANITIZE_NUMBER_INT);


    $invId = filter_input(INPUT_POST, 'invId', FILTER_SANITIZE_NUMBER_INT);
    $invMake = trim(filter_input(INPUT_POST, 'invMake', FILTER_SANITIZE_FULL_SPECIAL_CHARS));
    $invModel = trim(filter_input(INPUT_POST, 'invModel', FILTER_SANITIZE_FULL_SPECIAL_CHARS));
    // $invDescription = trim(filter_input(INPUT_POST, 'invDescription', FILTER_SANITIZE_FULL_SPECIAL_CHARS));
    // $classificationId = trim(filter_input(INPUT_POST, 'classificationId', FILTER_SANITIZE_NUMBER_FLOAT));

    // echo $invId, $invMake, $invModel, $invDescription, $invImage, $invThumbnail, $invPrice, $invMiles, $invColor, $classificationId;
    // exit;


    $deleteResult = deleteVehicle($invId);
    if ($deleteResult) {
      $message = "<p>Congratulations, the $invMake $invModel was successfully deleted!</p>";
      $_SESSION['message'] = $message;
      header('location: /phpmotors/routes/vehicles-route.php/');
      exit;
    } else {
      $message = "<p>Error. The new vehicle was not deleted.</p>";
      $_SESSION['message'] = $message;
      header('location: /phpmotors/routes/vehicles-route.php/');
      exit;
    }
    break;
  case 'getInventoryItems':
    /*
    Get vehicles by classificationId
    Used for starting Update & Delete process
    */
    //Get the classificationId
    $classificationId = filter_input(INPUT_GET, 'classificationId', FILTER_SANITIZE_NUMBER_INT);
    //Fetch the vehicles by classificationId from the DB
    $inventoryArray = getInventoryByClassification($classificationId);
    //convert the array to a JSON object and send it baack
    echo json_encode($inventoryArray);
    break;
  case 'vehicleManagement':
    $classificationList = buildClassificationList($classifications);
    include '../views/vehicle-man.php';
    exit;
    break;
  case 'mod':
    /*
    Step1: capture the value of the second name - value pair (remember that this is coming from a link, therefore it is a GET request
    Step2: send the $invId variable into a function that will get the information for that single vehicle
    Step3: check to see if $invInfo has any data. If not, we will set an error message
    Step4: call a view where the data can be displayed so that the changes can be made to the data
    */
    $invId = filter_input(INPUT_GET, 'invId', FILTER_SANITIZE_FULL_SPECIAL_CHARS); //Step1
    // echo $invId;
    $invInfo = getInvItemInfo($invId); //Step2
    if (count($invInfo) < 1) { //Step3
      $message = 'Sorry, no vehicle information could be found';
    }
    include '../views/vehicle-update.php'; //Step4
    break;
  case 'del':
    /*
    Step1: capture the value of the second name - value pair (remember that this is coming from a link, therefore it is a GET request
    Step2: send the $invId variable into a function that will get the information for that single vehicle
    Step3: check to see if $invInfo has any data. If not, we will set an error message
    Step4: call a view where the data can be displayed so that the changes can be made to the data
    */
    $invId = filter_input(INPUT_GET, 'invId', FILTER_SANITIZE_FULL_SPECIAL_CHARS); //Step1
    $invInfo = getInvItemInfo($invId); //Step2
    if (count($invInfo) < 1) { //Step3
      $message = 'Sorry, no vehicle information could be found';
    }
    include '../views/vehicle-delete.php'; //Step4
    break;
    break;
  case "classification":
    //Step1: write code to filter, sanitize and store the second value being sent through the URL (remember URL's are automatically sent using "GET")
    //Step2: create a variable to store the array of vehicles we hope will be returned from the vehicles model
    //Step3: an if - else control structure will be built to see if any vehicles were actually returned or not
    //Step3a: If "No" then an error message will be built
    //Step3b: If "Yes" then the array of vehicles will be sent to custom function to build the HTML around the vehicles information and return it to us for display
    //Step4: a view will be called to display eitherew the message or the vehicles belonging to the car classification clicked on in the navigation bar


    $classificationName = filter_input(INPUT_GET, 'classificationName', FILTER_SANITIZE_FULL_SPECIAL_CHARS); //Step1
    $vehicles = getVehiclesByClassification($classificationName); //Step2
    //Step3
    if (!count($vehicles)) {
      $message = "<p class='notice'>Sorry, no $classificationName vehicles could be found.</p>"; //Step3a
    } else {
      $vehicleDisplay = buildVehiclesDisplay($vehicles); //Step3b
    }
    // echo $vehicleDisplay;
    include '../views/classification.php'; //Step4
    exit;
    break;
  case "classificationName":
    break;
  case "vehicleDescript":
    $invId = filter_input(INPUT_GET, 'invId', FILTER_SANITIZE_FULL_SPECIAL_CHARS); //Step1
    $invInfo = getInvItemInfo($invId); //Step2
    if (count($invInfo) < 1) { //Step3
      $message = 'Sorry, no vehicle information could be found';
    }
    $htmlWrap = vehicleDescript_html($invInfo);
    // standardizeNumb($invInfo);
    // $thumbNails = getThumbnails($invInfo);

    // $thumbnail_list = "<div id='thumbnail_list'>";
    // foreach ($thumbNails as $thumbnail) {
    //   // echo $thumbnail['imgPath'];
    //   $thumbnail_list .= "<img src=$thumbnail[imgPath] alt='$thumbnail[imgName]'>";
    // };
    // $thumbnail_list .= "</div>";

    // $htmlWrap .= $thumbnail_list;

    include '../views/vehicle-detail.php';
    // echo $htmlWrap;
    //Look at Delete Vehicle code
    break;
  case "do_getVehicleInfo":
    //Look at Delete Vehicle code
    break;
  case 'search_dmy':
    include '../views/search-results.php';
    exit;
    break;
  default:
    if (!$_SESSION['loggedIn']) {
      header('Location: /phpmotors/index.php');
      exit;
    } else {
      $classificationList = buildClassificationList($classifications);
      include '../views/vehicle-man.php';
      exit;
      // include "../views/admin.php";
    }
    break;
}
