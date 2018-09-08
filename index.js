// INSTRUCTIONS: Build a command-line based zombie fighting game. 
// =========================================================================================================

// In this game, you and a zombie will each be given a certain amount of health. (Perhaps: You 70, Zombie 15).
// For each round, you will be asked to guess a random number between 1 and 5.
// If your guess matches the random number of the Zombie -- you inflict a random amount of damage between 1 and 5. 
// If you guess does not match the random number of the Zombie -- the Zombie inflicts a random amount of damage to you between 1 and 5.
// Each round the zombie is given a new random number and you must guess again. 

// The game ends when you or the zombie gets to 0 health. 

// Note: You should use the inquirer package to take in user commands.
// Major Warning: inquirer's prompt function is "asynchronous", which means that the majority of your game logic will need to be inside the .then() function for your prompt. 

// ===========================================================================================================

var inquirer = require('inquirer');
var userHealth = 20;
var zombieHealth = 15;

function checkRound() { 

  if (userHealth <= 0) {
    console.log("###############################################");
    console.log("");
    console.log("Game over dude. It looks like you’re dead.");
    console.log("");
    console.log("###############################################");
    process.exit()
  }

  if (zombieHealth <= 0) {
    console.log("###############################################");
    console.log("");
    console.log("Victory! You defeated the Zombie and survived");
    console.log("");
    console.log("###############################################");
    process.exit()
  }
    
  playRound()
}

function playRound() {
  inquirer
  .prompt([{
    "type": "list" ,
    "message": "Try to stay alive, guess a number between 1 through 5." ,
    "choices": ["1" ,"2", "3", "4", "5"],
    "name": "userGuest"
  }])
  .then(answers => {
    if (userHealth > 0 || zombieHealth > 0) {
      let damage  = Math.floor(Math.random() * 5) + 1;
      let zombieNum = Math.floor(Math.random() * 5) + 1;
      console.log("Zombie rolled " + zombieNum)

      if (zombieNum === parseInt(answers.userGuest)) {
        zombieHealth -= damage;
        console.log("YOU HIT THE ZOMBIE WITH " + damage + " damage");
        console.log("You have " + userHealth + " health left. The Zombie has " + zombieHealth + " health left.");

        checkRound();
      } else {
        userHealth -= damage;
        console.log("OH NO! The zombie slashed you with " + damage + " damage");
        console.log("You have " + userHealth + " health left. The Zombie has " + zombieHealth + " health left.");
        checkRound();
      }
    }
  });
}

playRound()
