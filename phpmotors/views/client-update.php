<?php require $_SERVER['DOCUMENT_ROOT'] . '/phpmotors/views/snippets/authentication.php' ?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="/phpmotors/css/index.css" rel="stylesheet">
  <script src="/phpmotors/javascript/index.js" defer></script>
  <script src="../javascript/DOM_functions.js" defer></script>
  <title>Manage Account</title>
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
          // echo $clientEmail;
          ?>

          <form action="/phpmotors/routes/accounts-route.php" method="POST">
            <fieldset>
              <legend>Account Update</legend>
              <label for="fname">First Name</label>
              <input type="text" name="clientFirstname" id="fname" <?php if (isset($clientFirstName)) {
                                                                      echo "value='$clientFirstName'";
                                                                    } elseif (isset($clientInfo['clientFirstname'])) {
                                                                      echo "value='$clientInfo[clientFirstname]'";
                                                                    } ?> required>

              <label for="lname">Last Name</label>
              <input type="text" name="clientLastname" id="lname" <?php
                                                                  if (isset($clientLastName)) {
                                                                    echo "value='$clientLastName'";
                                                                  } elseif (isset($clientInfo['clientLastname'])) {
                                                                    echo "value='$clientInfo[clientLastname]'";
                                                                  }
                                                                  ?> required>
              <label for="email">Email</label>
              <input type="email" name="clientEmail" id="email" <?php if (isset($clientEmail)) {
                                                                  echo "value='$clientEmail'";
                                                                } elseif (isset($clientInfo['clientEmail'])) {
                                                                  echo "value='$clientInfo[clientEmail]'";
                                                                }  ?> required>
              <div class="buttonHolder">
                <button type="submit" formaction="/phpmotors/routes/accounts-route.php?action=do_clientUpdate" class="formBtn">Update Account Info</button>
                <input type="hidden" name="clientId" value="<?php
                                                            if (isset($client['clientId'])) {
                                                              echo $client['clientId'];
                                                            } elseif (isset($clientId)) {
                                                              echo $clientId;
                                                            } ?>">
              </div>
            </fieldset>
          </form>
          <form action="/phpmotors/routes/accounts-route.php" method="POST">
            <fieldset>
              <legend>Change Password</legend>
              <span>Passwords must be at least 8 characters and contain at least 1 number, 1 capital letter and 1 special character</span>
              <label for="clientPassword">Old Password:</label>
              <input type="password" name="clientPassword" id="clientPassword" class="pswd" pattern="(?=^.{8,}$)(?=.*\d)(?=.*\W+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" required>
              <label for="desiredPassword">Desired Password:</label>
              <input type="password" name="desiredPassword" id="desiredPassword" class="pswd" pattern="(?=^.{8,}$)(?=.*\d)(?=.*\W+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" required>
              <label for="confirmPassword">Confirm Password:</label>
              <input type="password" name="confirmPassword" id="confirmPassword" class="pswd" pattern="(?=^.{8,}$)(?=.*\d)(?=.*\W+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" required>
              <div class="buttonHolder">
                <span id="pswdBtn">Show Password</span>
                <button type="submit" formaction="/phpmotors/routes/accounts-route.php?action=do_passwordUpdate" class="formBtn">Change Password</button>
                <input type="hidden" name="clientId" value="<?php
                                                            if (isset($client['clientId'])) {
                                                              echo $client['clientId'];
                                                            } elseif (isset($clientId)) {
                                                              echo $clientId;
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