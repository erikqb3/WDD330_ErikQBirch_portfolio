import { globalMethods } from "./index.js";

import { startupMethods } from "./startupMethods.js";

export const homeViewMethods = {
  establishHTML_home: function() {
    let body = document.querySelector('body');
    let logo = globalMethods.createElement('img',"logo","","../img/Logo.png");
    let homeView = globalMethods.createElement('main',"homeView");
    let menuBtns = globalMethods.createElement('div',"menuBtns");
    let wallet = globalMethods.createElement('div',"wallet", "display", "", `R ${localStorage.wallet}`);
    let todaysOffers = globalMethods.createElement('div',"todaysOffers","viewBtn","", "Today's Offers");
    let leaveBazaar = globalMethods.createElement('div',"leaveBazaar","viewBtn","", "Leave Bazaar");
    let huntingTrips = globalMethods.createElement('div',"huntingTrips","viewBtn","", "Hunting Trips (<span id='HTripCount'></span>)");
    let textBox = globalMethods.createElement('div',"","textBox");


    menuBtns = globalMethods.appendChildren(menuBtns, wallet,todaysOffers,leaveBazaar,huntingTrips);
    homeView = globalMethods.appendChildren(homeView, menuBtns,textBox)
    body = globalMethods.appendChildren(body, logo,homeView)
  }
}