<?php require $_SERVER['DOCUMENT_ROOT'] . '/phpmotors/views/snippets/adminAuth.php' ?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="/phpmotors/css/index.css" rel="stylesheet">
  <script src="/phpmotors/javascript/index.js" defer></script>
  <title>
    <?php if (isset($invInfo['invMake']) && isset($invInfo['invModel'])) {
      echo "Deletet $invInfo[invMake] $invInfo[invModel]";
    } elseif (isset($invMake) && isset($invModel)) {
      echo "Deletet $invMake $invModel";
    } ?> | PHP Motors
  </title>
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
              <legend>
                Deleting Vehicle
              </legend>
              <?php
              if (isset($message)) {
                echo $message;
              }
              ?>
              <h1>
                <?php if (isset($invInfo['invMake']) && isset($invInfo['invModel'])) {
                  echo "Delete: $invInfo[invMake] $invInfo[invModel]";
                } elseif (isset($invMake) && isset($invModel)) {
                  echo "Deleting: $invMake $invModel";
                } ?>
              </h1>
              <p>Note: all * fields are required</p>
              <!--Build the car classification option list-->
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
                } elseif (isset($invInfo['classificationId'])) {
                  if ($classification['classificationId'] === $invInfo['classificationId']) {
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
                                                              } elseif (isset($invInfo['invMake'])) {
                                                                echo "value='$invInfo[invMake]'";
                                                              }
                                                              ?> required readonly>
              <label for="invModel">Model</label>
              <input type="text" name="invModel" id="invModel" <?php if (isset($invModel)) {
                                                                  echo "value='$invModel'";
                                                                } elseif (isset($invInfo['invModel'])) {
                                                                  echo "value='$invInfo[invModel]'";
                                                                } ?> required readonly>
              <label for="invDescription">Description</label>
              <textarea name="invDescription" id="invDescription" required readonly><?php if (isset($invDescription)) {
                                                                                      echo $invDescription;
                                                                                    } elseif (isset($invInfo['invDescription'])) {
                                                                                      echo $invInfo['invDescription'];
                                                                                    } ?></textarea>
              <div class="buttonHolder">
                <button type="submit" formaction="/phpmotors/routes/vehicles-route.php?action=do_deleteVehicle" class="formBtn">Delete Vehicle</button>
                <input type="hidden" name="invId" value="
                                                                  <?php
                                                                  if (isset($invInfo['invId'])) {
                                                                    echo $invInfo['invId'];
                                                                  } elseif (isset($invId)) {
                                                                    echo $invId;
                                                                  } ?>">

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