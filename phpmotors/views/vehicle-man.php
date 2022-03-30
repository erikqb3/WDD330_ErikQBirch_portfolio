<?php require $_SERVER['DOCUMENT_ROOT'] . '/phpmotors/views/snippets/adminAuth.php' ?>
<!DOCTYPE html>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="/phpmotors/css/index.css" rel="stylesheet">
  <script src="/phpmotors/javascript/index.js" defer></script>
  <script src="../javascript/inventory.js" defer></script>
  <title>Vehiclce Managment</title>
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
        <h2>Vehicle Managment</h2>
        <ul>
          <li><a href="/phpmotors/routes/vehicles-route.php?action=go_add-classification">Add Classification</a></li>
          <li><a href="/phpmotors/routes/vehicles-route.php?action=go_add-vehicle">Add Vehicle</a></li>
        </ul>
      </div>

      <?php
      if (isset($message)) {
        echo $message;
      }
      if (isset($classificationList)) {
        echo '<h2>Vehicles By Classification</h2>';
        echo '<p>Choose a classification to see those vehicles</p>';
        echo $classificationList;
      }
      ?>
      <noscript>
        <p><strong>JavaScript Must Be Enabled to Use this Page.</strong></p>
      </noscript>
      <table id="inventoryDisplay"></table>
    </div>
    <footer>
      <?php require $_SERVER['DOCUMENT_ROOT'] . '/phpmotors/views/snippets/footer.php' ?>
    </footer>
  </main>
</body>

</html>
<?php
unset($_SESSION['message']);
?>