<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="/phpmotors/css/index.css" rel="stylesheet">
  <script src="/phpmotors/javascript/index.js" defer></script>
  <title>Home (PHP Motors)</title>
</head>

<body>
  <main>
    <!-- <div id="contentWrap"> -->
    <header>
      <?php require $_SERVER['DOCUMENT_ROOT'] . '/phpmotors/views/snippets/header.php' ?>
    </header>
    <nav>
      <!-- <?php require $_SERVER['DOCUMENT_ROOT'] . '/phpmotors/views/snippets/nav.php' ?> -->
      <?php echo $navList; ?>
    </nav>
    <div id="mainContent">
      <?php
      if (isset($_SESSION['loggedIn'])) {
        echo "<h1>Welcome to PHP Motors!</h1>";
      } else if (isset($_SESSION['clientData']) && isset($_SESSION['clientFirstname'])) {
        $welcome = "<h1>Welcome, ";
        $welcome .= $_SESSION['clientData']['clientFirstname'];
        $welcome .= ", to PHP Motors!</h1>";
        echo $welcome;
      }

      ?>
      <div id="hero">
        <div id="comment">
          <h3>DMC Delorean</h3>
          <ul>
            <li>3 Cup Holders</li>
            <li>Superman Doors</li>
            <li>Fuzzy Dice!</li>
          </ul>
        </div>
        <button>Own Today</button>
        <img id="delorean" src="/phpmotors/images/vehicles/1982-dmc-delorean.jpg" alt="The Delorean">
      </div>

      <div id="contentHolder">
        <section id="reviews">
          <h2 class="contentHolder_heading">DMC Delorean Reviews</h2>
          <ul>
            <li>"So fast its almost like traveling in time!" [4/5]</li>
            <li>"Coolest ride on the road!" [4/5]</li>
            <li>"I'm feeling Marty McFly!" [5/5]</li>
            <li>"The most futuristic ride of our day! [4.5/5]</li>
            <li>"80's living and I love it!" [5/5]</li>
          </ul>
        </section>
        <section id="upgrades" class="grid">
          <h2 class="contentHolder_heading">Delorean Upgrades</h2>
          <ul>
            <li>
              <a>
                <div class="upgradeHolder">
                  <img src="/phpmotors/images/upgrades/flux-cap.png" alt="Flux Capacitor">
                </div>
                <p>Flux Capacitor</p>
              </a>
            </li>
            <li>
              <a>
                <div class=" upgradeHolder">
                  <img src="/phpmotors/images/upgrades/flame.jpg" alt="Flame Decals">
                </div>
                <p>Flame Decals</p>
              </a>
            </li>
            <li>
              <a>
                <div class="upgradeHolder">
                  <img src="/phpmotors/images/upgrades/bumper_sticker.jpg" alt="Bumper Stickers">
                </div>
                <p>Bumper Stickers</p>
              </a>
            </li>
            <li>
              <a>
                <div class="upgradeHolder">
                  <img src="/phpmotors/images/upgrades/hub-cap.jpg" alt="Hub Caps">
                </div>
                <p>Hub Caps</p>
              </a>
            </li>
          </ul>
        </section>
      </div>
    </div>
    <!-- </div> -->
    <footer>
      <?php require $_SERVER['DOCUMENT_ROOT'] . '/phpmotors/views/snippets/footer.php' ?>
    </footer>
  </main>
</body>

</html>