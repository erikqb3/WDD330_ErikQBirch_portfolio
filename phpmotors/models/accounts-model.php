<?php
// ACCOUNTS MODEL


// regClient() -> handles site registrations
function regClient($clientId, $clientFirstname, $clientLastname, $clientEmail, $clientPassword)
{
  /*
    // (Line 18) Create a connection object using the phpmotors connection function
    // (Linen 19-20) The SQL statement
    // (Line 21) Create the prepared statement using the phpmotors connection
    // (Lines 23-26)The next four lines replace the placeholders in the SQL
    // - statement with the actual values in the variables
    // - and tells the database the type of data it is
    // (Line 28) Insert the data
    // (Line 29) Ask how many rows changed as a result of our insert
    // (Line 30) Close the database interaction
    // (Line 31) Return the indication of success (rows changed)
  */
  $db = phpmotorsConnect();
  $sql = 'INSERT INTO clients (clientId, clientFirstname, clientLastname,clientEmail, clientPassword)
     VALUES (:clientId, :clientFirstname, :clientLastname, :clientEmail, :clientPassword)';
  $stmt = $db->prepare($sql);

  $stmt->bindValue(':clientId', $clientId, PDO::PARAM_INT);
  $stmt->bindValue(':clientFirstname', $clientFirstname, PDO::PARAM_STR);
  $stmt->bindValue(':clientLastname', $clientLastname, PDO::PARAM_STR);
  $stmt->bindValue(':clientEmail', $clientEmail, PDO::PARAM_STR);
  $stmt->bindValue(':clientPassword', $clientPassword, PDO::PARAM_STR);

  $stmt->execute();
  $rowsChanged = $stmt->rowCount();
  $stmt->closeCursor();
  return $rowsChanged;
}


// Check for an existing email address
function checkExistingEmail($clientEmail)
{
  // Step1 - sql work
  // Step2 - fetch data from sql extraction andn close sql work
  // Step3 - return 0 if $matchemail is empty and 1 if it's not

  //Step1
  $db =  phpmotorsConnect();
  $sql = 'SELECT clientEmail FROM clients WHERE clientEmail = :email';
  $stmt = $db->prepare($sql);
  $stmt->bindValue(':email', $clientEmail, PDO::PARAM_STR);
  $stmt->execute();
  // Step2
  $matchEmail = $stmt->fetch(PDO::FETCH_NUM);
  $stmt->closeCursor();
  // Step3
  if (empty($matchEmail)) {
    return 0;
    // echo 'Nothing found';
    exit;
  } else {
    return 1;
    // echo 'Match found';
    exit;
  }
}


// Get client data based on an email address
function getClient($clientEmail)
{
  //Step1 - get client data
  //Step2 - return array using database field names
  //Step3 - fetch data
  $db = phpmotorsConnect();
  $sql = 'SELECT clientId, clientFirstname, clientLastname, clientEmail, clientLevel, clientPassword FROM clients WHERE clientEmail = :clientEmail';
  $stmt = $db->prepare($sql);
  $stmt->bindValue(':clientEmail', $clientEmail, PDO::PARAM_STR);
  $stmt->execute();
  $clientData = $stmt->fetch(PDO::FETCH_ASSOC);
  $stmt->closeCursor();
  return $clientData;
}


function updateAccount($clientId, $clientFirstname, $clientLastname, $clientEmail)
{
  $db = phpmotorsConnect();
  $sql = 'UPDATE clients SET clientFirstname = :clientFirstname, clientLastname = :clientLastname, clientEmail = :clientEmail WHERE clientId = :clientId';
  $stmt = $db->prepare($sql);

  $stmt->bindValue(':clientId', $clientId, PDO::PARAM_INT);
  $stmt->bindValue(':clientFirstname', $clientFirstname, PDO::PARAM_STR);
  $stmt->bindValue(':clientLastname', $clientLastname, PDO::PARAM_STR);
  $stmt->bindValue(':clientEmail', $clientEmail, PDO::PARAM_STR);

  $stmt->execute();
  $rowsChanged = $stmt->rowCount();
  $stmt->closeCursor();
  return $rowsChanged;
}

function changeEmail($clientId, $desiredPassword)
{
  $db = phpmotorsConnect();
  $sql = 'UPDATE clients SET clientPassword = :desiredPassword WHERE clientId = :clientId';
  $stmt = $db->prepare($sql);

  $stmt->bindValue(':clientId', $clientId, PDO::PARAM_INT);
  $stmt->bindValue(':desiredPassword', $desiredPassword, PDO::PARAM_STR);

  $stmt->execute();
  $rowsChanged = $stmt->rowCount();
  $stmt->closeCursor();
  return $rowsChanged;
}
