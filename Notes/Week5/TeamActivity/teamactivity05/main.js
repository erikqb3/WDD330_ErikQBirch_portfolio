//create an array of hikes
import hikesList from "./hikes.js";

const imgBasePath = "//byui-cit.github.io/cit261/examples/";
let fromSingle = false;

export default class Hikes {//on load grab the array and insert it into the page on load
  constructor(elementId) {
    this.parentElement = document.getElementById(elementId);
  }
 
  showHikeList() { //show a list of hikes in the parentElement
    hikesList.forEach(function(hikeObject) { // First iterate through each hike object
      let trailCard_holder = document.createElement('div'); //create containers
      let trailCard_info = document.createElement('ul');
      trailCard_holder.classList.add("trailHolder");
      trailCard_info.classList.add("trailInfo");

      Object.keys(hikeObject).forEach(key => {    // Next iterate through each key in the object
        switch(key) { //make changes according to object's key (name, imgSrc, etc)
          case "imgSrc": //If the key is an img src, we will need to add an img element to hold the img
            var img = document.createElement('img')
            img.src = imgBasePath + hikeObject[key]
            img.alt = hikeObject['imgAlt']
            trailCard_holder.insertBefore(img,trailCard_info); //put img before trailInfo
            break;
          case "name": //If the key is an name, we will need to add an h3 element
            var li = document.createElement('li');
            let trailName = document.createElement('h3');
            trailName.innerText = hikeObject[key];
            li.appendChild(trailName);
            trailCard_info.appendChild(li);
            break;
          case "description":
          case "directions": //Don't want to show the descript or direct, they have to click on it all first
            break;
          default:
            var li = document.createElement('li');
            trailCard_info.appendChild(li);
            li.innerText = hikeObject[key]
        }

        trailCard_holder.appendChild(trailCard_info) //add trail info
        document.getElementById('hikes').appendChild(trailCard_holder) //add img and tril info
      })
    })
    this.addHikeListener(); //give each trail card an event listener
  }
  
  showOneHike(trailFromLoop) {// show one hike with full details in the parentElement
    let singleTrail = trailFromLoop; //save clicked trail
    let mainDiv_Array = document.getElementById("hikes").children;
    singleTrail.style.cursor = "initial";

    if (fromSingle === false) { //doesn't carry out code if coming from single trail view
      if (mainDiv_Array.length === 3) {//only carry out code if currently in allTrail view
        document.getElementById("hikes").innerHTML = ""; //clear whole list
        document.getElementById("hikes").appendChild(singleTrail); //display clicked trail
        let currentInfo = document.querySelector("ul.trailInfo").children; //put current Trail info into array
        let currentInfo_name = currentInfo[0].textContent; // target current Trail name
    
        hikesList.forEach(function(hikeObject) { //use "database"
          Object.keys(hikeObject).forEach(key => { // loop through whole hike list
            if (hikeObject[key] == currentInfo_name) { //if value of hikelist key = current name info, 
              let descript = document.createElement('li'); 
              let direct = document.createElement('li');
              descript.innerHTML = hikeObject["description"];
              direct.innerHTML = hikeObject["directions"];
    
              document.querySelector("ul.trailInfo").appendChild(descript); //add descript and direct elements
              document.querySelector("ul.trailInfo").appendChild(direct);
            }
        })
      })
      this.buildBackButton(); //create backbutton to go to allTrails view
      } else {};
    }else {
      fromSingle = false;  //just came from singleview, now in allTrails view, allows single view to perform when event happens
    };
    
  }
 
  addHikeListener() { // in order to show the details of a hike untouchend we will need to attach a listener AFTER the list of hikes has been built. 
    // We need to loop through the children of our list and attach a listener to each, remember though that children is a nodeList...not an array. So in order to use something like a forEach we need to convert it to an array.
    let trailCards_array = document.querySelectorAll("div.trailHolder");
    for (let i=0; i < trailCards_array.length; i++) {
      trailCards_array[i].addEventListener("click", () => {
        this.showOneHike(trailCards_array[i])}
      ) 
    }
  }
  buildBackButton() { 
    let backButton = document.createElement('button'); //create button
    backButton.innerHTML = "Back";
    document.querySelector("div.trailHolder").appendChild(backButton) //add to Trail Card
  
    backButton.addEventListener('click', () => { //give it an event listener
      document.querySelector("div#hikes").innerHTML = ""; //clear out singleView
      this.showHikeList();
      fromSingle = true;
    })
  };

}



const myHike = new Hikes('hikes');
myHike.showHikeList();
