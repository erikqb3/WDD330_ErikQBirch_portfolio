import { shopKeeperJson } from "../javascript/shopKeeper.js";

import { startupMethods } from "../javascript/startupMethods.js";

import { homeViewMethods } from "../javascript/homeViewMethods.js";

import { todaysOffersMethods } from "../javascript/todaysOffersMethods.js";

import { sellGoodsMethods } from "../javascript/sellGoodsMethods.js";


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
  console.log(jsonData)
  startupMethods.getSetup(jsonData);
}

export async function shopKeeperSays (
  saysWhat,
  speed = 50,
  text = shopKeeperJson()[saysWhat]
  ) {
  let newText = ""

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
  createElement: function(paramElement,paramId="",paramClass="",paramLink="",paramText="") {
    let element = document.createElement(paramElement);
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
        element.addEventListener('click',  (e) => {
          try {
            let prexistingItem = document.getElementById("itemView");
            prexistingItem.remove()
          }
          catch{}
          
          todaysOffersMethods.establishHTML_item(element);
          
        })
        break;
    }
    return element;
  },
  clearElement: function(elementStr){
    document.querySelector(elementStr).innerHTML = "";
  },
  appendChildren: function(parent, ...elementChildren){
    for (let i in elementChildren) {
      parent.appendChild(elementChildren[i]);
    }
    return parent;
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
    globalMethods.clearElement("body");
    switch(e.target.id) {
      case 'todaysOffers':
        clearTimeout(shopKeeperSays)
        todaysOffersMethods.establishHTML_TO();
        todaysOffersMethods.bringUpDisplay();
        startupMethods.getWallet();
        shopKeeperSays("shopDisplay");
        break;
      case 'leaveBazaar':
        if (window.innerwidth < 1200) {
          document.querySelector('body').style.backgroundImage = "url('../img/wallPaper2_mobile.jpg')"
        }
        else {
          document.querySelector('body').style.backgroundImage = "url('../img/wallPaper2_full.jpg')"
        }
        let textBox = globalMethods.createElement('div',"","textBox","","");
        let homeView = globalMethods.createElement('main',"homeView");
        homeView.appendChild(textBox)
        document.querySelector('body').appendChild(homeView);
        shopKeeperSays(`byebye${globalMethods.randNumGen(5,1).toString()}`);
        let leaveBazaar = setTimeout(() => {
          window.location.assign("https://erikqb3.github.io/WDD330_ErikQBirch_portfolio/")
        }, 5000)
        break;
      case 'huntingTrips':
        let textBox1 = globalMethods.createElement('div',"","textBox","","");
        let homeView1 = globalMethods.createElement('main',"homeView");
        homeView1.appendChild(textBox1)
        document.querySelector('body').appendChild(homeView1);
        shopKeeperSays(`notAvailable1`);
        let returnToHome = setTimeout(() => {
          window.location.assign("../views/index.html")
        }, 5000)
        break;
      case 'home':
      case 'backBtn':
        homeViewMethods.establishHTML_home(); //THIS IS HOW IT SHOULD WORK
        startupMethods.getWallet();
        startupMethods.getHTripCount();
        localStorage.removeItem("sellList")
        shopKeeperSays("greetings");
        break;
    }
  },
  changeSettings: function(e) {
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
          todaysOffersMethods.bringUpInv();
          document.getElementById('nav').style.visibility = 'hidden';
          let sellBtn = globalMethods.createElement('div',"sellBtn","","", "Sell");
          sellBtn.addEventListener('click',()=> {
            shopKeeperSays("notAvailable2");
          })
          document.getElementById("infoANDinteraction").appendChild(sellBtn);
          shopKeeperSays("toSell")
          if (document.getElementById('itemView')) {
            document.getElementById('itemView').remove();
          }
        }
        else if (button.innerHTML == "Display") {
          header.id = "displayCase";
          header.innerHTML = "Shop's Display";
          button.innerHTML = "Inventory";
          globalMethods.clearElement('ul');
          todaysOffersMethods.bringUpDisplay();
          document.getElementById('nav').style.visibility = 'visible';
          document.getElementById('sellBtn').remove();
          shopKeeperSays("shopDisplay")
          if (document.getElementById('sellList_holder')) {
            document.getElementById('sellList_holder').remove();
          }
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
      case 'noBtn':
        shopKeeperSays("dontBuy")
        document.getElementById('itemView').remove();
        break;
      case 'yesBtn':
        shopKeeperSays("yesBuy")
        todaysOffersMethods.spendMoney(document.getElementById('totalCost').innerHTML)
        break;
      case 'sellBtn':
        let sellList_holder = todaysOffersMethods.establishHTML_sellListHolder
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











