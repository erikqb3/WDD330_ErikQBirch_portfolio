function TestFunction (A,B,C) {
  const a = A;
  let b = B;
  var c = C;
  return(a+b+c+d)
}

let d = 10; //global varible
console.log(TestFunction(10,20,30))

// THESE VARIABLES MADE IN THE FUNCION
// console.log(a+a, "A+A");
// console.log(b+b, "B+B");
// console.log(c+c, "C+C");

//cALL BACKS, 

function operation (A, B, cb) {
  return(cb(A,B))
}

function addInputs (A,B) {
  return (A+B)
}
function subtractInputs (A,B) {
  return (A-B)
}
function multiplyInputs (A,B) {
  return (A*B)
}
function divideInputs (A,B) {
  return (A/B)
}

function calulator() {
  let A = document.getElementById('A');
  let B = document.getElementById('B');
  let operator = document.getElementById('operator');
  let output = document.getElementById('output');

  switch (operator) {
    case "+":
      output.innerHTMl = operation(A,B,addInputs);
      break;
    case "-":
      output.innerHTMl = operation(A,B,subtractInputs);
      break;
    case "*":
      output.innerHTMl = operation(A,B,multiplyInputs);
      break;
    case "/":
      output.innerHTMl = operation(A,B,divideInputs);
      break;
  }
  

}

let button = document.getElementById('button');
// button.addEventListener('click', calulator)
console.log(button)