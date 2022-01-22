const block = document.getElementById("block");
// const goal = document.getElementById('goal');
const cssObj_block = window.getComputedStyle(block,null);
// const cssObj_goal = window.getComputedStyle(goal,null);
let increment = 0;
const colors = ["#D23234","#2A6BE6","#D8A50B","#07962A","#D65923","#1CA6D3","#D52C7D","#484356"];
let startColor = 0;
play = true;


addEventListener('keydown', (event) => {
switch(event.key) {
  case "ArrowDown":
  case "k":
    bottom = cssObj_block.getPropertyValue('bottom');
    bottom = Number(bottom.replace("px",''));
    increment++
    newBottom = (bottom - (increment + 9)).toString();
    block.style.bottom =  newBottom + "px";
    addEventListener('keyup', () => {increment = 0;
    })
    break;
  case "ArrowUp":
  case "i":
    bottom = cssObj_block.getPropertyValue('bottom');
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
    left = cssObj_block.getPropertyValue('left');
    left = Number(left.replace("px",''));
    increment++
    newLeft = (left - (increment + 9)).toString();
    block.style.left =  newLeft + "px";
    addEventListener('keyup', () => {increment = 0;
    })
    break;
  case "ArrowRight":
  case "l":
    left = cssObj_block.getPropertyValue('left');
    left = Number(left.replace("px",''));
    increment++
    newLeft = (left + (increment + 9)).toString();
    block.style.left =  newLeft + "px";
    addEventListener('keyup', () => {increment = 0;
    })
    break;
  case "g":
    // number = Math.floor(Math.random() * 9);
    if (startColor > 7) {
      startColor = 0;
    }
    number = startColor++
    console.log(number,colors[number])
    backgroundColor = cssObj_block.getPropertyValue('background-color');
    block.style.backgroundColor = colors[number];
    break;
  case "f":
    height = cssObj_block.getPropertyValue('height');
    height = Number(height.replace("px",''));
    increment++
    newHeight = (height + (increment + 9)).toString();
    block.style.height =  newHeight + "px";
    addEventListener('keyup', () => {increment = 0;
    })
    break;
  case "d":
    height = cssObj_block.getPropertyValue('height');
    height = Number(height.replace("px",''));
    increment++
    newHeight = (height - (increment + 9)).toString();
    block.style.height =  newHeight + "px";
    addEventListener('keyup', () => {increment = 0;
    })
    break;
    case "s":
      width = cssObj_block.getPropertyValue('width');
      width = Number(width.replace("px",''));
      increment++
      newWidth = (width + (increment + 9)).toString();
      block.style.width =  newWidth + "px";
      addEventListener('keyup', () => {increment = 0;
      })
      break;
    case "a":
      width = cssObj_block.getPropertyValue('width');
      width = Number(width.replace("px",''));
      increment++
      newWidth = (width - (increment + 9)).toString();
      block.style.width =  newWidth + "px";
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

// addEventListener('keydown', () => {
//   boxBottom = cssObj_block.getPropertyValue('bottom');
//   goalBottom = cssObj_goal.getPropertyValue('bottom');
//   boxLeft= cssObj_block.getPropertyValue('left');
//   goalLeft = cssObj_goal.getPropertyValue('left');
//   boxColor = cssObj_block.getPropertyValue('background-color');
//   goalColor = cssObj_goal.getPropertyValue('background-color');
//   console.log("hellow")
  
//   if ((boxBottom === goalBottom) && (boxLeft === goalLeft) && (boxColor === goalColor)) {
//     newBottom = Math.floor(Math.random() * 50) * 50;
//     newLeft = Math.floor(Math.random() * 50) * 50;
//     goal.style.bottom = newBottom.toString() + "px";
//     goal.style.left =  newLeft.toString() + "px";
//     console.log("New Goal")
//   }
// })
