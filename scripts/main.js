// DATE : 18TH OCT 2024
// PROJECT - ROCK, PAPER AND SCISSORS GAME (A part of projects of The Odin Project)
// DESCRIPTION -
// Rock, Paper, Scissors: a classic hand game usually played between two people.
// Each player simultaneously forms one of three shapes with their hand:

//   # Rock (a fist) crushes Scissors
//   # Scissors (a fist with the index and middle fingers extended) cuts Paper
//   # Paper (a flat hand) covers Rock

// If both players choose the same shape, the game is a tie.
// Simple, strategic, and always a bit of fun! Want to play a round? 😏

// Author - Priyanshu Kumar
// ============================================================================================

// ============ HELPER AND GAME LOGIC FUNCTION DECLARATION ================

// GLOBAL ARRAY FOR ROCK PAPER AND SCISSORS
const CHOICES = ["r", "p", "s"];
// Here 'rock = 0, paper = 1, scissors = 2'

// This is a helper function, to get a random option from CHOICES array
// iT WILL HELP OUR AI to make random CHOICES in the game.
function random_choice() {
  return Math.floor(Math.random() * 3);
}

// An Object Constructor function, to onboard players in the game
function INITIATE_PLAYER(name, score = 0, move = 0) {
  this.name = name;
  this.score = score;
  this.move = move;
}

// fight, this function takes two object and cros their moves
// based on that it updates score
function fight(player1, player2) {
  const p1move = player1.move;
  const p2move = player2.move;
  //
  // If both moves are equal then its a draw
  if (p1move == p2move) {
    player1.score++;
    player2.score++;
  } else {
    const res = p2move - p1move;
    if (res == 1 || res == -2) {
      player2.score++;
    } else if (res == -1 || res == 2) {
      player1.score++;
    }
  }
}

// as program says it only checks for winner;
// if any player has 3 score he/she/it will win the game
// other wise this function will return false means no one
// won the game till now
function checkWinner(player1, player2) {
  if (player1.score >= 3) {
    return player1;
  } else if (player2.score >= 3) {
    return player2;
  } else {
    return false;
  }
}

// ====================================================================
//
// ================ LOGIC ================
// ================ LOGIC ================
// ================ LOGIC ================
//
// ------------variables--------------
const filepath = "./images/";
const images = CHOICES.map((item) => {
  const image = new Image();
  image.src = filepath + item + ".png";
  return image;
});
// Do  INITIATE_PLAYER
const computer = new INITIATE_PLAYER("AI");
const player = new INITIATE_PLAYER("new_player");

//=========== DOM OBJECT DECLARATION =================
const registration_form = document.querySelector(".registration");
const choice_form = document.querySelector(".choice");
const game_area = document.querySelector("main");
const header = document.querySelector("header");

// 1. Player visit the page and he saw the PLAYER REGISTRATION page.
//   The PLAYER REGISTRATION page has 1 things,
//     1. name (Optional because it can be generated randomly if user doesn't provide ),
//     3. play (which starts the game)
//

// AS SOON document LOADS IT POPUP THE REGISTRATION FORM
document.addEventListener("DOMContentLoaded", function () {
  registration_form.parentElement.classList.remove("hidden");
  registration_form.classList.remove("hidden");
});

// 2. as soon as game starts REGISTRATION popup closes and a new popup emerges
//    which asks for a choices among rock paper and scissors
registration_form.addEventListener("submit", function (e) {
  e.preventDefault();
  player.name = this[0].value || "new_player";
  this.classList.add("hidden");
  choice_form.classList.remove("hidden");
});

// 3. As user clicks on any option it start a chain process of computer's
//    choice and your choice, it initiate loading animation
const inputs = choice_form.querySelectorAll("input");
inputs.forEach((input) => {
  input.addEventListener("click", (e) => {
    e.stopPropagation();
    // assigning based on player move and also make computer take a move
    player.move = Number(e.target.value);
    computer.move = random_choice();

    // close the form
    choice_form.classList.add("hidden");
    choice_form.parentElement.classList.add("hidden");
    game_area.classList.remove("hidden");
    header.classList.remove("hidden");

    // Update and load moves data
    const user_move_image = game_area.querySelector(".user img");
    const ai_move_image = game_area.querySelector(".ai img");
    const player_idx = player.move;
    const computer_idx = computer.move;
    user_move_image.src = images[player_idx].src;
    ai_move_image.src = images[computer_idx].src;
    // 4. once the animation is loaded it compares both and update score of the user.
    console.log("before fight", player, computer);
    fight(player, computer);
    console.log("after fight", player, computer);

    const player_score = header.querySelector(".user .score");
    const ai_score = header.querySelector(".ai .score");
    player_score.innerText = player.score;
    ai_score.innerText = computer.score;
  });
});
// 5. once score is updates it checks for the winner, if it false then
//   game continues as it is.
