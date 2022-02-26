// let number = Math.floor(Math.random() * 899);

let limit = 25;
const allPokemonNumb = 899;
let pokedex = [];
let box = [];
let pagNav_array = [1];
let finished = false;
let pagNav_starter = 0;

async function getFullPokemon () {
  //STEP1 create initial pagination nav
  //STEP2 loop through entire api
  //STEP2a convert api content from url into json
  //STEP2b check progress and push single pokemon into box
  //STEP2c if create new box after previous box reaches limit, no modules remainder  (push(i+1) because bulbasaur is pokemon 1 not 0, so everything is offset by 1)
  //STEP2d get's the first set out there fast so user doesn't have to wait
  //STEP2e put whatever pokemon remain in an unfilled box
  //STEP3 return pokedex full of boxes

  //STEP1
  let pagNav_holder = createPagNav_holder(limit);

  //STEP2
  for (let i = 1; i < allPokemonNumb; i++) {
    //STEP2a
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    await fetch(url)
      .then(response => 
        response.json())
      .then((results) => {
        //STEP2b
        logResults(results);
        box.push(results);
        //STEP2c
        if (i%limit==0) {
          pokedex.push(box);
          pagNav_array.push(i+1)
          box = [];
        }
        //STEP2d
        if ((i == limit) && (pokedex.length == 1)) { 
          displayBox(pokedex,0);
          displayPagNav_holder(pagNav_holder);
          firstBox = document.getElementById("pagNav_holder").firstChild;
          firstBox.id = "current";
        }
        //STEP2e
        else if (i == 898) {
          pokedex.push(box);
          box = [];
          finished = true;
        }
      })
  }
  //TESTSTUFF
  console.log(pokedex);
  console.log(box);
  console.log(pagNav_array)
  //STEP3
  return(pokedex)
}

function logResults(pokeInfo) {
  console.log(pokeInfo.name)
}


function displayBox(pokedex,x) {
  //display all pokedex pokemon from "box number X"
  const pokedexList = document.getElementById("pokedexList");
  console.log(pokedex[x], x)
  for (let i=0; i < pokedex[x].length; i++) {
    let pokemon = document.createElement("p");
    pokemon.innerHTML = pokedex[x][i].name;
    pokedexList.appendChild(pokemon)
  };
}



function createPagNav_holder(limit) {
  //STEP1 set up container for pagNav
  //STEP2 loop through pokedex based limit count
  //STEP2a label pagNavBtns after pokemon index number (Bulbasaur = 1, Raichu = 26, etc.)
  //STEP2b give each pNB an event listener to change Box number and add to pagnNav container
  //STEP3 return pagNav_holder (element)

  //STEP1
  pagNav_holder = document.createElement('div');
  pagNav_holder.id = "pagNav_holder";

  //STEP2
  for (let i=1; i<899; i+=limit) {
    //STEP2a
    pagNavBtn = document.createElement('p');
    pagNavBtn.innerHTML = i;
    //STEP2b
    changeBox_addEL(pagNavBtn, pagNav_array, limit);
    pagNav_holder.appendChild(pagNavBtn);
  }
  //STEP3
  return pagNav_holder;
}

function displayPagNav_holder(pagNav_holder) {
  //dispaly pagNavholder whenever you can/want
  console.log(pagNav_holder)

  let viewLimit = 6;

  pagNav_elementArray = pagNav_holder.children;
  console.log(pagNav_elementArray);
  // let prevBtn = document.createElement('p');
  // prevBtn.innerHTML = "PREV";
  // let nextBtn = document.createElement('p');
  // nextBtn.innerHTML = "NEXT"

  for (let i=0; i<viewLimit; i++) {
    console.log(pagNav_elementArray[i])
  }

  document.getElementsByTagName("main")[0].appendChild(pagNav_holder);


  // let current = document.getElementById('current');
  
  // if (current.innerHTML != "1") {
  //   document.getElementsByTagName("main")[0].appendChild("prevBtn");
  // }

  if (pokedex.length == 1) {

  }
  // document.getElementsByTagName("main")[0].appendChild(pagNav_holder);
}

function clearPokedex() {
  //STEP1 Remove contents of pokedexList
  document.getElementById('pokedexList').innerHTML = "";
}


function changeBox_addEL(element, pagNav_array, limit) {
  //STEP1 add click event listener
  //STEP2 loop throughg pagNav_array and check if pagNavBtn's number = pagNav_array's number
  //STEP3 if true, clear pokedex and display new pokedex based on the pagNavBtn's number, KEEP THE PAGNAV
  //STEP4 change 'current' id to the clicked pagNavBtn

  //STEP1
  element.addEventListener("click", e=> {
    //STEP2
    for (let boxNumb=0; boxNumb<pagNav_array.length; boxNumb++) {
      if (pagNav_array[boxNumb] == parseInt(e.target.innerHTML)) {
        //STEP3
        clearPokedex();
        displayBox(pokedex, boxNumb);
        //STEP4
        document.getElementById('current').removeAttribute('id');
        e.target.id = "current";
      }
    }
  })
}





/* The code to display the details */

function toggleDisplayDetails() {
  console.log("Button Pressed")
}
// now assign an event listener to the button 
// that calls the toggle detail display function
let temp  = document.getElementById('details-button')//.addEventListener('click', toggleDisplayDetails);
pokedexList = document.getElementById("pokedexList");
console.log(pokedexList)
console.log(temp)



getFullPokemon();