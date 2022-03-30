<?php require $_SERVER['DOCUMENT_ROOT'] . '/phpmotors/views/snippets/authentication.php' ?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="/phpmotors/css/index.css" rel="stylesheet">
  <script src="/phpmotors/javascript/index.js" defer></script>
  <title>Admin View</title>
</head>

<body>
  <main>
    <div id="contentWrap">
      <header>
        <?php require $_SERVER['DOCUMENT_ROOT'] . '/phpmotors/views/snippets/header.php' ?>
      </header>
      <nav>
        <!-- <?php require $_SERVER['DOCUMENT_ROOT'] . '/phpmotors/views/snippets/nav.php' ?> -->
        <?php echo $navList; ?>
      </nav>
      <div id="mainContent">
        <?php
        $fullName = $_SESSION['clientData']['clientFirstname'] . " " .  $_SESSION['clientData']['clientLastname'];
        echo "<h1>$fullName</h1>";
        if (isset($_SESSION['message'])) {
          echo $_SESSION['message'];
          $d = strtotime("Now");
          date_default_timezone_set("America/Boise");
          echo "Created date is " . date("Y-m-d h:i:sa", $d);
        }
        // echo "<p> You are logged in!</p>";
        $userInfo = "<ul>";
        $userInfo .= "<li>First name: " . $_SESSION['clientData']['clientFirstname'] . "</li>";
        $userInfo .= "<li>Last name: " . $_SESSION['clientData']['clientLastname'] . "</li>";
        $userInfo .= "<li>Email: " . $_SESSION['clientData']['clientEmail'] . "</li>";
        // $userInfo .= "<li>Client Status: " . $_SESSION['clientData']['clientLevel'] . "</li>";
        $userInfo .= "</ul>";
        echo $userInfo;

        $accountManagementDiv =
          "<div id='accountManagementDiv' class='managementBtn'>" .
          // "<h1>Account Management</h1>" .
          // "<p>Use this link to update account information</p>" .
          "<a href='/phpmotors/routes/accounts-route.php?action=go_clientUpdate'>Update account Information</a>" .
          //"<a href='/phpmotors/routes/vehicles-route.php?action=vehicleManagement'>Vehicle Management</a>" .
          "</div>";
        echo $accountManagementDiv;


        if ($_SESSION['clientData']['clientLevel'] == 3) {
          $vehicleManagementDiv =
            "<div id='vehicleManagementDiv' class='managementBtn'>" .
            // "<h1>Inventory Management</h1>" .
            // "<p>Use this link to mangage the inventory</p>" .
            "<a href='/phpmotors/routes/vehicles-route.php'>Vehicle Management</a>" .
            //"<a href='/phpmotors/routes/vehicles-route.php?action=vehicleManagement'>Vehicle Management</a>" .
            "</div>";
          echo $vehicleManagementDiv;

          $imageManangment =
            "<div id='imageManagementDiv' class='managementBtn'>" .
            // "<h1>Inventory Management</h1>" .
            // "<p>Use this link to mangage the inventory</p>" .
            "<a href='/phpmotors/routes/uploads-route.php'>Image Management</a>" .
            //"<a href='/phpmotors/routes/vehicles-route.php?action=vehicleManagement'>Vehicle Management</a>" .
            "</div>";
          echo $imageManangment;
        }
        ?>

      </div>
    </div>
    <footer>
      <?php require $_SERVER['DOCUMENT_ROOT'] . '/phpmotors/views/snippets/footer.php' ?>
    </footer>
  </main>
</body>

</html>