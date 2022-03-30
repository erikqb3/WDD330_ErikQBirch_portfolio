<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="/phpmotors/views/CSE340presentation.js" defer></script>
  <link href="CSE340presentation.css" rel="stylesheet">
  <title>Document</title>
</head>

<body>
  <main>
    <h1>Who's That Pokemon?</h1>
    <div id="inputHolder">
      <input type="number" min="0" max="4" id="subArray" value="0">
      <label name="subArray">SubArray</label><br>
      <input type="number" min="0" max="5" id="subIndex" value="0">
      <label name=" subIndex">SubIndex</label>
    </div>
    <button id="submitBtn">It's...</button>
    <h2 id="answer"></h2>
  </main>
</body>

</html>




<?php
// Comment out all Echos, Dumps, Prints, etc. (Expect the for loops)
$myParty = ["Rotom", "Flygon", "Greninja", "Scizor", "Magcargo", "Breloom"];

$olist = '<ol>';
foreach ($myParty as $pokemon) {
  $olist .= "<li>$pokemon</li>";
};
$olist .= "</ol>";

echo $olist;

// echo ('$myParty[1]' . "<br>" . $myParty[1]);
// echo ("<br>" . "<br>");
// echo ('$myParty[0]' . "<br>" . $myParty[0]);
// echo ("<br>" . "<br>");


$subParty1 = $myParty;
// var_dump($subParty1);
// echo ("<br>" . "<br>");
$subParty2 = ["Manaphy", "Lopunny", "Vespiquen", "Empoleon", "Roserade", "Driblim"];
// print_r($subParty2);
// echo ("<br>" . "<br>");
$subParty3 = ["Mimikyu", "Gourgeist", "Golurk", "Mega Banette", "Chandelure", "Zoroark (Hisuian)"];
$subParty4 = ["Naganadel", "Toxtricity", "Toxapex", "Toxicroak", "Swalot", "Ariados"];
$subParty5 = ["Flapple", "Lilligant", "Serperior", "Exeggutor (Alolan)", "Leavanny", "Whimsicott"];


$Rotom = ['name' => "Rotom", "type1" => "electric", "type2" => "ghost", "size" => "small"];
$Flygon = ['name' => "Flygon", "type1" => "electric", "type2" => "ghost", "size" => "small"];
$Greninja = ['name' => "Greninja", "type1" => "electric", "type2" => "ghost", "size" => "small"];
$Scizor = ['name' => "Scizor", "type1" => "electric", "type2" => "ghost", "size" => "small"];
$Magcargo = ['name' => "Magcargo", "type1" => "electric", "type2" => "ghost", "size" => "small"];
$Breloom = ['name' => "Breloom", "type1" => "electric", "type2" => "ghost", "size" => "small"];
$Manaphy = ['name' => "Manaphy", "type1" => "electric", "type2" => "ghost", "size" => "small"];
$Rotom = ['name' => "Rotom", "type1" => "electric", "type2" => "ghost", "size" => "small"];
$Rotom = ['name' => "Rotom", "type1" => "electric", "type2" => "ghost", "size" => "small"];
$Rotom = ['name' => "Rotom", "type1" => "electric", "type2" => "ghost", "size" => "small"];
$Rotom = ['name' => "Rotom", "type1" => "electric", "type2" => "ghost", "size" => "small"];
$Rotom = ['name' => "Rotom", "type1" => "electric", "type2" => "ghost", "size" => "small"];
$Rotom = ['name' => "Rotom", "type1" => "electric", "type2" => "ghost", "size" => "small"];
$Rotom = ['name' => "Rotom", "type1" => "electric", "type2" => "ghost", "size" => "small"];
$Rotom = ['name' => "Rotom", "type1" => "electric", "type2" => "ghost", "size" => "small"];
$Rotom = ['name' => "Rotom", "type1" => "electric", "type2" => "ghost", "size" => "small"];
$Rotom = ['name' => "Rotom", "type1" => "electric", "type2" => "ghost", "size" => "small"];
$Rotom = ['name' => "Rotom", "type1" => "electric", "type2" => "ghost", "size" => "small"];
$Rotom = ['name' => "Rotom", "type1" => "electric", "type2" => "ghost", "size" => "small"];
$Rotom = ['name' => "Rotom", "type1" => "electric", "type2" => "ghost", "size" => "small"];
$Rotom = ['name' => "Rotom", "type1" => "electric", "type2" => "ghost", "size" => "small"];
$Rotom = ['name' => "Rotom", "type1" => "electric", "type2" => "ghost", "size" => "small"];
$Rotom = ['name' => "Rotom", "type1" => "electric", "type2" => "ghost", "size" => "small"];
$Rotom = ['name' => "Rotom", "type1" => "electric", "type2" => "ghost", "size" => "small"];
$Rotom = ['name' => "Rotom", "type1" => "electric", "type2" => "ghost", "size" => "small"];
$Rotom = ['name' => "Rotom", "type1" => "electric", "type2" => "ghost", "size" => "small"];
$Rotom = ['name' => "Rotom", "type1" => "electric", "type2" => "ghost", "size" => "small"];
$Rotom = ['name' => "Rotom", "type1" => "electric", "type2" => "ghost", "size" => "small"];
$Rotom = ['name' => "Rotom", "type1" => "electric", "type2" => "ghost", "size" => "small"];
$Rotom = ['name' => "Rotom", "type1" => "electric", "type2" => "ghost", "size" => "small"];
$Rotom = ['name' => "Rotom", "type1" => "electric", "type2" => "ghost", "size" => "small"];
$Rotom = ['name' => "Rotom", "type1" => "electric", "type2" => "ghost", "size" => "small"];





$myBox = [$subParty1, $subParty2, $subParty3, $subParty4, $subParty5];
// echo ('$myBox[0][0]' . "<br>" . $myBox[0][0]);
// echo ("<br>" . "<br>");
$myBox = [$subParty1, $subParty2, $subParty3, $subParty4, $subParty5];
// echo ('$myBox[4][0]' . "<br>" . $myBox[4][0]);
// echo ("<br>" . "<br>");
$myBox = [$subParty1, $subParty2, $subParty3, $subParty4, $subParty5];
// echo ('$myBox[0][4]' . "<br>" . $myBox[0][4]);
// echo ("<br>" . "<br>");

$index = 0;


foreach ($myBox as $party) {
  echo ("SubArray" . $index . ": ");
  foreach ($party as $pokemon) {
    echo ("<p>$pokemon</p>" . "| ");
  }
  $index++;
  echo ("<br>");
}

echo ("<img src='myBox.png' alt='myBox'>")

// $dochtml = new domDocument();
// $dochtml->loadHTML('CSE340presentation.php');

// $button = $dochtml->getElementById('submitBtn');

// echo $button;
?>