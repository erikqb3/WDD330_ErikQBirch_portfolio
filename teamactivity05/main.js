//create an array of hikes 
import hikesList from "./hikes.js";
// import newComment from "./comments.js";


const imgBasePath = "//byui-cit.github.io/cit261/examples/";
let fromSingle = false;

export default class Hikes {//on load grab the array and insert it into the page on load
  constructor(elementId) {
    this.parentElement = document.getElementById(elementId);
  }
 
  showHikeList() { //show a list of hikes in the parentElement
    hikesList.forEach(function(hikeObject) { // First iterate through each hike object
      let trailCard_holder = document.createElement('div');
      let trailCard_display = document.createElement('div'); //create containers
      let trailCard_info = document.createElement('ul');
      trailCard_holder.classList.add("trailHolder");
      trailCard_info.classList.add("trailInfo");
      trailCard_display.classList.add("display")

      Object.keys(hikeObject).forEach(key => {    // Next iterate through each key in the object
        switch(key) { //make changes according to object's key (name, imgSrc, etc)
          case "name": //If the key is an name, we will need to add an h3 element
            var div = document.createElement('div');
            div.classList.add("trailTitle");
            let trailName = document.createElement('h3');
            trailName.innerText = hikeObject[key];
            div.appendChild(trailName);
            trailCard_holder.appendChild(div);
            break;
            case "imgSrc": //If the key is an img src, we will need to add an img element to hold the img
            var img = document.createElement('img')
            img.src = imgBasePath + hikeObject[key]
            img.alt = hikeObject['imgAlt']
            trailCard_display.appendChild(img);
            trailCard_holder.appendChild(trailCard_display); //put img before trailInfo
            break;
          case "description":
          case "directions": //Don't want to show the descript or direct, they have to click on it all first
            break;
          default:
            var li = document.createElement('li');
            trailCard_info.appendChild(li);
            li.innerText = hikeObject[key]
        }

        trailCard_display.appendChild(trailCard_info)
        trailCard_holder.appendChild(trailCard_display) //add trail info
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
        let currentInfo = document.querySelector("div.trailHolder").children; //put current Trail info into array
        let currentInfo_name = currentInfo[0].textContent; // target current Trail name
        
        
        hikesList.forEach(function(hikeObject) { //use "database"
          console.log(hikeObject.name, "73");
          console.log(currentInfo_name, "74");
          if (hikeObject.name == currentInfo_name) { //if value of hikelist key = current name info, 
            // this.showCommentsSection()
            // this.addCommentButton();
            let descript = document.createElement('li'); 
            let direct = document.createElement('li');
            descript.innerHTML = hikeObject["description"];
            direct.innerHTML = hikeObject["directions"];
            console.log(hikeObject["description"]);
            console.log(hikeObject["directions"]);
  
            document.querySelector("ul.trailInfo").appendChild(descript); //add descript and direct elements
            document.querySelector("ul.trailInfo").appendChild(direct);
          }
      })
      this.showCommentsList();
      this.showCommentsInput();
      this.addCommentButton();
      this.buildBackButton(); //create backbutton to go to allTrails view
      } else {};
    }else {
      fromSingle = false;  //just came from singleview, now in allTrails view, allows single view to perform when event happens
    };
    
  }
  showCommentsList(){
    let commentHolder = document.createElement('div');
    commentHolder.classList.add("commentHolder");
    document.querySelector("div.trailHolder").appendChild(commentHolder);
  }

  showCommentsInput(){
    let addCommentButton = document.createElement('textarea');
    addCommentButton.id = "commentInput";
    addCommentButton.textContent = "Add Comment";
    document.querySelector("div.trailHolder").appendChild(addCommentButton);
  }
  addCommentButton() {
    let addCommentButton = document.createElement('button');
    addCommentButton.id = "add_comment";
    addCommentButton.textContent = "Add Comment";
    document.querySelector("div.trailHolder").appendChild(addCommentButton);

    addCommentButton.addEventListener('click', () => { //give it an event listener
      let newComment = this.addComment();
      let commentsDiv = document.createElement('div');
      commentsDiv.id = "comments";
      let commentName = document.createElement("p");
      commentName.innerHTML = newComment.name;
      commentsDiv.appendChild(commentName);
      let commentDate = document.createElement("p");
      commentDate.innerHTML = newComment.date;
      commentsDiv.appendChild(commentDate);
      let commentContent = document.createElement("p");
      commentContent.innerHTML = newComment.content;
      commentsDiv.appendChild(commentContent);
      document.querySelector("div.trailHolder").appendChild(commentsDiv);
    });
  }
  // addCommentToList() {
  //   let commentText = document.getElementById("commentInput").textContent;
  //   let commentElement = document.createElement('div');
  //   commentElement.classList.add('commentElement');
  //   let commentElement_text = document.createElement('p');
  //   commentElement_text.innerHTML = commentText;
  //   commentElement.appendChild(commentElement_text)
  // }


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
