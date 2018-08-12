/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
function displaySymbol(card) {
  card.classList.add('open');
  card.classList.add('show');
}

function resetCard(card) {
  card.classList.remove('open');
  card.classList.remove('show');
}

function lockOpenCard(card) {
  resetCard(card);
  card.classList.add('match');
}

function increaseMoves() {
  const moves = document.querySelector('.moves');
  moves.textContent = parseInt(moves.textContent) + 1;
}

function checkWinner() {
  const winner = document.querySelectorAll('.match');
  const cards = document.querySelectorAll('.card');
  console.log(winner.length);
  console.log(cards.length);
  if (winner.length === cards.length) {
    alert("You're a winning weenie!");
  }
}


const openCards = [];

function addOpenCard(card) {
  openCards.push(card);
  console.log(openCards);
  if (openCards.length > 1) {
      if (openCards[0].children[0].classList[1] == openCards[1].children[0].classList[1]) {
        lockOpenCard(openCards.pop());
        lockOpenCard(openCards.pop());
      } else {
        resetCard(openCards.pop());
        resetCard(openCards.pop());
      }
      increaseMoves();
      checkWinner();
  }
}

function cardListener(event) {
  if(event.target.classList.contains('card')) {
    console.log('clicked a card');
    console.log(event.target);
    displaySymbol(event.target);
    addOpenCard(event.target);
  }
  else {
    console.log('clicked the deck');
  }
}

 document.addEventListener("DOMContentLoaded", function(event) {
   const cards = document.querySelector('.deck');
   cards.addEventListener('click', cardListener);
});
