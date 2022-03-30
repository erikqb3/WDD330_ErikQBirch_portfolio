<?php
// VEHICLE MODEL


// regClient() -> handles site registrations
function newClassification($classificationId, $classificationName)
{
  /* Documentation
    Step1: Create a connection object using the phpmotors connection function
    Step2: The SQL statement
    Step3: Create the prepared statement using the phpmotors connection
    Step4: Replace the placeholders in the SQL statement with the actual values in the variables and tells the database the type of data it is
    Step5: Insert the data
    Step6: Ask how many rows changed as a result of our insert
    Step7: Close the database interaction
    Step8: Return the indication of success (rows changed)
  */
  $db = phpmotorsConnect(); //Step1
  //Step2
  $sql = 'INSERT INTO carclassification (classificationId,classificationName)
     VALUES (:classificationId, :classificationName)';
  $stmt = $db->prepare($sql); //Step3
  $stmt->bindValue(':classificationId', $classificationId, PDO::PARAM_INT); //Step4
  $stmt->bindValue(':classificationName', $classificationName, PDO::PARAM_STR); //Step4
  $stmt->execute(); //Step5
  $rowsChanged = $stmt->rowCount(); //Step6
  $stmt->closeCursor(); //Step7
  return $rowsChanged; //Step8
}

function newVehicle($invId, $invMake, $invModel, $invDescription, $invImage, $invThumbnail, $invPrice, $invMiles, $invColor, $classificationId)
{
  /* Documentation
    Step1: Create a connection object using the phpmotors connection function
    Step2: The SQL statement
    Step3: Create the prepared statement using the phpmotors connection
    Step4: Replace the placeholders in the SQL statement with the actual values in the variables and tells the database the type of data it is
    Step5 Insert the data
    Step6: Ask how many rows changed as a result of our insert
    Step7: Close the database interaction
    Step8: Return the indication of success (rows changed)
  */

  $db = phpmotorsConnect(); //Step1
  //Step2
  $sql = 'INSERT INTO inventory (invId, invMake, invModel,invDescription, invImage, invThumbnail, invPrice, invMiles, invColor, classificationId)
     VALUES (:invId, :invMake, :invModel,:invDescription, :invImage, :invThumbnail, :invPrice, :invMiles, :invColor, :classificationId)';
  $stmt = $db->prepare($sql); //Step3

  //Step4
  $stmt->bindValue(':invId', $invId, PDO::PARAM_INT);
  $stmt->bindValue(':invMake', $invMake, PDO::PARAM_STR);
  $stmt->bindValue(':invMake', $invMake, PDO::PARAM_STR);
  $stmt->bindValue(':invModel', $invModel, PDO::PARAM_STR);
  $stmt->bindValue(':invDescription', $invDescription, PDO::PARAM_STR);
  $stmt->bindValue(':invImage', $invImage, PDO::PARAM_STR);
  $stmt->bindValue(':invThumbnail', $invThumbnail, PDO::PARAM_STR);
  $stmt->bindValue(':invPrice', $invPrice, PDO::PARAM_INT);
  $stmt->bindValue(':invMiles', $invMiles, PDO::PARAM_INT);
  $stmt->bindValue(':invColor', $invColor, PDO::PARAM_STR);
  $stmt->bindValue(':classificationId', $classificationId, PDO::PARAM_INT);

  $stmt->execute(); //Step5
  $rowsChanged = $stmt->rowCount(); //Step6
  $stmt->closeCursor(); //Step7
  return $rowsChanged; //Step8
}

// Get vehicles by classificationId, the required parameter which is a classificationId
function getInventoryByClassification($classificationId)
{
  /*Step1: Calls the database connection
    Step2: The Sql statement to query all inventory from the inventory table with a classificationId that matches the value passed in through the parameter.
    Step3: Creates the PDO prepared statement.
    Step4: Replaces the named placeholder with the actual value as an integer.
    Step5: Runs the prepared statement with the actual value.
    Step6: Requests a multi-dimensional array of the vehicles as an associative array, stores the array in a variable.
    Step7: Closes the database connection.
    Step8: Returns the array.
  */
  $db = phpmotorsConnect(); //Step1
  $sql = ' SELECT * FROM inventory WHERE classificationId = :classificationId'; //Step2
  $stmt = $db->prepare($sql); //Step3
  $stmt->bindValue(':classificationId', $classificationId, PDO::PARAM_INT); //Step4
  $stmt->execute(); //Step5
  $inventory = $stmt->fetchAll(PDO::FETCH_ASSOC); //Step6
  $stmt->closeCursor(); //Step7
  return $inventory; //Step8
}

// Get vehicle information by invId
function getInvItemInfo($invId)
{
  /* Documentation
    Step1: connect to db
    Step2: write query to select all the data for the vehicle based on the id param
    Step3: prepare the code via PDO prepared statement
    Step4: The bindValue method should be treated as an Integer, which it should be and the flag PDO::PARAM_INT specifies.
    Step5: Runs the prepared statement with the actual value.
    Step6: fetches info and puts into an array
    Step7: close statement
    step8: return info as an array
   */
  $db = phpmotorsConnect(); //Step1
  $sql = 'SELECT * 
          FROM inventory inv
          JOIN images img
          ON inv.invId = img.invId
          WHERE inv.invId = :invId'; //Step2
  $stmt = $db->prepare($sql); //Step3
  $stmt->bindValue(':invId', $invId, PDO::PARAM_STR); //Step4
  $stmt->execute(); //Step5
  $invInfo = $stmt->fetch(PDO::FETCH_ASSOC); //Step6
  $stmt->closeCursor(); //Step7
  return $invInfo; //Step8
}


function updateVehicle($invId, $invMake, $invModel, $invDescription, $invImage, $invThumbnail, $invPrice, $invMiles, $invColor, $classificationId)
{
  /* Documentation
     Step1: Create a connection object using the phpmotors connection function
     Step2: The SQL statement
     Step3: Create the prepared statement using the phpmotors connection
     Step4: Replace the placeholders in the SQL statement with the actual values in the variables and tells the database the type of data it is
     Step5 Insert the data
     Step6: Ask how many rows changed as a result of our insert
     Step7: Close the database interaction
     Step8: Return the indication of success (rows changed)
   */

  $db = phpmotorsConnect(); //Step1
  //Step2
  $sql = 'UPDATE inventory SET invMake = :invMake, invModel = :invModel, 
          invDescription = :invDescription, invImage = :invImage,
          invThumbnail = :invThumbnail, invPrice = :invPrice,
          invMiles = :invMiles, invColor = :invColor,
          classificationId = :classificationId WHERE invId = :invId';
  $stmt = $db->prepare($sql); //Step3

  //Step4
  $stmt->bindValue(':invId', $invId, PDO::PARAM_INT);
  $stmt->bindValue(':invMake', $invMake, PDO::PARAM_STR);
  $stmt->bindValue(':invModel', $invModel, PDO::PARAM_STR);
  $stmt->bindValue(':invDescription', $invDescription, PDO::PARAM_STR);
  $stmt->bindValue(':invImage', $invImage, PDO::PARAM_STR);
  $stmt->bindValue(':invThumbnail', $invThumbnail, PDO::PARAM_STR);
  $stmt->bindValue(':invPrice', $invPrice, PDO::PARAM_INT);
  $stmt->bindValue(':invMiles', $invMiles, PDO::PARAM_INT); //REMOVE STOCK AND REPLACE WITH MILES
  $stmt->bindValue(':invColor', $invColor, PDO::PARAM_STR);
  $stmt->bindValue(':classificationId', $classificationId, PDO::PARAM_INT);

  $stmt->execute(); //Step5
  $rowsChanged = $stmt->rowCount(); //Step6
  $stmt->closeCursor(); //Step7
  return $rowsChanged; //Step8
}


function deleteVehicle($invId)
{
  /* Documentation
     Step1: Create a connection object using the phpmotors connection function
     Step2: The SQL statement
     Step3: Create the prepared statement using the phpmotors connection
     Step4: Replace the placeholders in the SQL statement with the actual values in the variables and tells the database the type of data it is
     Step5: Insert the data
     Step6: Ask how many rows changed as a result of our insert
     Step7: Close the database interaction
     Step8: Return the indication of success (rows changed)
   */

  $db = phpmotorsConnect(); //Step1
  //Step2
  $sql = 'DELETE FROM inventory 
   WHERE invId = :invId';
  $stmt = $db->prepare($sql); //Step3

  //Step4
  $stmt->bindValue(':invId', $invId, PDO::PARAM_INT);

  $stmt->execute(); //Step5
  $rowsChanged = $stmt->rowCount(); //Step6
  $stmt->closeCursor(); //Step7
  return $rowsChanged; //Step8
}

// will get a list of vehicles based on the classification
function getVehiclesByClassification($classificationName)
{
  //Step1: connect to database
  //Step2: create a query to retrive the data, needs a subquery. The keyword "IN" (instead of = ) refers to the value to be returned from the subquery.
  //Step3: create a statement out of the query
  //Step4: connect the parameter's arguement to the query
  //Step5: carry out the query
  //Step6: close the connection

  $db = phpmotorsConnect();
  $sql = 'SELECT * 
          FROM inventory inv
          JOIN images img
          ON inv.invId = img.invId
          WHERE inv.classificationId 
            IN (SELECT classificationId 
                FROM carclassification 
                WHERE classificationName = :classificationName) 
            AND (imgName NOT LIKE "%-tn%")';

  $stmt = $db->prepare($sql);
  $stmt->bindValue(':classificationName', $classificationName, PDO::PARAM_STR);
  $stmt->execute();
  $vehicles = $stmt->fetchAll(PDO::FETCH_ASSOC);
  $stmt->closeCursor();
  return $vehicles;
}
