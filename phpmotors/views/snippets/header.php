<!-- <a href="/phpmotors" id="imgLink"><img src="/phpmotors/images/site/logo.png" alt="phpMotors_logo"></a> -->
<a href="/phpmotors/index.php?action=oof" id="imgLink"><img src="/phpmotors/images/site/logo.png" alt="phpMotors_logo"></a>
<input type="text" name="searchBar" id="searchBar" placeholder="Press 🔍 to Search">
<label id="searchBtn" for="searchBar">🔍</label>
<!-- <span>🔍</span> -->
<!-- <a href="/phpmotors/routes/vehicles-route.php?action=addVehicle" id="imgLink"><img src="/phpmotors/images/site/logo.png" alt="phpMotors_logo"></a> -->
<?php


if (!(isset($_SESSION['loggedIn'])) || ($_SESSION['loggedIn'] == false)) {
      $loggedInSettings = "<div id='loggedInSettings'>" . "<a href='/phpmotors/routes/accounts-route.php?action=go_logIn' id='btnLink'>My Account</a>" . "</div>";
      echo $loggedInSettings;
} else {
      // $welcomeLink = "<a href='/accounts/index.php?action=go_admin'>" . $_SESSION['clientData']['clientFirstname'] . "</a>";
      $welcomeLink = "<a href='/phpmotors/routes/accounts-route.php'>" . $_SESSION['clientData']['clientFirstname'] . "</a>";
      $loggedInSettings = "<div id='loggedInSettings'>" . $welcomeLink . " | <a href='/phpmotors/routes/accounts-route.php?action=do_logout' id='btnLink'>Log Out</a>" . "</div>";
      echo $loggedInSettings;
}
?>

<!-- <a href="/phpmotors/routes/accounts-route.php?action=go_logIn" id="btnLink">My Account</a> -->

<!-- <button action="/phpmotors/routes/accounts-route.php" method="POST">Account</button> -->