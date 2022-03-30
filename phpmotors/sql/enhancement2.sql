-- Number 1
INSERT INTO clients (
    client_id,
    client_fname,
    client_lname,
    client_email,
    client_password,
    comment
  )
VALUES (
    1,
    'Tony',
    'Stark',
    'tony@starkent.com',
    'Iam1ronM@n',
    'I am the real Ironman'
  );
-- Number 2
UPDATE clients
SET client_level = 3
WHERE client_id = 1;
-- Number3
UPDATE inventory
SET invDescription = REPLACE(
    invDescription,
    "small interior",
    "spacious interior"
  )
WHERE invId = 12;
-- Number4
SELECT t1.invModel,
  t2.classificationName
FROM `inventory` t1
  JOIN `carclassification` t2 ON t2.classificationId = t1.classificationId
WHERE t2.classificationName = "SUV";
-- Number 5
DELETE FROM `inventory`
WHERE invId = 1;
-- Number 6
UPDATE `inventory`
SET invImage = CONCAT('/phpmotors', invImage);