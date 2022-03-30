<?php
// echo $_SESSION['loggedIn'];
if (!$_SESSION['loggedIn']) {
  header('Location: /phpmotors/index.php');
  exit;
}
