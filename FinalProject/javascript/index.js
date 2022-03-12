main();

async function main() {
  const url = "https://botw-compendium.herokuapp.com/api/v2";
  let data = await fetch(url)
  .then(response => response.json())
  .then(startupFunctions) //temp
  return data;
}

function startupFunctions(jsonData) {
  getWallet();
  let isNewDay = checkNewDay();
  restockShelves(isNewDay,jsonData)
}

function getWallet() {
  //STEP1 check if wallet exists
  //STEP1a if not, create localStorage Item
  //STEP2 set innerHTML of wallet element to wallet value
  //STEP3 return wallet value for future use.

  //STEP1
  let wallet_value = localStorage.getItem("wallet");
  if (!wallet) {
    localStorage.setItem("wallet", 0) //STEP1a
  }
  else { //STEP2
    wallet_element = document.getElementById("wallet")
    wallet_element.innerHTML = wallet_value;
  }
  return wallet_value;//STEP3
}

// localStorage.removeItem('lastVisit')
function checkNewDay () {
  //STEP1: check if this was user's first appearence
  //STEP2: compare lastVisit to today and return results
  //STEP3: if new day, reset lastVisit

  //STEP1
  let isNewDay = false;
  let lastVisit = localStorage.getItem('lastVisit');
  if (!lastVisit) {
    localStorage.setItem('lastVisit',parseInt(new Date().getDate()));
  }
  else {};

  //STEP2
  let today = new Date();
  // console.log(parseInt(lastVisit))
  // console.log(today.getDate())
  if (parseInt(lastVisit) == today.getDate()) {
    // console.log("NO");
  }
  else {
    //STEP3
    isNewDay = true;
    localStorage.setItem('lastVisit',parseInt(new Date().getDate()));
    console.log("YES")
  }
  return isNewDay;
}

function restockShelves(isNewDay,jsonData) {
  /**
   * STEP1 check if new day (continue if new day)
   * STEP2 establish variables
   * STEP3 get shelf from localStorage if exist (create if it doesn't)
   * STEP4 change from string to array
   * STEP5 randomly choose which categories to pull from 
   * STEP6 remove repeats by comparing and combining and comparing some more
   * STEP7
   */


if (!isNewDay) { //STEP1 //temp -> (isNewDay)
  console.log(jsonData);
  //STEP2
  let shelfLimit = 24;
  let category = [0,0,1,2,2]; //creatures, equipment, materials
  let categoryA = category[Math.floor(Math.random()*category.length)];
  let categoryB = category[Math.floor(Math.random()*category.length)];
  let categoryC = category[Math.floor(Math.random()*category.length)];
  let products = [];

  //STEP3
  let shelf = localStorage.getItem('shelf');
  if (!shelf) {
    shelf = []
    localStorage.setItem('shelf',JSON.stringify(shelf));
  }
  else {shelf = JSON.parse(localStorage.getItem('shelf'))}; //STEP4
  
  //STEP5
  selectionsA = selectSellables(categoryA, jsonData);
  selectionsB = selectSellables(categoryB, jsonData);
  selectionsC = selectSellables(categoryC, jsonData);

  //STEP6
  let partA = removeRepeats(selectionsA,selectionsB);
  let partB = removeRepeats(selectionsB,selectionsA);
  products = compileProducts(products, partA);
  products = compileProducts(products, partB);
  let partC = removeRepeats(selectionsC, products);
  products = compileProducts(products, partC)

  console.log(products);

  products.forEach((element) => {
    console.log(element.name)
  })

}
}

function selectSellables(category,jsonData) {
  /**
   * STEP1 establish initial variables
   * STEP2 use switch to determin which category to choose from
   * STEP3 push random numbers into an array and loop through array to check for copies, replace dooplicates with "copy"
   * STEP4 add sellables to products array based on numbers from numbers array (if 'copy', skip)
   */

  //STEP1
  let sellables;
  let products = [];
  switch(category) { //STEP2
    case 0:
      sellables = jsonData.data.creatures.food;
      break;
    case 1:
      sellables = jsonData.data.equipment;
      break;
    case 2:
      sellables = jsonData.data.materials;
      break;
  }
  
  //STEP3
  let numbers = [];
  for (let i=0; i<=7; i++) {
    let numb = Math.floor(Math.random()*sellables.length);
    numbers.push(numb);
    if (i>0) {
      for (let ii=0; ii<(numbers.length - 1); ii++) {
        if (numbers[ii] == numb) {
          numbers[ii] = "copy";}}}}

  //STEP4
  for (let iii=0; iii<numbers.length; iii++){
    if (numbers[iii] != "copy") {
      products.push(sellables[numbers[iii]]);
    }
  }

  return (products);
}

function removeRepeats(arrayA,arrayB) {
  /**
   * STEP1 establish initial variables 
   * STEP2 loop through arrayA, reset clear count
   * STEP3 loop through arrayB
   * STEP3a if item in arrayA != arrayB, it clears
   * STEP4 if number of clear tokens = arrayB.length, add 
   */


  let keepers = [] //STEP1
  //STEP2
  for (let i=0; i<arrayA.length; i++) {
    let clear = arrayB.length;
    //STEP3
    for (let ii=0; ii<arrayB.length; ii++) {
      if (arrayA[i] == arrayB[ii]) { //STEP3
        clear--;
      }
    }
    if (clear == arrayB.length) {
      console.log(clear)
      keepers.push(arrayA[i]);
    }
  }
  // console.log(keepers)
  return(keepers);
}


function compileProducts(whole, part) {
  for (let i=0; i<part.length; i++) {
    whole.push(part[i]);
  }
  return whole;
}