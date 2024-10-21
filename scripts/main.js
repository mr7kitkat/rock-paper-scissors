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

// ============ HELPER FUNCTION DECLARATION ================

// Here 'rock = 0, paper = 1, scissors = 2'
// This is a helper function
// iT WILL HELP OUR AI to make random CHOICES in the game.
const random_choice = () => Math.floor(Math.random() * 3);

// An Object Constructor function, to onboard players in the game
// YOU NEED only name to onboard a player -
// const new_player = new INITIATE_PLAYER(somename);
function INITIATE_PLAYER(name, score = 0, move = 0) {
  this.name = name;
  this.score = score;
  this.move = move;
}

// fight, this function takes two object and cros their moves
// based on that it updates score
function fight(player1, player2) {
  // Here 'rock = 0, paper = 1, scissors = 2'
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
  let win_condition = 3;

  if (player1.score == player2.score) {
    win_condition++;
  }

  if (player1.score >= win_condition) {
    return player1;
  } else if (player2.score >= win_condition) {
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

// Make image cache so that browser doest have to make
// seqencial requests
const filepath = "./images/";
const images = ["r", "p", "s"].map((item) => {
  const image = new Image();
  image.src = filepath + item + ".png";
  return image;
});
``;

// animation ------------
function show_component(DOM_Node) {
  DOM_Node.classList.remove("hidden");
}

function hide_component(DOM_Node) {
  DOM_Node.classList.add("hidden");
}

// Onboarding players  INITIATE_PLAYER
const computer = new INITIATE_PLAYER("AI");
const player = new INITIATE_PLAYER("new_player");

//=========== DOM OBJECT DECLARATION =================
// popup components
const main_popup = document.querySelector(".popup");
const registration_form = main_popup.querySelector(".registration");
const choice_form = main_popup.querySelector(".choice");
// winner
const winner_popup = document.querySelector(".show-winner");
const winner_name = winner_popup.querySelector(".name");
const next_game = winner_popup.querySelector(".nextGame");
// board section
const game_area = document.querySelector("main");
const header = document.querySelector("header");
const continue_game = document.querySelector(".continue");

// 1. Player visit the page and he saw the PLAYER REGISTRATION page.
//   The PLAYER REGISTRATION page has 1 things,
//     1. name (Optional because it can be generated randomly if user doesn't provide ),
//     3. play (which starts the game)
//
// AS SOON document LOADS IT POPUP THE REGISTRATION FORM
document.addEventListener("DOMContentLoaded", function () {
  show_component(main_popup);
  show_component(registration_form);
});

// 2. as soon as game starts REGISTRATION popup closes and a new popup emerges
//    which asks for a choices among rock paper and scissors
registration_form.addEventListener("submit", function (e) {
  e.preventDefault();
  player.name = this[0].value || "new_player";
  hide_component(this);
  show_component(choice_form);
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

    // close the form and show game zone
    hide_component(choice_form);
    hide_component(main_popup);
    show_component(game_area);
    show_component(header);

    // Update and load moves data
    const user_move_image = game_area.querySelector(".user img");
    const ai_move_image = game_area.querySelector(".ai img");
    const player_idx = player.move;
    const computer_idx = computer.move;
    user_move_image.src = images[player_idx].src;
    ai_move_image.src = images[computer_idx].src;
    // 4. once the animation is loaded it compares both and update score of the user.
    fight(player, computer);

    // updating user score
    const player_score = header.querySelector(".user .score");
    const ai_score = header.querySelector(".ai .score");
    player_score.innerText = player.score;
    ai_score.innerText = computer.score;

    // 5. once score is updates it checks for the winner, if it false then
    //   game continues as it is.
    continue_game.addEventListener("click", function (e) {
      e.stopImmediatePropagation();
      const result = checkWinner(player, computer);
      if (result == false) {
        // close the form and show game zone
        show_component(choice_form);
        show_component(main_popup);
        hide_component(game_area);
      }
      if (result.hasOwnProperty("name")) {
        winner_name.innerText = result.name;
        hide_component(header);
        hide_component(game_area);
        show_component(main_popup);
        show_component(winner_popup);
      }
    });
  });
});

// Next game part
next_game.addEventListener("click", function () {
  // Setting values to default
  player.move = 0;
  player.score = 0;
  computer.move = 0;
  computer.score = 0;

  // hidding components
  hide_component(winner_popup);
  show_component(choice_form);
});
