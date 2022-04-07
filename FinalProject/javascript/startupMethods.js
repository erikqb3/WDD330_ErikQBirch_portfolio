import { globalMethods } from "./index.js";

import { todaysOffersMethods } from "../javascript/todaysOffersMethods.js";

export const startupMethods = {
  getSetup: function(jsonData) {
    // console.log(jsonData);
    // this.getWallet();
    this.getInventory();
    let isNewDay = this.checkNewDay();
    this.restockShelves(isNewDay,jsonData)
  },

  getWallet: function(wallet_value = localStorage.wallet) {
    //STEP1 check if wallet exists if not, create localStorage Item
    //STEP2 set innerHTML of wallet element to wallet value
    //STEP3 return wallet value for future use.
   
    if (!wallet_value) { //STEP1
      localStorage.setItem("wallet", 0)
    }
    else { //STEP2
      // let wallet_element = document.getElementById("wallet")
      // wallet_element.innerHTML = wallet_value;
    }
    return wallet_value;//STEP3
  },
  getInventory: function(inventory_value = localStorage.inventory) {
    //STEP1 check if inventory exists if not, create localStorage Item
    //STEP2 set innerHTML of inventory element to inventory value
    //STEP3 return inventory value for future use.

    if (!inventory_value) { //STEP1
      localStorage.setItem("inventory", [])
    }
    else { //STEP2
      // let inventory_element = document.getElementById("inventory")
      // inventory_element.innerHTML = inventory_value;
    }
    return inventory_value;//STEP3
  },
  checkNewDay: function(isNewDay = false, 
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
      // console.log("NO");
    }
    else {
      //STEP3
      isNewDay = true;
      localStorage.setItem('lastVisit',parseInt(new Date().getDate()));
      console.log("YES")
    }
    return isNewDay;
  },
  getHTripCount: function(HTrip_value = localStorage.HTripCount) {
    //STEP1 check if HTrip exists if not, create localStorage Item
    //STEP2 set innerHTML of HTrip element to HTrip value
    //STEP3 return HTrip value for future use.
    
    if (!HTrip_value) { //STEP1
      localStorage.setItem("HTripCount", 3)
    }
    else { //STEP2
      let HTrip_element = document.getElementById("HTripCount")
      HTrip_element.innerHTML = HTrip_value;
    }
    return HTrip_value;//STEP3
  },
  restockShelves: function( //main function that provides array of shelf items
      isNewDay,
      jsonData,
      shelfLimit = 24,
      category = [0,0,1,2,2], 
      categoryA = category[globalMethods.randNumGen(category.length)],
      categoryB = category[globalMethods.randNumGen(category.length)],
      categoryC = category[globalMethods.randNumGen(category.length)],
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
    // console.log(jsonData);
  
    //STEP2
    if (!shelf) {
      shelf = []
      localStorage.setItem('shelf',JSON.stringify(shelf));
    }
    else {shelf = JSON.parse(localStorage.shelf)}; //STEP3
    
    //STEP4
    let selectionsA = this.selectSellables(categoryA, jsonData);
    let selectionsB = this.selectSellables(categoryB, jsonData);
    let selectionsC = this.selectSellables(categoryC, jsonData);
  
    //STEP5
    let partA = this.removeRepeats(selectionsA,selectionsB);
    let partB = this.removeRepeats(selectionsB,selectionsA);
    products = this.compileProducts(products, partA);
    products = this.compileProducts(products, partB);
    let partC = this.removeRepeats(selectionsC, products);
    products = this.compileProducts(products, partC)

    // console.log(products)
  
    //STEP6

    // console.log(products)
    this.pricing.addPrices(products);

    let shelfItems_pagNavArray = todaysOffersMethods.setUpPagNav(products);

    let shelfItems_string = JSON.stringify(shelfItems_pagNavArray);
    localStorage.setItem('shelf',shelfItems_string);

    let currentShelf = 0;
    localStorage.setItem('pagNavIndex',currentShelf);
    
    let shelfItems_array = JSON.parse(localStorage.shelf)
    // console.log(localStorage.shelf)
    // console.log(shelfItems_array)
    // let shelfItems_pagNaved = this.setUpPagNav(shelfItems_array);

    // console.log(shelfItems_pagNaved)
    // shelfItems_string = JSON.stringify(shelfPagNav);
    // shelfItems_array = JSON.parse(localStorage.shelf)

    // //STEP6
    // localStorage.setItem('shelf',shelfItems_string);
    // console.log(shelfPagNav)
    // console.log(shelfItems_array, "SHELF");  //works
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
    for (let i=0; i<=9; i++) {
      let numb = globalMethods.randNumGen(sellables.length)
      // let numb = Math.floor(Math.random()*sellables.length);
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
        // console.log(clear)
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
  },
  // setUpPagNav: function(shelfItems) {
  //   let counter = 0;
  //   let shelf = [];
  //   let shelfPagNav = [];
  //   for (let x in shelfItems) {
  //     shelf.push(shelfItems[x]);
  //     counter++;
  //     // console.log(shelfItems[x]);
  //     if (shelf.length%5==0) {
  //       shelfPagNav.push(shelf);
  //       shelf = [];
  //     }
  //     else if (counter == shelfItems.length) {
  //       shelfPagNav.push(shelf);
  //       shelf = [];
  //     }
  //   }
  //   return shelfPagNav;
  // },
  pricing: {
    addPrices: function(shelfItems){
      for(let x in shelfItems) {
        // console.log(shelfItems[x])
        if (shelfItems[x] == undefined) {
        }
        else {
          let category = shelfItems[x].category;
          switch (category) {
            case "creatures":
            case "materials":
              this.addHeartsVariable(shelfItems[x], shelfItems[x].hearts_recovered)
              break;
            case "equipment":
              if (shelfItems[x].attack > shelfItems[x].defense) {
                this.addAtkDefVariable(shelfItems[x], shelfItems[x].attack)
              }
              else if (shelfItems[x].attack < shelfItems[x].defense) {
                this.addAtkDefVariable(shelfItems[x],shelfItems[x].defense)
              }
              else {
                this.addAtkDefVariable(shelfItems[x])
              }
              break;
            case "materials":
            default:
          }
        }
      }
    },
    addHeartsVariable(item, value){ //somehow, the pricing doesn't work out
      if ((value > 0)  && ( value <= 1)){
        item.price=globalMethods.randNumGen(75,35);
      }
      else if ((value > 1)  && ( value <= 3)){
        item.price=globalMethods.randNumGen(150,75);
      }
      else if (value > 3) {
        item.price=globalMethods.randNumGen(250,175);
      }
      else {
        item.price=globalMethods.randNumGen(35,0);
      }
      // console.log(item)
    },
    addAtkDefVariable(item, value = 15){
      if ((value > 0) && (value <= 10)) {
        item.price=globalMethods.randNumGen(50,0);
      }
      else if ((value > 10) && (value <= 20)) {
        item.price=globalMethods.randNumGen(150,75);
      }
      else if ((value > 20) && (value <= 30)) {
        item.price=globalMethods.randNumGen(400,175);
      }
      else if (value > 30) {
        item.price=globalMethods.randNumGen(900,450);
      }
    }
  },
  

  neoPricing: {
    addPrice: function(shelfItem){
      if (shelfItem == undefined) {
        return;
      }
      else {
        let category = shelfItem.category;
        switch (category) {
          case "creatures":
          case "materials":
            this.addHeartsVariable(shelfItem, shelfItems.hearts_recovered)
            break;
          case "equipment": 
            if (shelfItem.attack > shelfItem.defense) {
              this.addAtkDefVariable(shelfItem, shelfItem.attack)
              console.log("PriceAdded_equipment")
            }
            else (
              this.addAtkDefVariable(shelfItem,shelfItem.defense)
            )
            break;
        }
      }
    },


    addPrices: function(shelfItems){
      console.log(shelfItems);
      for(let x in shelfItems) {
        console.log(x);
        // shelfItems[x].price=0;
        // console.log(shelfItems[x].category)
        console.log(shelfItems[x])
        if (shelfItems[x] == undefined) {
          ;
        }
        else {
          let category = shelfItems[x].category;
          console.log(category)
          switch (category) {
            case "creatures":
              this.addHeartsVariable(shelfItems[x], shelfItems[x].hearts_recovered)
              console.log("PriceAdded_creature")
              break;
            case "equipment":
              if (shelfItems[x].attack > shelfItems[x].defense) {
                this.addAtkDefVariable(shelfItems[x], shelfItems[x].attack)
                console.log("PriceAdded_equipment")
              }
              else (
                this.addAtkDefVariable(shelfItems[x],shelfItems[x].defense)
              )
              break;
            case "materials":
              this.addHeartsVariable(shelfItems[x], shelfItems[x].hearts_recovered)
              console.log("PriceAdded_materials")
              break;
            default:
          }
          ;
        }
      }
    },
    addHeartsVariable(item, value){ //somehow, the pricing doesn't work out
      if ((value > 0)  && ( value <= 1)){
        item.price=globalMethods.randNumGen(75,35);
      }
      else if ((value > 1)  && ( value <= 3)){
        item.price=globalMethods.randNumGen(150,75);
      }
      else if (value > 3) {
        item.price=globalMethods.randNumGen(250,175);
      }
      else {
        item.price=globalMethods.randNumGen(35,0);
      }
      // console.log(item)
    },
    addAtkDefVariable(item, value){
      if ((value > 0) && (value <= 10)) {
        item.price=globalMethods.randNumGen(50,0);
      }
      else if ((value > 10) && (value <= 20)) {
        item.price=globalMethods.randNumGen(150,75);
      }
      else if ((value > 20) && (value <= 30)) {
        item.price=globalMethods.randNumGen(400,175);
      }
      else if (value > 30) {
        item.price=globalMethods.randNumGen(900,450);
      }
    }
  }
}

