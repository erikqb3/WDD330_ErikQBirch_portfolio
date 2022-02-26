let canvas = document.getElementById('myCanvas');
let context = canvas.getContext('2d');
context.strokeStyle = "red";
context.fillStyle = "rgba(0,0,255,0.5)";
context.fillRect(10,50,100,100);
context.strokeRect(10,50,100,100);