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

// This is a helper function, to get a random option from CHOICES array
// iT WILL HELP OUR AI to make random CHOICES in the game.
function random_choice() {
  const idx = Math.floor(Math.random() * 3);
  return CHOICES[idx];
}

// An Object Constructor function, to onboard players in the game
function INITIATE_PLAYER(name, score = 0, move = random_choice) {
  this.name = name;
  this.score = score;
  this.move = move;
}

// fight, this function takes two object and cros their moves
// based on that it updates score
function fight(player1, player2) {
  const p1move = player1.move;
  const p2move = player2.move();
  //
  // If both moves are equal then its a draw
  if (p1move == p2move) {
    player1.score++;
    player2.score++;
  } else {
    const player1pt = CHOICES.indexOf(p1move);
    const player2pt = CHOICES.indexOf(p2move);
    const res = player2pt - player1pt;
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

// ============ LOGIC ================
