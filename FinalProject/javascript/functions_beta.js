

async function main() {
  const url = "https://botw-compendium.herokuapp.com/api/v2";
  let data = await fetch(url)
  .then(response => response.json())
  .then(startupMethods.getSetup()) //temp
  return data;
}

// function startupFunctions(jsonData) {
//   // getWallet();
//   startupMethods.getWallet();
//   let isNewDay = startupMethods.checkNewDay();
//   startupMethods.restockShelves(isNewDay,jsonData)
// }



const startupMethods = {
  getSetup: function(jsonData) {
    console.log(jsonData);
    this.getWallet();
    let isNewDay = this.checkNewDay();
    this.restockShelves(isNewDay,jsonData)
  },
  getWallet: function(wallet_value = localStorage.wallet) {
    //STEP1 check if wallet exists if not, create localStorage Item
    //STEP2 set innerHTML of wallet element to wallet value
    //STEP3 return wallet value for future use.
  
  
    if (!wallet) { //STEP1
      localStorage.setItem("wallet", 0)
    }
    else { //STEP2
      wallet_element = document.getElementById("wallet")
      wallet_element.innerHTML = wallet_value;
    }
    return wallet_value;//STEP3
  },
  checkNewDay: function(isNewDay=false, 
    lastVisit=localStorage.lastVisit) {
    //STEP1: check if this was user's first appearence
    //STEP2: compare lastVisit to today and return results
    //STEP3: if new day, reset lastVisit
  
    //STEP1
    if (!lastVisit) {
      localStorage.setItem('lastVisit',parseInt(new Date().getDate()));
    }
    else {};
  
    //STEP2
    let today = new Date();
    if (parseInt(lastVisit) == today.getDate()) {
      console.log("NO");
    }
    else {
      //STEP3
      isNewDay = true;
      localStorage.setItem('lastVisit',parseInt(new Date().getDate()));
      console.log("YES")
    }
    return isNewDay;
  },
  restockShelves: function(
      isNewDay,
  jsonData,
  shelfLimit = 24,
  category = [0,0,1,2,2], //creatures, equipment, material,
  categoryA = category[Math.floor(Math.random()*category.length)],
  categoryB = category[Math.floor(Math.random()*category.length)],
  categoryC = category[Math.floor(Math.random()*category.length)],
  shelf = localStorage.shelf,
  products = []
  ) {
    /**
     * STEP1 check if new day (continue if new day)
     * STEP2 get shelf from localStorage if exist (create if it doesn't)
     * STEP3 change from string to array
     * STEP4 randomly choose which categories to pull from 
     * STEP5 remove repeats by comparing and combining and comparing some more
     * STEP6 Once products array is full, reassign value of localStorage.shelf.
     */
  
  
  if (!isNewDay) { //STEP1 //temp -> (isNewDay)
    console.log(jsonData);
  
    //STEP2
    if (!shelf) {
      shelf = []
      localStorage.setItem('shelf',JSON.stringify(shelf));
    }
    else {shelf = JSON.parse(localStorage.shelf)}; //STEP3
    
    //STEP4
    selectionsA = this.selectSellables(categoryA, jsonData);
    selectionsB = this.selectSellables(categoryB, jsonData);
    selectionsC = this.selectSellables(categoryC, jsonData);
  
    //STEP5
    let partA = this.removeRepeats(selectionsA,selectionsB);
    let partB = this.removeRepeats(selectionsB,selectionsA);
    products = this.compileProducts(products, partA);
    products = this.compileProducts(products, partB);
    let partC = this.removeRepeats(selectionsC, products);
    products = this.compileProducts(products, partC)
  
    //STEP6
    localStorage.setItem('shelf',JSON.stringify(products));
    console.log(JSON.parse(localStorage.shelf), "SHELF");  //works
  }
  },
  selectSellables: function(category,jsonData, sellables=[], products=[]) {
    /**
     * STEP1 use switch to determine which category to choose from
     * STEP2 push random numbers into an array and loop through array to check for copies, replace dooplicates with "copy"
     * STEP4 add sellables to products array based on numbers from numbers array (if 'copy', skip)
     */
  
    //STEP1
    switch(category) {
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
    
    //STEP2
    let numbers = [];
    for (let i=0; i<=7; i++) {
      let numb = Math.floor(Math.random()*sellables.length);
      numbers.push(numb);
      if (i>0) {
        for (let ii=0; ii<(numbers.length - 1); ii++) {
          if (numbers[ii] == numb) {
            numbers[ii] = "copy";}}}}
  
    //STEP3
    for (let iii=0; iii<numbers.length; iii++){
      if (numbers[iii] != "copy") {
        products.push(sellables[numbers[iii]]);
      }
    }
  
    return (products);
  },
  removeRepeats: function(arrayA,arrayB, keepers=[]) {
    /**
     * STEP1 loop through arrayA, reset clear count
     * STEP2 loop through arrayB
     * STEP3a if item in arrayA != arrayB, it clears
     * STEP4 if number of clear tokens = arrayB.length, add 
     */
  
    //STEP1
    for (let i=0; i<arrayA.length; i++) {
      let clear = arrayB.length;
      //STEP2
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
  },
  compileProducts: function(whole, part) {
    //loop through part array and push to whole array
    for (let i=0; i<part.length; i++) {
      whole.push(part[i]);
    }
    return whole;
  }
}







const todaysOffers_methods = {

}

const sellStuff_methods = {

}



main();