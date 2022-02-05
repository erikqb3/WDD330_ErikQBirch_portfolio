let taskCounter = 0;
let addBtn = document.getElementById('addBtn');




function addTask() {
  // Step1: get elements and values
  // Step2: run functions to create elements for added task
  // Step3: append created elements from Step2 to elements gotten from Step1
  // Step4: add checkOff option and erase input text

    //Step1
    taskCounter++;
    let input = document.getElementById("input").value;
    let TDlist = document.getElementById("TDlist");

    //Step2
    let Task_holder = createTaskHolder();
    let Task_cb = createCheckElement(taskCounter);
    let Task_label = createLabelElement(taskCounter,input);

    //Step3
    TDlist.appendChild(Task_holder);
    Task_holder.appendChild(Task_cb);
    Task_holder.appendChild(Task_label);

    //Step4
    enableCheckOff(Task_holder);
    document.getElementById("input").value = ""; //clear input
  // })
};

function createTaskHolder() {
  // create holder, give it a class, return it
  let taskHolder = document.createElement('div');
  taskHolder.classList.add("taskHolder");
  return taskHolder;
}
function createCheckElement(counter) {
  // create checkbox, add attributes, return
  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.name = "Task" + counter;
  checkbox.id = "Task" + counter;
  return checkbox;
}
function createLabelElement(counter, input) {
  // create label, create attribute value, put it all together and return
  let label = document.createElement("label");
  let forAttribute = "Task"+counter;
  label.setAttribute("for",forAttribute);
  label.id = "Label"+counter;
  label.innerText = input;
  return label;
}
function createXDiv(){
  // create X div and return
  let X = document.createElement('div');
  X.innerHTML = "X";
  return X;
}

function enableCheckOff(newTask) {
  // Step1: 
  let children = newTask.children;
  let box = children[0];
  let label = children[1];


  box.addEventListener('click', () => {
    let X = createXDiv();
    console.log(X);
    if (box.checked) {
      console.log("CHECKED");
      label.style.textDecoration = "line-through";
      newTask.appendChild(X);

    }
    else {
      label.style.textDecoration = "none"
      newTask.children[2].remove();
    }
  })
};
function remaining() {

};
function switchView() {

};


addEventListener('keypress', (e) => { //press entner
  if (e.key === "Enter") {
    addTask();
  }
})
addEventListener('click', (e) => { // click "+" button
  if (e.target === addBtn) {
    addTask();
  }
})

remaining();
switchView();