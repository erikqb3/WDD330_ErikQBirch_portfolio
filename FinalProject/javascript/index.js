// let speed = 50;
// var i=0;
import { shopKeeperJson } from "../javascript/shopKeeper.js";

import { startupMethods } from "../javascript/startupMethods.js";

import { homeViewMethods } from "../javascript/homeViewMethods.js";

import { todaysOffersMethods } from "../javascript/todaysOffersMethods.js";


async function main() {
  switch(window.location.href){
    case dummyViews.homeView:
      homeViewMethods.establishHTML_home();
      shopKeeperSays("greetings");
      startupMethods.getWallet();
      startupMethods.getHTripCount();
      const url = "https://botw-compendium.herokuapp.com/api/v2";
      let data = await fetch(url)
      .then(response => response.json())
      .then(startupFunctions) //temp
      return data;
      break;
    case dummyViews.todaysOffers:
      todaysOffersMethods.establishHTML_TO();
      break;
  }
  
}
function startupFunctions(jsonData) {
  startupMethods.getSetup(jsonData);
}

async function shopKeeperSays (
  saysWhat,
  speed = 50,
  // textBox = document.querySelector('.textBox'),
  // buttonArray = document.querySelectorAll('.viewBtn'),
  text = shopKeeperJson()[saysWhat]
  ) {
  let newText = ""
  // console.log(speed, "text.length")
  for (let i=0; i <= text.length; i++) {
    if (text.charAt(i) == "*") {
      newText += "<br><br>"
    }
    else {
      newText += text.charAt(i);
    }
    setTimeout(function(i){addLetter(newText)}, speed)
  }
}

function addLetter(newText) {
  document.querySelector(".textBox").innerHTML = newText;
}

export const globalMethods = {
  formElement: function(paramElement,paramId="",paramClass="",paramLink="",paramText="") {
    // console.log(paramId);
    let element = document.createElement(paramElement);
    element = document.createElement(paramElement);
    // paramId.setAttribute('id',paramId);
    element.id = paramId;
    element.setAttribute('class',paramClass);
    switch (paramElement) {
      case 'img':
        element.setAttribute('src',paramLink);
        element.setAttribute('alt',paramId);
        break;
      case 'a':
        element.setAttribut('href',paramLink);
        break;
      default:
        break;
    }
    if (paramText != "") {
      element.innerHTML = paramText;
    }
    switch (paramClass) {
      case "viewBtn":
        element.addEventListener('click', (e) =>{
          buttonRouter.newView(e);
        })
        break;
      case "changeBtn":
        element.addEventListener('click',(e) =>{
          buttonRouter.changeSettings(e);
        })
        break;
      case "arrow":
        element.addEventListener('click',(e) => {
          buttonRouter.changeSettings(e);
        })
        break;
      case "item_card":
        element.addEventListener('click',(e) => {
          console.log("ITEM")
          // this.formElement()
          buttonRouter.changeSettings(e);
        })
        break;
    }
    // if (paramClass == "viewBtn"){
    //   element.addEventListener('click', (e) =>{
    //     buttonRouter.newView(e)
    //   })
    // }
    // if (paramClass == "changeBtn") {
    //   element.addEventListener('click',(e) =>{
    //     buttonRouter.changeSettings(e)
    //   })
    // }
    


    
    // console.log(element)
    return element;
  },
  clearElement: function(elementStr){
    document.querySelector(elementStr).innerHTML = "";
  },
  randNumGen: function(
    maxLength = 1001,
    minLength = 0
  ){
    let RNG = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    return RNG;
  }
}
export const buttonRouter = {
  newView: function(e) {
    // console.log(e.target.id);
    globalMethods.clearElement("body");
    // console.log(e.target.id)
    switch(e.target.id) {
      case 'todaysOffers':
        clearTimeout(shopKeeperSays)
        todaysOffersMethods.establishHTML_TO();
        todaysOffersMethods.bringUpDisplay();
        startupMethods.getWallet();
        shopKeeperSays("shopDisplay");
        break;
      case 'sellGoods':
        window.location.assign(dummyViews.sellGoods)
        break;
      case 'huntingTrips':
        window.location.assign(dummyViews.huntingTrips)
        break;
      case 'home':
      case 'backBtn':
        homeViewMethods.establishHTML_home(); //THIS IS HOW IT SHOULD WORK
        startupMethods.getWallet();
        startupMethods.getHTripCount();
        shopKeeperSays("greetings");
        break;
    }
  },
  changeSettings: function(e) {
    // console.log(e.target.id);
    let button = e.target
    let header = document.querySelector("h1");
    let PNI = parseInt(localStorage.pagNavIndex);
    switch(button.id) {
      case 'itemBtn':
        if (button.innerHTML == "Inventory") {
          header.id = "inventory";
          header.innerHTML = "Your Inventory";
          button.innerHTML = "Display"
          globalMethods.clearElement('ul');  
        }
        else if (button.innerHTML == "Display") {
          header.id = "displayCase";
          header.innerHTML = "Shop's Display";
          button.innerHTML = "Inventory";
          globalMethods.clearElement('ul');
          todaysOffersMethods.bringUpDisplay();
        }
        break;
      case 'prevBtn':
        globalMethods.clearElement('ul');
        localStorage.setItem('pagNavIndex',(PNI-1).toString());
        todaysOffersMethods.bringUpDisplay();
        todaysOffersMethods.displayArrows();
        document.getElementById("pagNavIndex").innerHTML = (parseInt(localStorage.pagNavIndex)+1)
        break;
      case 'nextBtn':
        globalMethods.clearElement('ul');
        localStorage.setItem('pagNavIndex',(PNI+1).toString());
        todaysOffersMethods.bringUpDisplay();
        todaysOffersMethods.displayArrows();
        document.getElementById("pagNavIndex").innerHTML = (parseInt(localStorage.pagNavIndex)+1)
        break;
    }
  }
}
const dummyViews = {
  "homeView": "http://127.0.0.1:5503/FinalProject/views/index.html",
  "todaysOffers": "http://127.0.0.1:5503/FinalProject/views/todaysOffers_dmy.html",
  "sellGoods": "http://127.0.0.1:5503/FinalProject/views/sellGoods_dmy.html",
  "huntingTrips": "http://127.0.0.1:5503/FinalProject/views/huntingTrips_dmy.html"
}


main();


localStorage.setItem("Pokemon","Flygon")










