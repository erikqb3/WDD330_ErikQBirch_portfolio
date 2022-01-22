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
    yourAnswer = prompt("Wait! Are you actually going to play? [Y/N]");
    if ((yourAnswer === "Y") || (yourAnswer === "y")){
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
    const question = `What type is ${this.question.Pokemon}?`; //question object is in game obejct now
    const response = prompt(question);
    this.check(response);
  },
  check(response) {
    const answer = this.question.type;
    if (response === answer) {
      alert('Correct');
      this.score++;
    } 
    else {
      alert(`Wrong! The correct answer was ${answer}.`);
    }
  },
  gameOver() {
    alert(`Game Over! \nYou scored ${this.score} point${this.score !== 1 ? 's' : ''}`);
  }
}


game.start(quiz);