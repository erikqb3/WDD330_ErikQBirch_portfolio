<?php
//IMAGE UPLOADS CONTROLLER

if (!isset($_SESSION)) {
  session_start();
}

require_once '../library/connections.php';
require_once '../models/main-model.php';
require_once '../models/vehicles-model.php';
require_once '../models/uploads-model.php';
require_once '../library/functions.php';

// Get the array of classifications
$classifications = getClassifications();
$images = getImage_ID();



// Build a navigation bar using the $classifications array
$navList = establishNav($classifications);

$action = filter_input(INPUT_POST, 'action', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
if ($action == NULL) {
  $action = filter_input(INPUT_GET, 'action', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
}

/* * ****************************************************
* Variables for use with the Image Upload Functionality
* **************************************************** */
// directory name where uploaded images are stored
// $image_dir = '/phpmotors/routes/uploads-route.php/images';
$image_dir = '/phpmotors/images/vehicles';
// The path is the full path from the server root
$image_dir_path = $_SERVER['DOCUMENT_ROOT'] . $image_dir;


switch ($action) {
  case 'upload':
    /**
     * STEP1: Store the incoming vehicle id and primary picture indicator
     * STEP2: Store the name of the uploaded image and check if an image by the name of the uploaded image already exists in the database table.
     * STEP2a: If the name check returns TRUE then an error message is set.
     * STEP3: Upload the image, store the returned path to the file
     * STEP4: Insert the image information to the database, get the result
     * STEP5: Set a message based on the insert result
     * STEP6: Store message to session
     * STEP7: Redirect to this controller for default action
     */


    $counter = 0;
    foreach ($images as $imageID) {
      $counter++;
    }
    $imgId = $counter + 1;

    // STEP1
    $invId = filter_input(INPUT_POST, 'invId', FILTER_VALIDATE_INT);
    $imgPrimary = filter_input(INPUT_POST, 'imgPrimary', FILTER_VALIDATE_INT);

    // STEP2
    $imgName = $_FILES['file1']['name'];
    $imageCheck = checkExistingImage($imgName);

    if ($imageCheck) {
      $message = '<p class="notice">An image by that name already exists.</p>'; //STEP2a
    } elseif (empty($invId) || empty($imgName)) {
      $message = '<p class="notice">You must select a vehicle and image file for the vehicle.</p>';
    } else {
      $imgPath = uploadFile('file1'); //STEP3
      $result = storeImages($imgPath, $invId, $imgName); //STEP4

      // STEP5
      if ($result) {
        $results = switchPrimaryImage($imgPrimary, $imgName, $invId);
        if ($results) {
          $message = '<p class="notice">The upload succeeded.</p>';
        } else {
          $message = '<p class="notice">The upload succeeded.</p>';
        }
      } else {
        $message = '<p class="notice">Sorry, the upload failed.</p>';
      }
    }

    $_SESSION['message'] = $message; //STEP6

    header('location: .'); //STEP7
    break;
  case 'delete':
    /**
     * STEP1: Get the image name and id
     * STEP2: Build the full path to the image to be deleted
     * STEP3: Check that the file exists in that location
     * STEP4: Deletes the file in the folder
     * STEP5: Remove from database only if physical file deleted
     * STEP6: Set a message based on the delete result
     * STEP7: Store message to session
     * STEP8: Redirect to this controller for default action
     */

    // STEP1
    $filename = filter_input(INPUT_GET, 'filename', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $imgId = filter_input(INPUT_GET, 'imgId', FILTER_VALIDATE_INT);

    $target = $image_dir_path . '/' . $filename; //STEP2

    // STEP3
    if (file_exists($target)) {
      $result = unlink($target); //STEP4
    }
    if ($result) {
      $remove = deleteImage($imgId); //STEP5
    }

    // STEP6
    if ($remove) {
      $message = "<p class='notice'>$filename was successfully deleted.</p>";
    } else {
      $message = "<p class='notice'>$filename was NOT deleted.</p>";
    }

    $_SESSION['message'] = $message; //STEP7

    header('location: .'); //STEP8
    break;
  default:
    /**
     * STEP1: Call function to return image info from database
     * STEP2: If the array has at least one item, build the image information into HTML for display
     * STEP3: Get vehicles information from database
     * STEP4: Build a select list of vehicle information for the view
     */

    $imageArray = getImages(); //STEP1 

    // STEP2
    if (count($imageArray)) {
      $imageDisplay = buildImageDisplay($imageArray);
    } else {
      $imageDisplay = '<p class="notice">Sorry, no images could be found.</p>';
    }

    $vehicles = getVehicles(); // STEP3
    $prodSelect = buildVehiclesSelect($vehicles); // STEP4
    include '../views/image-admin.php';
    exit;
    break;
}
