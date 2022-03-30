<?php

function searchInventory($input)
{
  $db = phpmotorsConnect($input); // Create a connection object from the phpmotors connection function 
  // $sql = "SELECT t1.*, t2.imgPath, t3.classificationName
  //         FROM inventory t1
  //         JOIN images t2
  //         ON t1.invId = t2.invId
  //         JOIN carclassification t3
  //         ON t3.classificationId = t1.classificationId
  //         WHERE t1.invModel LIKE :input;
  $sql = 'SELECT t1.* , t2.imgPath
          FROM inventory t1
          JOIN images t2
          ON t1.invId = t2.invId
          JOIN carclassification t3
          ON t3.classificationId = t1.classificationId 
          WHERE 
            ((t1.classificationId = (
              SELECT classificationId
              FROM carclassification
              WHERE classificationName = :input))
            OR(invMake LIKE "%":input"%")OR(invModel LIKE "%":input"%")OR(invYear LIKE "%":input"%")OR(invColor LIKE "%":input"%")OR(invDescription LIKE "%":input"%")OR(invPrice LIKE "%":input"%")OR(invMiles LIKE "%":input"%"))
          AND(t2.imgPath LIKE "%-tn.%")';
  // -- WHERE (t1.invYear = :input)OR(t1.invMake LIKE '%'+:input+'%')OR(t1.invModel LIKE '%'+:input+'%')OR(t1.invDescription LIKE '%'+:input+'%')OR(t1.invPrice = :input)OR(t1.invMiles = :input)OR(t1.invColor LIKE '%'+:input+'%')OR(t3.classificationName LIKE '%'+:input+'%')";
  $stmt = $db->prepare($sql);
  // try {
  //   $stmt->bindValue(':input', $input, PDO::PARAM_INT);
  // } catch (error) {
  //   $stmt->bindValue(':input', $input, PDO::PARAM_STR_CHAR);
  // }
  $stmt->bindValue(':input', $input, PDO::PARAM_STR);
  $stmt->execute();
  $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
  $stmt->closeCursor();
  return $results;
};
