// View Object
const view = {
  score: document.querySelector('#score strong'),
  question: document.getElementById('question'),
  result: document.getElementById('result'),
  info: document.getElementById('info'),
  render(target,content,attributes) {
  for(const key in attributes) {
  target.setAttribute(key, attributes[key]);
  }
  target.innerHTML = content;
  }
};
  


    

const quiz = [ // totally separate from the game
  {Pokemon: "Pikachu",type: "Electric", },
  {Pokemon: "Pichu",type: "Electric", },
  {Pokemon: "Jigglypuff",type: "Normal", },
  {Pokemon: "Mewtwo",type: "Psychic",},
  {Pokemon: "Squirtle",type: "Water",},
  {Pokemon: "Ivysaur",type: "Grass and Poison",},
  {Pokemon: "Lucario", type: "Fighting and Steel"},
  {Pokemon: "Charizard",type: "Fire and Flying",},
  {Pokemon: "Greninja",type: "Water and Dark",},
  {Pokemon: "Incineroar",type: "Fire and Dark",}
  ];

const game = {
  wait() {
    this.continue = false;
    yourAnswer = prompt("Wait! Are you actually going to play? [Y/N]").toUpperCase();
    if (yourAnswer === "Y") {
      this.continue = true;
    }
    else{};
  },
  start(quiz) {
    this.wait();
    if (this.continue === false) {
      return;
    }
    else {};
    this.questions = [...quiz]; //puts every object from  quiz variable into an array
    this.score = 0; // this = game
    //main game loop
    for (const question of this.questions) {
      this.question = question; // puts array item into game object, 
      this.ask(); //no need to put in arguement because this.question
    }
    // end of main game loop
    this.gameOver();
  },
  ask() {
    const question = `What is ${this.question.name}'s real name?`;
    view.render(view.question,question);
    const response = prompt(question);
    this.check(response);
    }, 
  
  check(response) {
  const answer = this.question.realName;
  if(response === answer){
  view.render(view.result,'Correct!',{'class':'correct'});
  alert('Correct!');
  this.score++;
  view.render(view.score,this.score);
  } else {
  view.render(view.result,`Wrong! The correct answer was ${answer}`,{'class':'wrong'});
  alert(`Wrong! The correct answer was ${answer}`);
  }
  },
  
  gameOver(){
  view.render(view.info,`Game Over, you scored ${this.score} point${this.score !== 1 ? 's' : ''}`);
  }
}


game.start(quiz);