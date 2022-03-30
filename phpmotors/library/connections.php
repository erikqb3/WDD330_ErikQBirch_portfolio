<?php
/*
Poxy connection to the phpmotors*/

function phpmotorsConnect()
{
  $server = 'localhost';
  $dbname = 'phpmotors';
  $username = 'iClient';
  $password = 'DiscipleofChrist2408';
  $dsn = "mysql:host=$server;dbname=$dbname"; // dsn Data Source Name
  $options = array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION);

  try {
    $link = new PDO($dsn, $username, $password, $options);
    return $link;
  } catch (PDOException $e) {
    header("Location: /phpmotors/views/500.php"); //similar to include but instead of covering screen, entirely redirects
    exit;
  }
}

// FOR TESTING PURPOSES ONLY, COMMENT IT OUT AFTER SUBMISSION
// phpmotorsConnect();
