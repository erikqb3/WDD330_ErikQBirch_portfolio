<?php require $_SERVER['DOCUMENT_ROOT'] . '/phpmotors/views/snippets/authentication.php' ?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="/phpmotors/css/index.css" rel="stylesheet">
  <script src="/phpmotors/javascript/index.js" defer></script>
  <title><?php echo $classificationName; ?> vehicles | PHP Motors, Inc.</title>
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
        <h1><?php echo $classificationName; ?> Vehicles</h1>
        <?php if (isset($message)) {
          echo $message;
        }
        if (isset($vehicleDisplay)) {
          echo $vehicleDisplay;
        } ?>
      </div>
    </div>
    <footer>
      <?php require $_SERVER['DOCUMENT_ROOT'] . '/phpmotors/views/snippets/footer.php' ?>
    </footer>
  </main>
</body>

</html>
<!-- To view page, have XAMPP running and in VSCode, click "Open in Browser" -->
<!-- TO create partials, look up videos in the modules on canvas -->