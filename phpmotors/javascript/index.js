window.onload = (event) => {
  let lastModified = document.lastModified
  document.getElementById('currentdate').textContent = lastModified
  console.log(lastModified)
}


function searchBtnAnimation(){
  console.log("ANIMATION")
  let searchBtn = document.getElementById('searchBtn');
  let searchBar = document.getElementById('searchBar');
  console.log(searchBtn)
  addEventListener('click', e => {
    if ((e.target == searchBtn)&&(searchBtn.classList.contains('SEARCH'))) {
      let searchParam = searchBar.value;
      window.location.assign(`/phpmotors/routes/search-route.php?action=search_dmy&pagNavNumb=0&searchParam=${searchParam}`);
    }
    else if ((e.target == searchBtn)||(e.target == searchBar)) {
      console.log("WORKS");
      searchBar.style.display = "flex";
      searchBar.setAttribute('autofocus','true');
      searchBtn.classList.add('SEARCH');
    }
    else {
      console.log("NOT BUTTON")
      searchBar.style.display = "none"
      try {
        searchBtn.classList.remove('SEARCH')
      }
      catch{}
    }
  });
  addEventListener('keyup', e => {
    if ((e.key == "Enter")&&(searchBtn.classList.contains('SEARCH'))) {
      let searchParam = searchBar.value;
      window.location.assign(`/phpmotors/routes/search-route.php?action=search_dmy&pagNavNumb=0&searchParam=${searchParam}`);
    }
  })

}

searchBtnAnimation()

// function enlargeNavButton (){
//   const navButtons_Array = document.querySelectorAll(".navBut");
//   navButtons_Array.forEach(element => {
//     element.addEventListener("mouseover", e=> {
//       let target = e.target.closest('li');
//       target.classList.add('grow');
//       console.log("GROW");
//       // target.style.lineHeight = "5rem";
//       // target.style.backgroundColor = "orange";
//       // console.log("hellow")
//     })
//     element.addEventListener("mouseout", e=> {
//       let target = e.target.closest('li');
//       target.classList.remove('grow');
//     })
//   });
//   console.log(navButtons_Array);
// }

// enlargeNavButton();

console.log("HELLOW")
