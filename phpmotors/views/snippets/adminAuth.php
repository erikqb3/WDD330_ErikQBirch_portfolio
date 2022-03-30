<?php
if ((!$_SESSION['loggedIn']) && ($_SESSION['clientData']['clientLevel'] != 3)) {
  header('Location: /phpmotors/index.php');
  exit;
}
