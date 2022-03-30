<?php
// VEHICLE INVENTORY IMAGE UPLOADS

// Add image information to the database table
function storeImages($imgPath, $invId, $imgName)
{
  /**
   * STEP1: Store the full size image information
   * STEP2: Store the full size image information and Change name in path
   * STEP3: Change name in file name
   * STEP4: inally, the database server is asked to indicate how many rows changed in the table as a result of the query. 
   *        We expect the answer to be "1
   * STEP5: The number of rows changed is returned as an indication of success or failure.
   */

  $db = phpmotorsConnect();
  $sql = 'INSERT INTO images (imgId, invId, imgPath, imgName, imgPrimary) 
          VALUES (:imgId, :invId, :imgPath, :imgName, :imgPrimary)';
  $stmt = $db->prepare($sql);

  // STEP1
  // $stmt->bindValue(':imgId', $imgId, PDO::PARAM_INT);
  $stmt->bindValue(':invId', $invId, PDO::PARAM_INT);
  $stmt->bindValue(':imgPath', $imgPath, PDO::PARAM_STR);
  $stmt->bindValue(':imgName', $imgName, PDO::PARAM_STR);
  // $stmt->bindValue(':imgPrimary', $imgPrimary, PDO::PARAM_INT);
  $stmt->execute();

  $imgPath = makeThumbnailName($imgPath); // STEP2

  // STEP3
  $imgName = makeThumbnailName($imgName);
  // $stmt->bindValue(':invId', $invId, PDO::PARAM_INT); //autoincrament takes care of this, I hope
  $stmt->bindValue(':invId', $invId, PDO::PARAM_INT);
  $stmt->bindValue(':imgPath', $imgPath, PDO::PARAM_STR);
  $stmt->bindValue(':imgName', $imgName, PDO::PARAM_STR);
  // $stmt->bindValue(':imgPrimary', $imgPrimary, PDO::PARAM_INT);
  $stmt->execute();

  $rowsChanged = $stmt->rowCount(); //STEP4
  $stmt->closeCursor();
  return $rowsChanged; //STEP5
}

// Get Image Information from images table
function getImages()
{
  $db = phpmotorsConnect();
  $sql = 'SELECT imgId, imgPath, imgName, imgDate, inventory.invId, invMake, invModel 
          FROM images 
          JOIN inventory 
          ON images.invId = inventory.invId';
  $stmt = $db->prepare($sql);
  $stmt->execute();
  $imageArray = $stmt->fetchAll(PDO::FETCH_ASSOC);
  $stmt->closeCursor();
  return $imageArray;
}

// Delete image information from the images table
function deleteImage($imgId)
{
  $db = phpmotorsConnect();
  $sql = 'DELETE FROM images 
          WHERE imgId = :imgId';
  $stmt = $db->prepare($sql);
  $stmt->bindValue(':imgId', $imgId, PDO::PARAM_INT);
  $stmt->execute();
  $result = $stmt->rowCount();
  $stmt->closeCursor();
  return $result;
}

// Check for an existing image
function checkExistingImage($imgName)
{
  //STEP1: find a matching name in the imgName field based on the variable passed into the function
  //STEP2: The number of matches (if any) is returned to the controller

  $db = phpmotorsConnect();
  $sql = "SELECT imgName 
          FROM images 
          WHERE imgName = :name"; //STEP1
  $stmt = $db->prepare($sql);
  $stmt->bindValue(':name', $imgName, PDO::PARAM_STR);
  $stmt->execute();
  $imageMatch = $stmt->fetch(); //STEP2
  $stmt->closeCursor();
  return $imageMatch;
}


function switchPrimaryImage($isPrimary, $paramImageName, $FKey)
{
  if ($isPrimary == 1) {
    $db = phpmotorsConnect();
    $sql = 'UPDATE inventory 
                SET invImage = :paramImageName,
            -- SET invImage = (SELECT imgPath 
            --                 FROM images
            --                 WHERE imgId = (SELECT imgId
            --                                FROM images
            --                                WHERE imgName = :paramImageName)),
                invThumbnail = (SELECT imgPath
                                FROM images
                                WHERE imgId = ((SELECT imgId
                                            FROM images
                                            WHERE imgName = :paramImageName) + 1))
            WHERE invId = :FKey';
    $stmt = $db->prepare($sql);
    $stmt->bindValue(':paramImageName', $paramImageName, PDO::PARAM_STR);
    $stmt->bindValue(':FKey', $FKey, PDO::PARAM_INT);
    $stmt->execute(); //Step5
    $rowsChanged = $stmt->rowCount(); //Step6
    $stmt->closeCursor(); //Step7
    return $rowsChanged;
  }
}

function getThumbnails($invInfo)
{
  $db = phpmotorsConnect();
  $sql = 'SELECT imgPath, imgName
          FROM images img
          JOIN inventory inv
          ON img.invId = inv.invId
          WHERE (inv.invId = :paramId) AND (imgPath LIKE "%-tn%") AND (inv.invId = img.invId)';
  // WHERE inventory.invId = :paramId AND imagePath = (%-tn%)';
  $stmt = $db->prepare($sql);
  $stmt->bindValue(':paramId', $invInfo['invId'], PDO::PARAM_STR_CHAR);
  $stmt->execute();
  $imageArray = $stmt->fetchAll(PDO::FETCH_ASSOC);
  $stmt->closeCursor();
  return $imageArray;
}


function uploadImage_MainProcess($invId, $imgPrimary)
{
  $imgName = $_FILES['file1']['name'];
  $imageCheck = checkExistingImage($imgName);

  if ($imageCheck) {
    $message = '<p class="notice">An image by that name already exists.</p>'; //STEP2a
  } elseif (empty($invId) || empty($imgName)) {
    $message = '<p class="notice">You must select a vehicle and image file for the vehicle.</p>';
  } else {
    $imgPath = uploadFile('file1'); //STEP3
    $result = storeImages($imgPath, $invId, $imgName, $imgPrimary); //STEP4
    return $result;
  }
}
