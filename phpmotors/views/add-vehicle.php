<?php require $_SERVER['DOCUMENT_ROOT'] . '/phpmotors/views/snippets/adminAuth.php' ?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="/phpmotors/css/index.css" rel="stylesheet">
  <script src="/phpmotors/javascript/index.js" defer></script>
  <title>Add Vehicle</title>
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
          <form action="/phpmotors/routes/vehicles-route.php" method="POST">
            <fieldset>
              <legend>Add Vehicle</legend>
              <?php
              if (isset($message)) {
                echo $message;
              }
              ?>
              <p>Note: all * fields are required</p>
              <?php
              $classifications = getClassifications();
              $dropdown = "<select id='classificationId' name=classificationId>";
              $dropdown .= "<option value=''>Choose a Class</option>";
              foreach ($classifications as $classification) {
                $dropdown .= "<option value='$classification[classificationId]'";
                if (isset($classificationId)) {
                  if (intval($classification['classificationId']) === intval($classificationId)) {
                    $dropdown .= ' selected ';
                  }
                }
                $dropdown .= ">$classification[classificationName]</option>";
              }
              $dropdown .= '</select>';
              echo $dropdown;
              ?>
              <label for="invMake">Make</label>
              <input type="text" name="invMake" id="invMake" <?php if (isset($invMake)) {
                                                                echo "value='$invMake'";
                                                              } ?> required>
              <label for="invModel">Model</label>
              <input type="text" name="invModel" id="invModel" <?php if (isset($invModel)) {
                                                                  echo "value='$invModel'";
                                                                } ?> required>
              <label for="invDescription">Description</label>
              <textarea name="invDescription" id="invDescription" required><?php if (isset($invDescription)) {
                                                                              echo "$invDescription";
                                                                            } ?></textarea>
              <label for="invImage">Image</label>
              <input id="fileBTN" type="file" name="file1">
              <!-- <input type="text" name="invImage" id="invImage" <?php if (isset($invImage)) {
                                                                      echo "value='$invImage'";
                                                                    } ?> required>
              <label for="invThumbnail">Thumbnail Path</label>
              <input type="text" name="invThumbnail" id="invThumbnail" <?php if (isset($invThumbnail)) {
                                                                          echo "value='$invThumbnail'";
                                                                        } ?>> -->
              <label for="invPrice">Price</label>
              <input type="text" name="invPrice" id="invPrice" <?php if (isset($invPrice)) {
                                                                  echo "value='$invPrice'";
                                                                } ?> required>
              <label for="invMiles">Miles</label>
              <input type="text" name="invMiles" id="invMiles" <?php if (isset($invMiles)) {
                                                                  echo "value='$invMiles'";
                                                                } ?> required>
              <label for="invColor">Color</label>
              <input type="text" name="invColor" id="invColor" <?php if (isset($invColor)) {
                                                                  echo "value='$invColor'";
                                                                } ?> required>
              <div class="buttonHolder">
                <button type="submit" formaction="/phpmotors/routes/vehicles-route.php?action=do_insertVehicle" class="formBtn">Add Vehicle</button>
                <!-- <input type="submit" name="submit" id="submitBtn" value="insertVehicle">
                <input type="hidden" name="action" value="insertVehicle"> -->
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

</html>