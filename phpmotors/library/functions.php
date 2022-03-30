<?php

// session_start();

require_once 'C:\xampp\htdocs\phpmotors\models\uploads-model.php'; //has to be exact path, not relative

//MAIN
function establishNav($classifications)
{
  $navList = '<ul>';
  $navList .= "<li><a href='/phpmotors/' title='View the PHP Motors home page'>Home</a></li>"; // .= adds to the variable
  foreach ($classifications as $classification) {
    $navList .= "<li><a href='/phpmotors/routes/vehicles-route.php/?action=classification&classificationName="
      . urlencode($classification['classificationName'])
      . "' title='View our $classification[classificationName] product line'>$classification[classificationName]</a></li>";
  }
  $navList .= '</ul>';
  return $navList;
}
//ACOUNTS
function validateEmail($clientEmail)
{
  $valEmail = trim(filter_var($clientEmail, FILTER_VALIDATE_EMAIL));
  return $valEmail;
}
function checkPassword($clientPassword)
{
  $pattern = '/^(?=.*[[:digit:]])(?=.*[[:punct:]\s])(?=.*[A-Z])(?=.*[a-z])(?:.{8,})$/';
  return preg_match($pattern, $clientPassword);
}
function message($msg = "") //made a default
{
  if (!empty($msg)) {
    $_SESSION['message'] = $msg;
    return true;
  } else {
    return;
  }
}

//VEHICLES
// Build the classifications select list, the parameter - an array of classifications
function buildClassificationList($classifications_array)
{
  /* Documentation
    Step1: Begins the select element.
    Step2: Creates a default option with no value.
    Step3: A foreach loop to create a new option for each element within the array.
    Step4: Ends the select element.
    Step5: Returns the finished select element that has been stored into the variable.
  */
  $classificationList = '<select name="classificationId" id="classificationList">'; //Step1
  $classificationList .= "<option>Choose a Classification</option>"; //Step2
  foreach ($classifications_array as $classification) { //Step3
    $classificationList .= "<option value='$classification[classificationId]'>$classification[classificationName]</option>";
  }
  $classificationList .= '</select>'; //Step4
  return $classificationList; //Step5
}
//create the html based on the queried data and nav button clicked
function buildVehiclesDisplay($vehicles)
{

  $dv = '<ul id="inv-display">';
  foreach ($vehicles as $vehicle) {
    // $standardPrice = standardizeNumb($vehicle['invPrice']);
    $standardPrice = number_format($vehicle['invPrice']);
    // echo $vehicle['invImage'];
    $dv .= '<li>';
    // $dv .= "<img src='$vehicle[invThumbnail]' alt='Image of $vehicle[invMake] $vehicle[invModel] on phpmotors.com'>";
    $dv .= "<a href='/phpmotors/routes/vehicles-route.php?action=vehicleDescript&invId=$vehicle[invId]'><img src='/phpmotors/images/vehicles/$vehicle[imgName]' alt='Image of $vehicle[invMake] $vehicle[invModel] on phpmotors.com'></a>";
    // $dv .= '<hr>';
    $dv .= "<a href='/phpmotors/routes/vehicles-route.php?action=vehicleDescript&invId=$vehicle[invId]'><h2>$vehicle[invMake] $vehicle[invModel]</h2></a>";
    $dv .= "<span>$$standardPrice.00</span>";
    $dv .= '</li>';
  }
  $dv .= '</ul>';
  return $dv;
}
function vehicleDescript_html($invInfo)
{
  $standardPrice = number_format($invInfo["invPrice"]);
  $standardMiles = number_format($invInfo["invMiles"]);

  $mainContent = "<div id='vehicDescriptContent'>";
  $mainContent .= "<img src='../images/vehicles/$invInfo[imgName]' alt='$invInfo[invMake] $invInfo[invModel]'>
                <div id='vehicInfo'>
                <h1>$invInfo[invMake] $invInfo[invModel] Details</h1>
                <h2>Price: $$standardPrice.00</h2>
                <p>$invInfo[invDescription]</p>
                <p>Color: $invInfo[invColor]</p>
                <p>Miles: $standardMiles</p>
                </div>";
  $thumbNails = getThumbnails($invInfo);

  $thumbnail_list = "<div id='thumbnail_list'>";
  foreach ($thumbNails as $thumbnail) {
    // echo $thumbnail['imgPath'];
    $thumbnail_list .= "<img src=$thumbnail[imgPath] alt='$thumbnail[imgName]'>";
  };
  $thumbnail_list .= "</div>";

  $mainContent .= $thumbnail_list;

  $mainContent .= "</div>";
  return $mainContent;
}
function standardizeNumb($inputNumb)
{
  $standardNumb = "<span>";
  $input = strval($inputNumb);
  $numb = str_split($input);
  $ii = (count($numb) + 2);

  for ($i = 0; $i <= (count($numb) - 1); $i++) {
    // echo $numb[$i];
    $standardNumb .= $numb[$i];
    if (($ii % 3 == 0) && ($i != count($numb) - 1)) {
      // echo ",";
      $standardNumb .= ",";
    }
    $ii--;
  }
  $standardNumb .= "</span>";
  return $standardNumb;

  //number_format($variable)
  //formatCurrency
}


//IMAGE UPLOADS
// Adds "-tn" designation to file name
function makeThumbnailName($image) //STEP0
{
  /**
   * STEP0: The function needs a string representing a name (the path or file name) of an image (e.g. hummer.jpg). This is sent into the function as a parameter. The PHP strrpos() function looks for the location of the period i
   * STEP1: The PHP strrpos() function looks for the location of the period in the name. When found it sends back the position as a number (the # of characters in the string where the period is located - hummer.jpg: the period is "7" in the string).
   * STEP2: The PHP substr() function is then used to break the string apart as if it were an array. Everything to the left of the period (now referred to as $i is element zero "0" in the array. It is the $image_name (e.g. hummer).
   * STEP3: Whatever is left in the array is the file extension (now stored as $ext (e.g. jpg)
   * STEP4: Finally, the file name is concatenated to the "-tn" string and the extension is concatenated to the end (e.g. hummer-tn.jpg)
   * STEP5: The now altered name of the "thumbnail" is returned.
   * Note: If more than one period exists, the function may possibly return unexpected results. This is why file names should have only a single period in them to separate the name from the extension!
   */

  $i = strrpos($image, '.'); //STEP1
  $image_name = substr($image, 0, $i); //STEP2
  $ext = substr($image, $i); //STEP3
  $image = $image_name . '-tn' . $ext; //STEP4
  return $image; //STEP5
}
// Build images display for image management view
function buildImageDisplay($imageArray) //STEP0
{
  /**
   * STEP0: The function expects a multi-dimensional array of image and vehicles in inventory information (this would have been queried from the function on the model.
   * STEP1: This function then builds an unordered list.
   * STEP2: Using a foreach() loop the multi-dimensional array is broken apart into simple arrays.
   * STEP3: The various elements of the simple array are used to insert the picture into a list item
   * STEP4: A paragraph with a link is also inserted into the list item. The link is what is used to trigger the delete functionality to remove an image from the site and the database.
   * STEP5: When the foreach() loop finishes, the unordered list is closed.
   * STEP6: The complete unordered list, with all the images and links is returned.
   */
  $id = '<ul id="image-display">'; //STEP1
  foreach ($imageArray as $image) { //STEP2
    $id .= '<li>';
    $id .= "<img src='$image[imgPath]' title='$image[invMake] $image[invModel] image on PHP Motors.com' alt='$image[invMake] $image[invModel] image on PHP Motors.com'>"; //STEP3
    $id .= "<p><a href='/phpmotors/routes/uploads-route.php?action=delete&imgId=$image[imgId]&filename=$image[imgName]' title='Delete the image'>Delete $image[imgName]</a></p>"; //STEP4
    $id .= '</li>';
  }
  $id .= '</ul>'; //STEP5
  return $id; //STEP6
}
// Build the vehicles select list
function buildVehiclesSelect($vehicles)
{
  $prodList = '<select name="invId" id="invId">';
  $prodList .= "<option>Choose a Vehicle</option>";
  foreach ($vehicles as $vehicle) {
    $prodList .= "<option value='$vehicle[invId]'>$vehicle[invMake] $vehicle[invModel]</option>";
  }
  $prodList .= '</select>';
  return $prodList;
}
// Handles the file upload process and returns the path
// The file path is stored into the database
function uploadFile($name) //STEP0
{
  /**
   * STEP0: The name of the uploaded file is sent into the function as a parameter.
   * STEP1: The path variables (from the controller) are "global"-ized, meaning they are brought into the function's scope for use.
   * STEP2: A series of checks are used to make sure there is a physical file in the PHP $_FILES super global object. This is similar to other super globals ($_SESSION, $_POST, $_GET) in that they work like associative arrays. In this case the $_FILES super global handles all file uploads.
   * STEP3: All uploads are stored in a temporary location, that is found.
   * STEP4: The path to the permanant storage location is built.
   * STEP5: The physical file is then moved to the permanent location.
   * STEP6: The physical file is then sent to another process for manipulation (it will be our next function).
   * STEP7: Finally the path to where the file is stored is finished and returned for inserting to the database.
   */


  global $image_dir, $image_dir_path; //STEP1
  //STEP2
  if (isset($_FILES[$name])) {
    $filename = $_FILES[$name]['name'];
    if (empty($filename)) {
      return;
    }

    $source = $_FILES[$name]['tmp_name']; //STEP3
    $target = $image_dir_path . '/' . $filename; //STEP4
    move_uploaded_file($source, $target); //STEP5
    processImage($image_dir_path, $filename); //STEP6

    //STEP7
    $filepath = $image_dir . '/' . $filename;
    return $filepath;
  }
}
// Processes images by getting paths and 
// creating smaller versions of the image
function processImage($dir, $filename)
{
  /**
   * STEP1: Set up the variables
   * STEP2: Set up the image path
   * STEP3: Set up the thumbnail image path
   * STEP4: Create a thumbnail image that's a maximum of 200 pixels square
   * STEP5: Resize original to a maximum of 500 pixels square
   */

  $dir = $dir . '/'; //STEP1
  $image_path = $dir . $filename; //STEP2
  $image_path_tn = $dir . makeThumbnailName($filename); //STEP3
  resizeImage($image_path, $image_path_tn, 200, 200); //STEP4
  resizeImage($image_path, $image_path, 500, 500); //STEP5
}
// checks that only image files are being uploaded, checks the size of the image and resizing it if it is larger than what was specified, replaces old images with new versions, and destroys temporary files that may exist
function resizeImage($old_image_path, $new_image_path, $max_width, $max_height)
{
  /**
   * STEP1: Get image type
   * STEP2: Set up the function names
   * STEP3: Get the old image and its height and width
   * STEP4: Calculate height and width ratios
   * STEP5: If image is larger than specified ratio, create the new image
   * STEP6: Calculate height and width for the new image
   * STEP7: Create the new image
   * STEP8: Set transparency according to image type
   * STEP9: Copy old image to new image - this resizes the image
   * STEP10: Write the new image to a new file
   * STEP11: Free any memory associated with the new image
   * STEP12: Write the old image to a new file
   * STEP13: Free any memory associated with the old image
   */
  //STEP1
  $image_info = getimagesize($old_image_path);
  $image_type = $image_info[2];

  //STEP2
  switch ($image_type) {
    case IMAGETYPE_JPEG:
      $image_from_file = 'imagecreatefromjpeg';
      $image_to_file = 'imagejpeg';
      break;
    case IMAGETYPE_GIF:
      $image_from_file = 'imagecreatefromgif';
      $image_to_file = 'imagegif';
      break;
    case IMAGETYPE_PNG:
      $image_from_file = 'imagecreatefrompng';
      $image_to_file = 'imagepng';
      break;
    default:
      return;
  }
  // echo $image_info;
  // echo $image_type . "imageType";
  //STEP3
  $old_image = $image_from_file($old_image_path);
  $old_width = imagesx($old_image);
  $old_height = imagesy($old_image);

  // STEP4
  $width_ratio = $old_width / $max_width;
  $height_ratio = $old_height / $max_height;

  //STEP5
  if ($width_ratio > 1 || $height_ratio > 1) {

    //STEP6
    $ratio = max($width_ratio, $height_ratio);
    $new_height = round($old_height / $ratio);
    $new_width = round($old_width / $ratio);

    $new_image = imagecreatetruecolor($new_width, $new_height); //STEP7

    //STEP8
    if ($image_type == IMAGETYPE_GIF) {
      $alpha = imagecolorallocatealpha($new_image, 0, 0, 0, 127);
      imagecolortransparent($new_image, $alpha);
    }

    if ($image_type == IMAGETYPE_PNG || $image_type == IMAGETYPE_GIF) {
      imagealphablending($new_image, false);
      imagesavealpha($new_image, true);
    }

    //STEP9
    $new_x = 0;
    $new_y = 0;
    $old_x = 0;
    $old_y = 0;
    imagecopyresampled($new_image, $old_image, $new_x, $new_y, $old_x, $old_y, $new_width, $new_height, $old_width, $old_height);

    $image_to_file($new_image, $new_image_path); //STEP10
    imagedestroy($new_image); //STEP11
  } else {
    $image_to_file($old_image, $new_image_path); //STEP12
  }

  imagedestroy($old_image); //STEP13
}


//SEARCH RESULTS
function singleResult_HTML($info)
{
  $price = number_format($info['invPrice']);
  $resultCard = "<div class='resultCard'><a href='http://localhost/phpmotors/routes/vehicles-route.php?action=vehicleDescript&invId=$info[invId]'>";
  $resultCard .= "<img src='$info[imgPath]' alt='$info[invMake] $info[invModel]'>";
  $resultCard .= "<div class='resultInfo'>
                    <h3>$info[invMake] $info[invModel]</h3>
                    <h4>$$price.00</h4>
                    <p>$info[invDescription]</p>
                    </div>";
  $resultCard .= "</a></div>";
  return $resultCard;
}

function establishPagNav($searchParam, $pagNavNumb)
{
  $counter = 0;
  $pagNavCounter = $counter + 1;
  $backNumb = $pagNavNumb - 1;
  $nextNumb = $pagNavNumb + 1;
  $pagNav_bar = "<div id='pagNav_bar'>";
  if ($pagNavNumb != 0) {
    $pagNav_bar .= "<a href='/phpmotors/routes/search-route.php?action=search_dmy&pagNavNumb=$backNumb&searchParam=$searchParam' id='backBtn'>PREV</a>";
  }
  foreach ($_SESSION["pagNav"] as $button) {
    if ($counter == ($pagNavNumb)) {
      $pagNav_btn = "<a href='/phpmotors/routes/search-route.php?action=search_dmy&pagNavNumb=$counter&searchParam=$searchParam' id='current'>$pagNavCounter</a>";
    } else {
      $pagNav_btn = "<a href='/phpmotors/routes/search-route.php?action=search_dmy&pagNavNumb=$counter&searchParam=$searchParam'>$pagNavCounter</a>";
    }
    $pagNav_bar .= $pagNav_btn;
    $counter++;
    $pagNavCounter++;
  }
  if ($pagNavNumb != (count($_SESSION["pagNav"]) - 1)) {
    $pagNav_bar .= "<a href='/phpmotors/routes/search-route.php?action=search_dmy&pagNavNumb=$nextNumb&searchParam=$searchParam' id='nextBtn'>NEXT</a>";
  }
  $pagNav_bar .= "</div>";
  return $pagNav_bar;
}
