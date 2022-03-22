import { globalMethods } from "./index.js";

import { startupMethods } from "./startupMethods.js";

export const homeViewMethods = {
  establishHTML_home: function() {
    console.log("Hellow");
    let body = document.querySelector('body');
    let logo = globalMethods.formElement('img',"logo","","../img/Logo.png");
    let homeView = globalMethods.formElement('main',"homeView");
    let menuBtns = globalMethods.formElement('div',"menuBtns");
    let wallet = globalMethods.formElement('div',"wallet", "display", "", `${startupMethods.getWallet}`);
    let todaysOffers = globalMethods.formElement('div',"todaysOffers","viewBtn","", "Today's Offers");
    let sellGoods = globalMethods.formElement('div',"sellGoods","viewBtn","", "Sell Goods");
    let huntingTrips = globalMethods.formElement('div',"huntingTrips","viewBtn","", "Hunting Trips (<span id='HTripCount'></span>)");
    let textBox = globalMethods.formElement('div',"","textBox");

    menuBtns.appendChild(wallet);
    menuBtns.appendChild(todaysOffers);
    menuBtns.appendChild(sellGoods);
    menuBtns.appendChild(huntingTrips);
    homeView.appendChild(menuBtns);
    homeView.appendChild(textBox);
    body.appendChild(logo);
    body.appendChild(homeView);
  }
}