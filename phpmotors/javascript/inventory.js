'use strict' // tells the JavaScript parse to follow all rules strictly

getVehiclesByClassificationId();
 
function getVehiclesByClassificationId () {
  // Get a list of vehicles in inventory based on the classificationId 
  /* Documentation
    Step1: Finds the classification select element in the vehicle management page based on its ID and stores its reference into a local JavaScript variable.
    Step2: Attaches the eventListener to the variable representing the classification select element and listens for any "change". When a change occurs an anonymous function is executed.
    Step3: Captures the new value from the classification select element and stores it into a JavaScript variable.
    Step4: Writes the value as part of a string to the console log for testing purposes. Note that the text is surrounded by "ticks", not single quotes. The "tick" key is to the left of the 1 on your keyboard. Text that is surrounded by ticks is known as a JavaScript template literal. A JavaScript template literal is equivalent to using double-quotes in PHP, it allows the value of a variable to be rendered within a string without the use of concatenation.
    Step5: The URL that will be used to request inventory data from the vehicles controller. Notice the two parameter name-value pairs at the end.
    Step6: The JavaScript "Fetch" which is a modern method of initiating an AJAX request.
    Step7: A "then" method that waits for data to be returned from the fetch. The response object is passed into an anonymous function for processing.
    Step8: An "if" test to see if the response was retuned successfully. If not, the error on Step11 occurs.
    Step9: If the response was successful, then the JSON object that was returned is converted to a JavaScript object and passed on to the next "then" statement on Step11.
    Step10: The error that occurs if it if test (Step8) fails.
    Step11: Accepts the JavaScript object from Step9, and passes it as a parameter into an anonymous function.
    Step12: Sends the JavaScript object to the console log for testing purposes.
    Step13: Sends the JavaScript object to a new function that will parse the data into HTML table elements and inject them into the vehicle management view.
    Step14: A "catch" which captures any errors and sends them into an anonymous function.
    Step15: Writes the caught error to the console log for us to see for troubleshooting.
  */
  let classificationList = document.querySelector("#classificationList"); //Step1
  classificationList.addEventListener("change", function () {  //Step2
   let classificationId = parseInt(classificationList.value); //Step3
   console.log(classificationId);
   console.log(`classificationId is: ${classificationId}`); //Step4
   let classIdURL = "/phpmotors/routes/vehicles-route.php?action=getInventoryItems&classificationId=" + classificationId; //Step5
   console.log(classIdURL);
   fetch(classIdURL) //Step6
   .then(function (response) { //Step7
    // console.log(response)
    if (response.ok) { //Step8
     return response.json(); //Ste9
    } 
    throw Error("Network response was not OK"); //Step10
   }) 
   .then(function (data) { //Step11
    console.log(data); //Step12
    buildInventoryList(data); //Step13
   }) 
   .catch(function (error) {  //Step14
    console.log('There was a problem: ', error.message) //Step15
   }) 
  })
}

function buildInventoryList(data) { 
  // Build inventory items into HTML table components and inject into DOM, the JavaScript object is a required parmater 
  console.log(data);
  /* Documentation
    Step1: Reaches into the HTML document, uses the ID to capture the element and assigns it to a JavaScript variable for use later.
    Step2: Creates a JavaScript variable and stores the beginning HTML element into it as a string.
    Step3: Creates the table row and three table cells as a string and appends it to the variable created on line 5.
    Step4: Adds the closing thead element to the variable using the append operator.
    Step5: Appends the opening tbody tag to the string stored in the variable.
    Step6: Implements the foreach method on the data object. Each element in the object is sent into an anonymous function as a parameter.
    Step7: Sends the name and id of each element to the console log for testing purposes.
    Step8: Creates a table cell with the vehicle name and appends it to the variable.
    Step9: Creates a table cell with a link to begin the update process for this item (note the inclusion of the action and invId name-value pairs in the URL) and appends it to the variable.
    Step10: Creates a table cell with a link to begin the delete process for this item (note the inclusion of the action and id name-value pairs in the URL) and appends it to the variable.
    Step11: Appends the closing tbody element to the variable.
    Step12: Injects the finished table components into the vehicle management view DOM element that was identified on line 3.
  */
  let inventoryDisplay = document.getElementById("inventoryDisplay"); //Step1
  // Set up the table labels 
  let dataTable = '<thead>'; //Step2
  dataTable += '<tr><th>Vehicle Name</th><td>&nbsp;</td><td>&nbsp;</td></tr>'; //Step3
  dataTable += '</thead>'; //Step4
  // Set up the table body 
  dataTable += '<tbody>'; //Step5
  // Iterate over all vehicles in the array and put each in a row 
  data.forEach(function (element) { //Step6
   console.log(element.invId + ", " + element.invModel); //Step7
   dataTable += `<tr><td>${element.invMake} ${element.invModel}</td>`; //Step8
   dataTable += `<td><a href='/phpmotors/routes/vehicles-route.php/?action=mod&invId=${element.invId}' title='Click to modify'>Modify</a></td>`; //Step9
   dataTable += `<td><a href='/phpmotors/routes/vehicles-route.php/?action=del&invId=${element.invId}' title='Click to delete'>Delete</a></td></tr>`; //Step10
  }) 
  dataTable += '</tbody>'; //Step11
  // Display the contents in the Vehicle Management view 
  inventoryDisplay.innerHTML = dataTable; //Step12
 }