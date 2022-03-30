<?php
// MAIN MODEL

function getClassifications() //original
{
  $db = phpmotorsConnect(); // Create a connection object from the phpmotors connection function 
  $sql =
    'SELECT classificationName, classificationId 
    FROM carclassification 
    ORDER BY classificationName ASC'; // The SQL statement to be used with the database 
  $stmt = $db->prepare($sql); // This line creates the prepared statement using the phpmotors connection      
  $stmt->execute(); // this line runs the prepared statement 
  $classifications = $stmt->fetchAll(); // This line gets the data from the database and stores it as an array in the $classifications variable 
  $stmt->closeCursor(); // This line closes the interaction with the database 
  return $classifications; // The next line sends the array of data back to where the function was called (this should be the controller) 
}


function getInventoryID()
{
  $db = phpmotorsConnect(); // Create a connection object from the phpmotors connection function 
  $sql =
    'SELECT invId 
    FROM inventory
    ORDER BY invId ASC'; // The SQL statement to be used with the database 
  $stmt = $db->prepare($sql); // This line creates the prepared statement using the phpmotors connection      
  $stmt->execute(); // this line runs the prepared statement 
  $inventory = $stmt->fetchAll(); // This line gets the data from the database and stores it as an array in the $classifications variable 
  $stmt->closeCursor(); // This line closes the interaction with the database 
  return $inventory; // The next line sends the array of data back to where the function was called (this should be the controller) 
}


// Get information for all vehicles
function getVehicles()
{
  $db = phpmotorsConnect();
  $sql = 'SELECT invId, invMake, invModel FROM inventory';
  $stmt = $db->prepare($sql);
  $stmt->execute();
  $invInfo = $stmt->fetchAll(PDO::FETCH_ASSOC);
  $stmt->closeCursor();
  return $invInfo;
}

function getClients_ID()
{
  $db = phpmotorsConnect(); // Create a connection object from the phpmotors connection function 
  $sql =
    'SELECT clientId 
    FROM clients
    ORDER BY clientId ASC'; // The SQL statement to be used with the database 
  $stmt = $db->prepare($sql); // This line creates the prepared statement using the phpmotors connection      
  $stmt->execute(); // this line runs the prepared statement 
  $inventory = $stmt->fetchAll(); // This line gets the data from the database and stores it as an array in the $classifications variable 
  $stmt->closeCursor(); // This line closes the interaction with the database 
  return $inventory; // The next line sends the array of data back to where the function was called (this should be the controller) 
}


function getImage_ID()
{
  $db = phpmotorsConnect(); // Create a connection object from the phpmotors connection function 
  $sql =
    'SELECT imgId 
    FROM images
    ORDER BY imgId ASC'; // The SQL statement to be used with the database 
  $stmt = $db->prepare($sql); // This line creates the prepared statement using the phpmotors connection      
  $stmt->execute(); // this line runs the prepared statement 
  $images = $stmt->fetchAll(); // This line gets the data from the database and stores it as an array in the $classifications variable 
  $stmt->closeCursor(); // This line closes the interaction with the database 
  return $images; // The next line sends the array of data back to where the function was called (this should be the controller) 
}
//WHY NOT DO "SELECT * FROM [Table]" instead of individual stuff like ID or Model or stuff?