console.log("hello")

const pswdBtn = document.querySelector("#pswdBtn");
pswdBtn.addEventListener("click", function() {
  console.log("Hi")
  const pswdInputs = document.querySelectorAll(".pswd");
  for (let i=0; i<pswdInputs.length; i++) {
    const type = pswdInputs[i].getAttribute("type");
    if (type == "password") {
      pswdInputs[i].setAttribute("type", "text");
      pswdBtn.innerHTML = "Hide Password";
    } else {
      pswdInputs[i].setAttribute("type", "password");
      pswdBtn.innerHTML = "Show Password";
    }
  }
});





//   const pswdInput = document.getElementById("pword");
//   const type = pswdInput.getAttribute("type");
//   if (type == "password") {
//     pswdInput.setAttribute("type", "text");
//     pswdBtn.innerHTML = "Hide Password";
//   } else {
//     pswdInput.setAttribute("type", "password");
//     pswdBtn.innerHTML = "Show Password";
//   }
// });
