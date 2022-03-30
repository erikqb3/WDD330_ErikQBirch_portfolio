<!DOCTYPE html>

<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- <link rel="stylesheet" href="/phpmotors/css/normalize.css"> -->
  <!-- <link rel="stylesheet" href="/phpmotors/css/medium.css"> -->
  <!-- <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Share+Tech+Mono&display=swap" rel="stylesheet"> -->
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
      <h1>Server Error</h1>
      <p>
        Sorry our server seems to be experiencing some technical difficulties. Please check back later.
      </p>


    </div>
    <!-- </div> -->
    <footer>
      <?php require $_SERVER['DOCUMENT_ROOT'] . '/phpmotors/views/snippets/footer.php' ?>
    </footer>
  </main>
</body>

</html>