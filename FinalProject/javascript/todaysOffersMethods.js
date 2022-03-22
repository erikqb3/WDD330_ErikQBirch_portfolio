import { globalMethods } from "./index.js";

import { startupMethods } from "./startupMethods.js";

export const todaysOffersMethods = {
  establishHTML_TO: function() {
    console.log("Hellow");
    let body = document.querySelector('body');
    let todaysOfferView = globalMethods.formElement('main',"todaysOffers");
    let mainHeader = globalMethods.formElement('h1',"displayCase","","","Shop's Display");
    let scrollableList = globalMethods.formElement('ul',"scrollableList");
    let infoANDinteraction = globalMethods.formElement('div',"infoANDinteraction");
    let nav = globalMethods.formElement('div',"nav");
    let leftArrow = globalMethods.formElement('span',"","arrow","","<");
    let rightArrow = globalMethods.formElement('span',"","arrow","",">");
    let nav_content = globalMethods.formElement('span',"","dummyCode","","1/5");
    let wallet = globalMethods.formElement('div',"wallet", "display", "", "");
    let backBtn = globalMethods.formElement('div',"backBtn","viewBtn","", "Back");
    let itemBtn = globalMethods.formElement('div',"itemBtn","changeBtn","", "Inventory");
    let textBox = globalMethods.formElement('div',"","textBox");


    nav.appendChild(leftArrow);
    nav.appendChild(nav_content);
    nav.appendChild(rightArrow);

    infoANDinteraction.appendChild(nav);
    infoANDinteraction.appendChild(wallet);
    infoANDinteraction.appendChild(backBtn);
    infoANDinteraction.appendChild(itemBtn);

    todaysOfferView.appendChild(mainHeader);
    todaysOfferView.appendChild(scrollableList);
    todaysOfferView.appendChild(infoANDinteraction);
    todaysOfferView.appendChild(textBox);

    body.appendChild(todaysOfferView);

    startupMethods.getWallet();
  }
  //formElement: function(paramElement,paramId="",paramClass="",paramLink="",paramText="")
}