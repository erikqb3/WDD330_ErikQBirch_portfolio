<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="/phpmotors/css/index.css" rel="stylesheet">
  <script src="/phpmotors/javascript/index.js" defer></script>
  <script src="../javascript/DOM_functions.js" defer></script>
  <title>Register</title>
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

          <form action="/phpmotors/routes/accounts-route.php" method="POST">
            <fieldset>
              <legend>Register</legend>
              <label for="fname">First Name</label>
              <input type="text" name="clientFirstname" id="clientFirstname" <?php if (isset($clientFirstname)) {
                                                                                echo "value='$clientFirstname'";
                                                                              } ?> required> <label for="lname">Last Name</label>
              <input type="text" name="clientLastname" id="lname" <?php if (isset($clientLastname)) {
                                                                    echo "value='$clientLastname'";
                                                                  }  ?>required>
              <label for="email">Email</label>
              <input type="email" name="clientEmail" id="email" <?php if (isset($clientEmail)) {
                                                                  echo "value='$clientEmail'";
                                                                }  ?>required>
              <label for="clientPassword">Password:</label>
              <span>Passwords must be at least 8 characters and contain at least 1 number, 1 capital letter and 1 special character</span>
              <input type="password" name="clientPassword" id="clientPassword" class="pswd" pattern="(?=^.{8,}$)(?=.*\d)(?=.*\W+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" required>
              <div class="buttonHolder">
                <span id="pswdBtn">Show Password</span>
                <button type="submit" formaction="/phpmotors/routes/accounts-route.php?action=do_register" class="formBtn">Register</button>
                <!-- <input type="submit" name="submit" id="submitBtn" class="actionBtn" value=" Register">
                <input type="hidden" name="action" value="go_register"> -->
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