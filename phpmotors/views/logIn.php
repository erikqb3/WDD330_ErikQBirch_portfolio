<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="/phpmotors/css/index.css" rel="stylesheet">
  <script src="/phpmotors/javascript/index.js" defer></script>
  <script src="../javascript/DOM_functions.js" defer></script>
  <title>Login</title>
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
          if (isset($_SESSION['message'])) {
            echo $_SESSION['message'];
          }
          ?>

          <form action="/phpmotors/routes/accounts-route.php" method="POST">
            <fieldset>
              <legend>Login</legend>
              <label for="email">Email:</label>
              <input type="email" name="clientEmail" id="email" <?php if (isset($clientEmail)) {
                                                                  echo "value='$clientEmail'";
                                                                }  ?> reqired>
              <label for="clientPassword">Password:</label>
              <span>Passwords must be at least 8 characters and contain at least 1 number, 1 capital letter and 1 special character</span>
              <input type="password" name="clientPassword" id="clientPassword" class="pswd" reqired>
              <!-- <div class="buttonHolder">
                <a href="/phpmotors/routes/accounts-route.php?action=go_logIn">Login</a>
                <a href="*">Forgot Login Info</a>
                <a href="/phpmotors/routes/accounts-route.php?action=signup">Register</a>
              </div> -->
              <div class="buttonHolder">
                <span id="pswdBtn">Show Password</span>
                <button type="submit" formaction="/phpmotors/routes/accounts-route.php?action=do_logIn" class="formBtn">Login</button>
                <button type="submit" formaction="/phpmotors/routes/accounts-route.php?action=go_home" class="formBtn">Forgot Login Info</button>
                <button type="submit" formaction="/phpmotors/routes/accounts-route.php?action=go_register" class="formBtn">Register</button>
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