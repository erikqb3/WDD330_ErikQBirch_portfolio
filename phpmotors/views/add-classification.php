<?php require $_SERVER['DOCUMENT_ROOT'] . '/phpmotors/views/snippets/adminAuth.php' ?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="/phpmotors/css/index.css" rel="stylesheet">
  <script src="/phpmotors/javascript/index.js" defer></script>
  <title>Add Classification</title>
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
        <div id="inputHolder">

          <?php
          if (isset($message)) {
            echo $message;
          }
          ?>

          <form action="/phpmotors/routes/vehicles-route.php" method="POST">
            <fieldset>
              <span>30 Character Limit</span>
              <label for="classificationName">Classification Name</label>
              <input type="text" name="classificationName" id="classificationName" maxlength="30" autofocus required>
              <div class="buttonHolder">
                <button type="submit" formaction="/phpmotors/routes/vehicles-route.php?action=do_insertClassification" class="formBtn">Add Vehicle</button>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
    <footer>
      <?php require $_SERVER['DOCUMENT_ROOT'] . '/phpmotors/views/snippets/footer.php' ?>
    </footer>
  </main>
</body>

</html>+-