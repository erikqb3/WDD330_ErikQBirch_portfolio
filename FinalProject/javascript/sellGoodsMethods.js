import { globalMethods } from "./index.js";

import { shopKeeperJson } from "../javascript/shopKeeper.js";

import { startupMethods } from "../javascript/startupMethods.js";

import { homeViewMethods } from "../javascript/homeViewMethods.js";

import { todaysOffersMethods } from "../javascript/todaysOffersMethods.js";

export const sellGoodsMethods = {
  establishHTML_SG: function () {
    localStorage.setItem("pagNavIndex", 0)
    let pagNavStart = 1;
    // console.log(localStorage.wallet)
    // console.log("Hellow");
    let body = document.querySelector('body');
    let sellGoodsView = globalMethods.createElement('main',"sellGoods");
    let mainHeader = globalMethods.createElement('h1',"inventory","","","Your Inventory");
    let scrollableList = globalMethods.createElement('ul',"scrollableList");
    let infoANDinteraction = globalMethods.createElement('div',"infoANDinteraction");
  

    let wallet = globalMethods.createElement('div',"wallet", "display", "", `R ${localStorage.wallet}`);
    let backBtn = globalMethods.createElement('div',"backBtn","viewBtn","", "Back");
    // let itemBtn = globalMethods.createElement('div',"itemBtn","changeBtn","", "Inventory");
    let textBox = globalMethods.createElement('div',"","textBox");

 
  
    infoANDinteraction.appendChild(wallet);
    infoANDinteraction.appendChild(backBtn);
    // infoANDinteraction.appendChild(itemBtn);

    sellGoodsView.appendChild(mainHeader);
    sellGoodsView.appendChild(scrollableList);
    sellGoodsView.appendChild(infoANDinteraction);
    sellGoodsView.appendChild(textBox);

    body.appendChild(sellGoodsView);
  }
}