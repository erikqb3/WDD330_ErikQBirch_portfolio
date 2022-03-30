<!-- <?php //require $_SERVER['DOCUMENT_ROOT'] . '/phpmotors/views/snippets/authentication.php' 
      ?> -->
<?php
if (isset($_SESSION['message'])) {
  $message = $_SESSION['message'];
} ?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="/phpmotors/css/index.css" rel="stylesheet">
  <script src="/phpmotors/javascript/index.js" defer></script>
  <title>Image Managment</title>
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
          <h1>Image Management</h1>
          <p>Welcome! Please choose to do something!</p>
          <h2>Add New Vehicle Image</h2>
          <?php
          if (isset($message)) {
            echo $message;
          } ?>

          <form action="/phpmotors/routes/uploads-route.php/" method="post" enctype="multipart/form-data">
            <label for="invItem">Vehicle</label>
            <fieldset>
              <?php echo $prodSelect; ?>
              <p>Is this the main image for the vehicle?</p>
              <label for="priYes" class="pImage">Yes</label>
              <input type="radio" name="imgPrimary" id="priYes" class="pImage" value="1">
              <label for="priNo" class="pImage">No</label>
              <input type="radio" name="imgPrimary" id="priNo" class="pImage" checked value="0">

              <div class="buttonHolder">
                <label>Upload Image:</label>
                <input id="fileBTN" type="file" name="file1">
                <input id="submitBTN" type="submit" class="regbtn" value="Upload">
                <input type="hidden" name="action" value="upload">
            </fieldset>
          </form>
        </div>
        <div id="thumbnailGallery">
          <hr>
          <h2>Existing Images</h2>
          <p class="notice">If deleting an image, delete the thumbnail too and vice versa.</p>
          <?php
          if (isset($imageDisplay)) {
            echo $imageDisplay;
          } ?>
        </div>
      </div>
    </div>
    <footer>
      <?php require $_SERVER['DOCUMENT_ROOT'] . '/phpmotors/views/snippets/footer.php' ?>
    </footer>
  </main>
</body>

</html>
<?php unset($_SESSION['message']); ?>