// let speed = 50;
var i=0;
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
  stop,
  textBox = document.querySelector('.textBox'),
  text = shopKeeperJson()[saysWhat]
  ) {

  if ((i < text.length) && (!stop)) {
    if (text.charAt(i) == "*") {
      document.querySelector(".textBox").innerHTML += "<br><br>";
    }
    else {
      document.querySelector(".textBox").innerHTML += text.charAt(i);
    }
    i++;
    setTimeout(shopKeeperSays.bind(null,saysWhat), speed);
    textBox.addEventListener('click', e=> {
      setTimeout(shopKeeperSays.bind(null,saysWhat,true), 0.05)
      // document.querySelector(".textBox").innerHTML = text;
    })
  }
  else shopKeeperSaysJson()["clear"];
}
export const globalMethods = {
  formElement: function(paramElement,paramId="",paramClass="",paramLink="",paramText="") {
    console.log(paramId);
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
    if (paramClass == "viewBtn"){
      element.addEventListener('click', (e) =>{
        buttonRouter.newView(e)
      })
    }
    if (paramClass == "changeBtn") {
      element.addEventListener('click',(e) =>{
        buttonRouter.changeSettings(e)
      })
    }
    console.log(element)
    return element;
  },
  clearBody: function(){
    document.querySelector('body').innerHTML = "";
  }
}
export const buttonRouter = {
  newView: function(e) {
    console.log(e.target.id);
    globalMethods.clearBody();
    // console.log(e.target.id)
    switch(e.target.id) {
      case 'todaysOffers':
        clearTimeout(shopKeeperSays)
        todaysOffersMethods.establishHTML_TO();
        startupMethods.getWallet();
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
        break;
    }
  },
  changeSettings: function(e) {
    console.log(e.target.id);
    let button = e.target
    let header = document.querySelector("h1");
    switch(button.id) {
      case 'itemBtn':
        if (button.innerHTML == "Inventory") {
          header.id = "inventory";
          header.innerHTML = "Your Inventory";
          button.innerHTML = "Display"
        }
        else if (button.innerHTML == "Display") {
          header.id = "displayCase";
          header.innerHTML = "Shop's Display";
          button.innerHTML = "Inventory"
        }
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











