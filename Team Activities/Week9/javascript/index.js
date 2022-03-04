const audio_array = document.querySelectorAll("audio");

const key_array = document.querySelectorAll(".key");

let increments = [0, 0, 0, 0, 0, 0, 0, 0, 0]

let indexNumb = [0,1,2,3,4,5,5,6,7,8]


function buttonResponse(x) {
      increments[x] += 10;
      audio_array[x].currentTime = 0;
      audio_array[x].play();
      key_array[x].classList.add('playing');
      key_array[x].setAttribute('style',`top:${increments[x]}px;`)
      if (increments[x] == 100) {
        increments[x] = 0;
        key_array[x].setAttribute('style',`top:${increments[x]}px;`)
      }
      addEventListener('keyup', () => {
        key_array[x].classList.remove('playing');
      })
}


addEventListener('keydown', (event) => {
  switch(event.key) {
    case "a":
      buttonResponse(indexNumb[0]);
      break;
    case "s":
      buttonResponse(indexNumb[1])
      break;
    case "d":
      buttonResponse(indexNumb[2]);
      break;
    case "f":
      buttonResponse(indexNumb[3]);
      break;
    case "g":
      buttonResponse(indexNumb[4]);
      break;
    case "h":
      buttonResponse(indexNumb[5]);
      break;
    case "j":
      buttonResponse(indexNumb[6]);
      break;
    case "k":
      buttonResponse(indexNumb[7]);
      break;
    case "l":
      buttonResponse(indexNumb[8]);
      break;
  
  }
});


