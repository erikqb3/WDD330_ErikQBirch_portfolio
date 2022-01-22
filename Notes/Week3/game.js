const block = document.getElementById("block");
const cssObj = window.getComputedStyle(block,null);
let increment = 0
addEventListener('keydown', (event) => {
  console.log(event.key);
  // console.log(block);

switch(event.key) {
  case "ArrowDown":
  case "k":
    bottom = cssObj.getPropertyValue('bottom');
    bottom = Number(bottom.replace("px",''));
    increment++
    newBottom = (bottom - (increment + 9)).toString();
    block.style.bottom =  newBottom + "px";
    addEventListener('keyup', () => {increment = 0;
    })
    break;
  case "ArrowUp":
  case "i":
    bottom = cssObj.getPropertyValue('bottom');
    bottom = Number(bottom.replace("px",''));
    increment++
    newBottom = (bottom + (increment + 9)).toString();
    console.log(newBottom)
    block.style.bottom =  newBottom + "px";
    addEventListener('keyup', () => {increment = 0;
    })
    break;
  case "ArrowLeft":
  case "j":
    left = cssObj.getPropertyValue('left');
    left = Number(left.replace("px",''));
    increment++
    newLeft = (left - (increment + 9)).toString();
    block.style.left =  newLeft + "px";
    addEventListener('keyup', () => {increment = 0;
    })
    break;
  case "ArrowRight":
  case "l":
    left = cssObj.getPropertyValue('left');
    left = Number(left.replace("px",''));
    increment++
    newLeft = (left + (increment + 9)).toString();
    block.style.left =  newLeft + "px";
    addEventListener('keyup', () => {increment = 0;
    })
    break;
}



  // if (event.key === "ArrowDown") {
  //   cssObj = window.getComputedStyle(block,null);
  //   bottom = cssObj.getPropertyValue('bottom');
  //   bottom = Number(bottom.replace("px",''))
  //   console.log(bottom)
  //   increment++
  //   increment = increment + 9;
  //   newBottom = increment + bottom;
  //   newBottom = newBottom.toString();
  //   // console.log(block.getPropertyValue('bottom'))
  //   console.log(newBottom)
  //   block.style.bottom =  newBottom + "px";
  //   addEventListener('keyup', () => {increment = 0;
  //   })
  // }
  // else if (event.key = "ArrowLeft") {
  //   increment++;
  //   increment = increment + 9;
  //   increment = increment.toString()
  //   console.log(increment)
  //   block.style.left = increment + "px";
  //   addEventListener('keyup', () => {increment = 0;
  //   })
  // }
});

console.log("Hellow")
