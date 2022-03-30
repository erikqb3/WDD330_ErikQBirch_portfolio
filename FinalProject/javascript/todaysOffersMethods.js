import { globalMethods } from "./index.js";

import { startupMethods } from "./startupMethods.js";

export const todaysOffersMethods = {
  establishHTML_TO: function() {

    console.log(localStorage.wallet)
    // console.log("Hellow");
    let body = document.querySelector('body');
    let todaysOfferView = globalMethods.formElement('main',"todaysOffers");
    let mainHeader = globalMethods.formElement('h1',"displayCase","","","Shop's Display");
    let scrollableList = globalMethods.formElement('ul',"scrollableList");
    let infoANDinteraction = globalMethods.formElement('div',"infoANDinteraction");
    let nav = globalMethods.formElement('div',"nav");
    let leftArrow = globalMethods.formElement('span',"prevBtn","arrow","","<");
    let rightArrow = globalMethods.formElement('span',"nextBtn","arrow","",">");
    let nav_content = globalMethods.formElement('span',"","dummyCode","","");

    let pagNavIndex = globalMethods.formElement('span',"pagNavIndex","","",`${parseInt(localStorage.pagNavIndex)+1}`)
    let pagNavLimit = globalMethods.formElement('span',"pagNavLimit","","",`/${JSON.parse(localStorage.shelf).length}`)


    let wallet = globalMethods.formElement('div',"wallet", "display", "", `R ${localStorage.wallet}`);
    let backBtn = globalMethods.formElement('div',"backBtn","viewBtn","", "Back");
    let itemBtn = globalMethods.formElement('div',"itemBtn","changeBtn","", "Inventory");
    let textBox = globalMethods.formElement('div',"","textBox");


    nav_content.appendChild(pagNavIndex);
    nav_content.appendChild(pagNavLimit);

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

    if (parseInt(localStorage.pagNavIndex) == 0){
      document.getElementById('prevBtn').style.display = "none";
    }

    // startupMethods.getWallet();
  },
  bringUpDisplay: function(
    pagNavNumb = localStorage.pagNavIndex,
    shelfArray = JSON.parse(localStorage.shelf),
    counter = 0,
    scrollableList = document.getElementById("scrollableList")
  ) {
    // console.log(pagNavNumb)
    console.log(shelfArray)
    for (let product in shelfArray[pagNavNumb]) {
      // console.log(shelfArray[pagNavNumb][product].image);
      if ((shelfArray[pagNavNumb][product] == null) || (shelfArray[pagNavNumb][product] == undefined)) {
      }
      else {
      let item_card = globalMethods.formElement('li',"","item_card");
      let img = globalMethods.formElement('img',`${shelfArray[pagNavNumb][product].name}`,"",`${shelfArray[pagNavNumb][product].image}`)
      let item_info = globalMethods.formElement('div',"","item_info");
      let h2 = globalMethods.formElement('h2',"","","",`${shelfArray[pagNavNumb][product].name}`);
      let price = globalMethods.formElement('p',"","price","",`R ${shelfArray[pagNavNumb][product].price}`);
      let descript = globalMethods.formElement('p',"","","",`${shelfArray[pagNavNumb][product].description}`)
      // console.log(randomNumb)

      item_info.appendChild(h2);
      item_info.appendChild(price);
      item_info.appendChild(descript);

      item_card.appendChild(img);
      item_card.appendChild(item_info);

      scrollableList.appendChild(item_card);
      counter++;
    }
    // console.log(counter);
      }
    // console.log(counter+1)
    // console.log(JSON.parse(localStorage.shelf))
    // console.log(this.pagNav.maxNumb, "MAX NUMB")
      
  },
  setUpPagNav: function(shelfItems) {
    let counter = 0;
    let shelf = [];
    let shelfPagNav = [];
    for (let x in shelfItems) {
      shelf.push(shelfItems[x]);
      counter++;
      // console.log(shelfItems[x]);
      if (shelf.length%5==0) {
        shelfPagNav.push(shelf);
        shelf = [];
      }
      else if (counter == shelfItems.length) {
        shelfPagNav.push(shelf);
        shelf = [];
      }
    }
    return shelfPagNav;
  },
  displayArrows: function() {
    let PNI = parseInt(localStorage.pagNavIndex);
    let shelfItems_array = JSON.parse(localStorage.shelf)
    console.log(PNI)
    if (PNI == 0) {
      document.getElementById('prevBtn').style.display = "none";
    }
    else {
      document.getElementById('prevBtn').style.display = "inline";
    }
    if (PNI == (shelfItems_array.length-1)) {
      document.getElementById('nextBtn').style.display = "none";
    }
    else {
      document.getElementById('nextBtn').style.display = "inline";
    }
  },
  
  pagNav: {
    maxNumb: function() {
      maxNumb = JSON.parse(localStorage.shelf).length
      return(maxNumb)
    },
  }

  //formElement: function(paramElement,paramId="",paramClass="",paramLink="",paramText="")
}