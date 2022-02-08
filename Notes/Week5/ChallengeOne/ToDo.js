let taskCounter = 0;
let addBtn = document.getElementById('addBtn');
let taskHolder_array = [];


const formFunctions = {
   addTask() {
    // Step1: get elements and values
    // Step2: run functions to create elements for added task
    // Step3: append created elements from Step2 to elements gotten from Step1
    // Step4: add checkOff option and erase input text
  
      //Step1
      taskCounter++;
      let input = document.getElementById("input").value;
      let TDlist = document.getElementById("TDlist");
  
      //Step2
      let Task_holder = this.createTaskHolder();
      let Task_cb = this.createCheckElement(taskCounter);
      let Task_label = this.createLabelElement(taskCounter,input);
  
      //Step3
      TDlist.appendChild(Task_holder);
      Task_holder.appendChild(Task_cb);
      Task_holder.appendChild(Task_label);
  
      //Step4
      this.enableCheckOff(Task_holder);
      document.getElementById("input").value = ""; //clear input
  },
  createTaskHolder() {
    // create holder, give it a class, return it
    let taskHolder = document.createElement('div');
    taskHolder.classList.add("taskHolder");
    this.storeTaskHolder(taskHolder);
    return taskHolder;
  },
  createCheckElement(counter) {
    // create checkbox, add attributes, return
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "Task" + counter;
    checkbox.id = "Task" + counter;
    return checkbox;
  },
  createLabelElement(counter, input) {
    // create label, create attribute value, put it all together and return
    let label = document.createElement("label");
    let forAttribute = "Task"+counter;
    label.setAttribute("for",forAttribute);
    label.id = "Label"+counter;
    label.innerText = input;
    return label;
  },
  createXDiv(){
    // create X div and return
    let X = document.createElement('div');
    X.innerHTML = "X";
    return X;
  },
  storeTaskHolder(taskElement) {
    taskHolder_array.push(taskElement);
  },
  findCompleted() {
    completed_array = document.querySelectorAll("div.CHECKED");
    return completed_array;
  },
  allTasks() {
    allTasks_array = document.querySelectorAll("div.taskHolder");
    return allTasks_array;
  },
  enableCheckOff(newTask) {
    // Step1: 
    let selected = buttonFunctions.checkSelected();
    let children = newTask.children;
    let box = children[0];
    let label = children[1];
  
    box.addEventListener('click', () => {
      let selected = buttonFunctions.checkSelected();
      let X = this.createXDiv();

      if (box.checked) {
        newTask.classList.add("CHECKED")
        label.style.textDecoration = "line-through";
        newTask.appendChild(X);
        if (selected === "Active") {
          newTask.setAttribute("style","display:none");
        }
      }
      else {
        newTask.classList.remove("CHECKED")
        label.style.textDecoration = "none"
        newTask.children[2].remove();
        if (selected === "Completed") {
          newTask.setAttribute('style','display:none');
        }
      }
      this.remaining();
    })
  },
  remaining() {
    let allTasks = this.allTasks();
    let completed = this.findCompleted();
    let leftovers = 0;
    let span = document.getElementById("leftovers");
    leftovers = allTasks.length - completed.length
    span.textContent = leftovers.toString();
  },
  switchView() {
  }

}

const buttonFunctions = {
  checkSelected() {
    const selected = document.querySelector("button.selected").innerHTML;
    // console.log(selected, "line102");
    return selected;
  },
  newSelected () {
    const buttons = document.getElementById('viewOptions').children;
    for (let i=0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', e=> {
        for (let ii=0; ii<buttons.length; ii++) {
          try {
          buttons[ii].classList.remove("selected");
          }
          catch (err) {
            console.log("You've done messed up!")
          }
        }
        e.target.classList.add('selected')

        switch (e.target.innerHTML) {
          case "All":
            let allTasks_all = formFunctions.allTasks();
            this.allBtn(allTasks_all);
            break;

          case "Active":
            let allTasks_active = formFunctions.allTasks();
            let completed_active = formFunctions.findCompleted();
            this.activeBtn(allTasks_active,completed_active);
            break;
            
          case "Completed":
            let allTasks_completed = formFunctions.allTasks();
            let completed_completed = formFunctions.findCompleted();
            this.completedBtn(allTasks_completed,completed_completed)
            break;
          default:
            break;
        }
      })
    }
  },
  allBtn(allTasks) {
    for (let i=0; i<allTasks.length; i++) {
      allTasks[i].setAttribute("style","display:flex");
    }
  },
  activeBtn(allTasks,completed) {
    for (let i=0; i<allTasks.length; i++) {
      allTasks[i].setAttribute("style","display:flex");
    }
    for (let i=0; i<completed.length; i++) {
      completed[i].setAttribute("style","display: none")
    }
  },
  completedBtn(allTasks,completed) {
      for (let i=0; i<allTasks.length; i++) {
        allTasks[i].setAttribute("style","display:none");
      }
      for (let i=0; i<completed.length; i++) {
        completed[i].setAttribute("style","display:flex");
      }
  }
}

buttonFunctions.newSelected();




addEventListener('keypress', (e) => { //press entner
  if (e.key === "Enter") {
    formFunctions.addTask();
    formFunctions.remaining();
  }
})
addEventListener('click', (e) => { // click "+" button
  if (e.target === addBtn) {
    formFunctions.addTask();
    formFunctions.remaining();
  }
})
