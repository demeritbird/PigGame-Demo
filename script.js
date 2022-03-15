'use strict';

//for selection of all elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

const init = function () {
  //   score0El.textContent = 0;
  //   score1El.textContent = 0;

  //player initials (persistance)
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;

  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  playing = true;
};

init();

//function for switching player
const switchPlayer = function () {
  //switch to next player
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; //ternary operator here

  //it will toggle by adding and removing the in-line element
  //this switches the color brackground
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    // math random to get to 0-6, math trunc is to change to dec
    const dice = Math.trunc(Math.random() * 6) + 1;

    //to show all dice pngs.
    diceEl.classList.remove('hidden');

    //take note it is using `` keys, to get the f strings.
    diceEl.src = `img/dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      //current0El.textContent = currentscore;  removed since it cannot do for both players
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1. Add current score to active player's score
    //rmb that the scores are held by the array 'scores
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. Check if player's score is >= 100
    if (scores[activePlayer] >= 50) {
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      playing = false;
    } else {
      switchPlayer();
    }

    //finish the game
  }
});

btnNew.addEventListener('click', function () {
  init();
});
