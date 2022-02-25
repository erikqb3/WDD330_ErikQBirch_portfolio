// let number = Math.floor(Math.random() * 899);

async function getFullPokemon () {
  let limit = 25;
  const allPokemonNumb = 899;
  let pokedex = [];
  let chunk = [];
  let paginationArray = [1];
  let finished = false;
  for (i = 1; i < allPokemonNumb; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    await fetch(url)
      .then(response => 
        response.json())
      .then((results) => {
        logResults(results);
        chunk.push(results);
        if (i%limit==0) {
          pokedex.push(chunk);
          paginationArray.push(i)
          chunk = [];
        }
        if (i == limit) { //get's the first set out there fast so user doesn't have to wait
          displayChunk(pokedex,0);
        }
        else if (i == 898) {
          pokedex.push(chunk);
          chunk = [];
          finished = true;
        }
      })
  }
  console.log(pokedex);
  console.log(chunk);
  console.log(paginationArray)
  // displayChunk(pokedex);
  return(pokedex)
}

function logResults(pokeInfo) {
  console.log(pokeInfo.name)
  // console.log(pokeInfo.sprites.front_default)
}


function displayChunk(pokedex,number) {
  const pokedexList = document.getElementById("pokedexList");
  for (i=0; i < pokedex[number].length; i++) {
    let pokemon = document.createElement("p");
    pokemon.innerHTML = pokedex[number][i].name;
    pokedexList.appendChild(pokemon)
  };
}

function displayPagination(paginationArray) {
  paginationNav = document.createElement('div');
  for (i=0; i<paginationArray.length; i++) {
    paginationBtn = createElement('p');
    // paginationBtn.innerHTML = 
  }
  
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