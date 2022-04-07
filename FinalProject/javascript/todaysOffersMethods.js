import { buttonRouter, globalMethods, shopKeeperSays } from "./index.js";

import { shopKeeperJson } from "./shopKeeper.js";

import { startupMethods } from "./startupMethods.js";

export const todaysOffersMethods = {
  establishHTML_TO: function() {
    /**
     * STEP1: create needed Elements
     * STEP2: append children to parent elements (order matters)
     * STEP3: display 
     * STEP4: hide prevBtn when necessary
     */

    //STEP1
    localStorage.setItem("pagNavIndex", 0)
    let pagNavStart = 1;
    let body = document.querySelector('body');
    let todaysOfferView = globalMethods.createElement('main',"todaysOffers");
    let mainHeader = globalMethods.createElement('h1',"displayCase","","","Shop's Display");
    let scrollableList = globalMethods.createElement('ul',"scrollableList");
    let infoANDinteraction = globalMethods.createElement('div',"infoANDinteraction");
    let nav = globalMethods.createElement('div',"nav");
    let leftArrow = globalMethods.createElement('span',"prevBtn","arrow","","<");
    let rightArrow = globalMethods.createElement('span',"nextBtn","arrow","",">");
    let nav_content = globalMethods.createElement('span',"","dummyCode","","");

    let pagNavIndex = globalMethods.createElement('span',"pagNavIndex","","",`${parseInt(pagNavStart)}`)
    let pagNavLimit = globalMethods.createElement('span',"pagNavLimit","","",`/${JSON.parse(localStorage.shelf).length}`)


    let wallet = globalMethods.createElement('div',"wallet", "display", "", `R ${localStorage.wallet}`);
    let backBtn = globalMethods.createElement('div',"backBtn","viewBtn","", "Back");
    let itemBtn = globalMethods.createElement('div',"itemBtn","changeBtn","", "Inventory");
    let textBox = globalMethods.createElement('div',"","textBox");

    //STEP2
    nav_content = globalMethods.appendChildren(nav_content, pagNavIndex,pagNavLimit)
    nav = globalMethods.appendChildren(nav, leftArrow,nav_content,rightArrow)
    infoANDinteraction = globalMethods.appendChildren(infoANDinteraction, nav,wallet,backBtn,itemBtn)
    todaysOfferView = globalMethods.appendChildren(todaysOfferView, mainHeader,scrollableList,infoANDinteraction,textBox)

    body.appendChild(todaysOfferView); //STEP3

  
    if (parseInt(localStorage.pagNavIndex) == 0){
      document.getElementById('prevBtn').style.display = "none"; //STEP4
    }
  },
  bringUpDisplay: function(
    pagNavNumb = localStorage.pagNavIndex,
    shelfArray = JSON.parse(localStorage.shelf),
    scrollableList = document.getElementById("scrollableList")
  ) {
    /**
     * STEP1: loop through localstorage for products random selected an put on shelfArray
     * STEP1a: skip array item if undefined or null
     * STEP2: create elements of item card
     * STEP3: append elements to item card
     */

    //STEP1
    for (let product in shelfArray[pagNavNumb]) {
      if ((shelfArray[pagNavNumb][product] == null) || (shelfArray[pagNavNumb][product] == undefined)) { //STEP1a
      }
      else {
      //STEP2
      let item_card = globalMethods.createElement('li',"","item_card");
      let img = globalMethods.createElement('img',`${shelfArray[pagNavNumb][product].name}`,"",`${shelfArray[pagNavNumb][product].image}`)
      let item_info = globalMethods.createElement('div',"","item_info");
      let item_name = globalMethods.createElement('h2',"","","",`${shelfArray[pagNavNumb][product].name.toUpperCase()}`);
      let price = globalMethods.createElement('p',"","price","",`R ${shelfArray[pagNavNumb][product].price}`);
      let descript = globalMethods.createElement('p',"","","",`${shelfArray[pagNavNumb][product].description}`)

      //STEP3
      item_info = globalMethods.appendChildren(item_info, item_name,price,descript);
      item_card = globalMethods.appendChildren(item_card, img,item_info)
      scrollableList.appendChild(item_card);
    }
      }
      
  },
  setUpPagNav: function(
    shelfItems,
    counter = 0,
    shelf = [],
    shelfPagNav = []
    ) {
    /**
     * STEP1:
     */
    for (let x in shelfItems) {
      shelf.push(shelfItems[x]);
      counter++;
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
  displayArrows: function(
    PNI = parseInt(localStorage.pagNavIndex),
    shelfItems_array = JSON.parse(localStorage.shelf)
  ) {
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
  establishHTML_item: function(card_element) {
    shopKeeperSays(`clickItem${globalMethods.randNumGen(5,1).toString()}`)
    let children = card_element.children;
    let grandchildren = children[1].children
    let itemView = globalMethods.createElement('div',"itemView");
    let itemName = globalMethods.createElement('h1',"","","",`${grandchildren[0].innerHTML.toUpperCase()}`);
    let itemImg = globalMethods.createElement('img',"","",`${children[0].src}`);
    let itemInfo = globalMethods.createElement('div',"itemInfo");
    let itemPrice = globalMethods.createElement('h2',"itemPrice","","",`${grandchildren[1].innerHTML}`);
    let itemDescript = globalMethods.createElement('p',"","","",`${grandchildren[2].innerHTML}`);

    let priceToggle = globalMethods.createElement('div',"priceToggle");
    let quantityLabel = globalMethods.createElement('label',"","","","Quantity");
    quantityLabel.setAttribute('name',"quantity")
    let quantityInput = globalMethods.createElement('input',"quantity")
    quantityInput.setAttribute("type","number");
    quantityInput.setAttribute("min","1");
    quantityInput.setAttribute("value","1");
    let totalCost = globalMethods.createElement('p',"totalCost","","",`R ${grandchildren[1].innerHTML.substring(2,grandchildren[1].innerHTML.length)}`);
    quantityInput.addEventListener("change", ()=> {
      totalCost.innerHTML = (`R ${grandchildren[1].innerHTML.substring(2,grandchildren[1].innerHTML.length) * quantityInput.value}`);
    })


    let btnHolder = globalMethods.createElement('div',"btnHolder");
    let noBtn = globalMethods.createElement('div',"noBtn","button","","No");
    noBtn.addEventListener('click', (e)=> {
      buttonRouter.changeSettings(e)
    })
    let yesBtn = globalMethods.createElement('div',"yesBtn","button","","Yes");
    yesBtn.addEventListener('click', (e)=> {
      buttonRouter.changeSettings(e);
      this.addToInventory(itemName.innerHTML,itemPrice.innerHTML.substring(2, itemPrice.innerHTML.length));
    })
  
    btnHolder = globalMethods.appendChildren(btnHolder, noBtn,yesBtn);
    priceToggle = globalMethods.appendChildren(priceToggle, quantityLabel,quantityInput,totalCost)
    itemInfo = globalMethods.appendChildren(itemInfo, itemPrice,itemDescript,priceToggle)
    itemView = globalMethods.appendChildren(itemView, itemName,itemImg,itemInfo,btnHolder);

    document.querySelector("main#todaysOffers").appendChild(itemView);
  },
  spendMoney: function(
    priceHTML, 
    cost = parseInt(priceHTML.substring(2,priceHTML.length)),
    currentBalance = parseInt(localStorage.getItem('wallet')),
    remaining = (currentBalance - cost)
  ){
    localStorage.setItem('wallet',remaining);
    document.getElementById("wallet").innerHTML = remaining;
    // localStorage.setItem('wallet',100000)
  },
  addToInventory: function(
    addedItem,
    addedItem_price, 
    skipCounter = 0, 
    inputQuantity = document.getElementById('quantity').value){

    let inventoryArray;
    let item;
    if (!localStorage.inventory) {
      localStorage.setItem("inventory", JSON.stringify([]))
      inventoryArray = JSON.parse(localStorage.inventory)
      item = {"itemName":addedItem,
              "quantity":inputQuantity,
              "price": addedItem_price}
      inventoryArray.push(item);
      localStorage.setItem("inventory",JSON.stringify(inventoryArray))
    }
    else {
      inventoryArray = JSON.parse(localStorage.inventory)
      for (let i=0; i< inventoryArray.length; i++) {
        if (inventoryArray[i].itemName == addedItem) {
          inventoryArray[i].quantity=parseInt(inventoryArray[i].quantity) + parseInt(inputQuantity);
        }
        else {
          skipCounter++;
        }
      }
      if (skipCounter == inventoryArray.length) {
        item = {
          "itemName":addedItem,
          "quantity":inputQuantity,
          "price": addedItem_price
        }
        inventoryArray.push(item);
      }
    localStorage.inventory = JSON.stringify(inventoryArray)
    }
  },
  bringUpInv: function(
    scrollableList = document.getElementById('scrollableList')
  ){
    // localStorage.removeItem("inventory")
    localStorage.removeItem("sellList")
    if (!localStorage.inventory) { //error handling
      localStorage.setItem('inventory',JSON.stringify([]));
    }
    if (!localStorage.sellList) { //error handling
      localStorage.setItem('sellList',JSON.stringify([]));
    }

    let invArray = JSON.parse(localStorage.inventory);
    let sellList_array = JSON.parse(localStorage.sellList);


    for (let i in invArray) {
      let invItem = globalMethods.createElement('li',"","invItem");
      let invItem_name = globalMethods.createElement('p',"","","",`${invArray[i].itemName}`);
      let invItem_quantity = globalMethods.createElement('p',"","","",`x${invArray[i].quantity}`);
      let invItem_price = globalMethods.createElement('p',"","","",`${invArray[i].price}`)
      invItem_price.style.display = "none";
      let film = globalMethods.createElement('div',"","film");

      film.addEventListener('click', (e)=> {
        if (!(e.target.parentElement.classList.contains('toSell'))) {
          this.selectToSell(e.target.parentElement);
        }
        else {
          this.deselectInvItem(e.target.parentElement);
          let sellList_table = document.getElementById('sellList_table');
          if (!sellList_table)
          {}
          else {
            for (let tr in sellList_table.children){
              if (sellList_table.children[tr].id == invItem_name.innerHTML) {
                sellList_table.children[tr].remove();
              }
            }
          }
        }
      })

      invItem = globalMethods.appendChildren(invItem, invItem_name,invItem_quantity,invItem_price,film)
      scrollableList.appendChild(invItem);
    }

  },
  selectToSell: function(
    invItem,
    invItem_name = invItem.children[0].innerHTML,
    invItem_quant = parseInt(invItem.children[1].innerHTML.substring(1,invItem.children[1].innerHTML.length)),
    invItem_price = invItem.children[2].innerHTML,
    sellItem = { 
        "name": invItem_name, 
        "quant": invItem_quant,
        "price": invItem_price
      },
    sellList_LS = localStorage.sellList,
    sellList_array = JSON.parse(sellList_LS),
    )
    {
      let sellList_holder = 0;
      if ((sellList_array.length == 0) && (document.getElementById("itemBtn").innerHTML == "Display") && (window.innerWidth > 1200)) {
        sellList_holder = this.establishHTML_sellListHolder()
        document.querySelector("main#todaysOffers").appendChild(sellList_holder)
      }
      sellList_array.push(sellItem)
      localStorage.setItem('sellList',JSON.stringify(sellList_array));
      invItem.classList.add('toSell');

      if (sellList_holder) {
        this.addContent_sellListHolder(sellItem.name,sellItem.quant,sellItem.price)
      }
      else if ((window.innerWidth > 1200)) {
        this.addContent_sellListHolder(sellItem.name,sellItem.quant,sellItem.price)
      }
  },
  establishHTML_sellListHolder: function (){
    let sellList_holder = globalMethods.createElement("div","sellList_holder")
    let sellList_table = globalMethods.createElement('table',"sellList_table")
    let sellList_header = globalMethods.createElement('tr')
    let name_header = globalMethods.createElement('th',"","","","Item Name")//sellList_tabelheaders
    let quantity_header = globalMethods.createElement('th',"","","","Quantity")
    let offer_header = globalMethods.createElement('th',"","","","Offer")

    sellList_header = globalMethods.appendChildren(sellList_header, name_header,quantity_header,offer_header)
    sellList_table = globalMethods.appendChildren(sellList_table, sellList_header);
    sellList_holder.appendChild(sellList_table)

    // document.querySelector("main#todaysOffers").appendChild(sellList_holder)

    return sellList_holder;
  },
  addContent_sellListHolder: function(
    name,
    quant,
    price,
    sellList_tr = globalMethods.createElement('tr',`${name}`),
    multiplier = (globalMethods.randNumGen(300,1)/100),
    sellList_table = document.getElementById('sellList_table')){
      let name_td = globalMethods.createElement('td',"","","",`${name}`)
      let quantInput = globalMethods.createElement('input',"","","","")
      quantInput.setAttribute('type',"number");
      quantInput.setAttribute('min',"1");
      quantInput.setAttribute('max',`${quant}`)
      quantInput.setAttribute("value",`${quant}`)
      let offer_td = globalMethods.createElement('td',"","offer","",`R ${Math.floor(price * multiplier)}`);
      quantInput.addEventListener('change',()=> {
        if (quantInput.value > quant) {
          quantInput.value = quant;
        }
        else {
          offer_td.innerHTML = (`R ${Math.floor(price * multiplier) * quantInput.value}`)
        }
      })
      sellList_tr = globalMethods.appendChildren(sellList_tr, name_td,quantInput,offer_td)
      sellList_table.appendChild(sellList_tr)

  },
  deselectInvItem: function(
    invItem,
    invItem_name = invItem.children[0].innerHTML,
    sellList_array = JSON.parse(localStorage.sellList),
    sellList_holder = document.getElementById("sellList_holder")
    ){
    
    for (let index in sellList_array) {
      if (sellList_array[index].name == invItem_name) {
        sellList_array.splice(index, 1);
      }
    }
    if ((sellList_array.length == 0) && (sellList_holder)) {
      sellList_holder.remove();
    }
    localStorage.sellList = JSON.stringify(sellList_array);
    invItem.classList.toggle('toSell');
  },
  pagNav: {
    maxNumb: function() {
      maxNumb = JSON.parse(localStorage.shelf).length
      return(maxNumb)
    },
  }
}