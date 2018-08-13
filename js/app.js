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
  card.classList.remove('match');
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

  if (winner.length === cards.length) {
    alert("You're a winning weenie!");
  }
}

// Star rating
function lowerStarRating () {
  const rating = document.querySelector('.stars');
  const moves = parseInt(document.querySelector('.moves').textContent);
  if (moves >= 5 && rating.children.length > 1) {
    rating.removeChild(rating.children[rating.children.length - 1]);
  }
}

function resetRating() {
  const rating = document.querySelector('.stars');
  for (let stars = rating.children.length; stars <= 2; stars++) {
    const star = document.createElement('li');
    star.innerHTML = '<i class="fa fa-star"></i>';
    rating.appendChild(star);
  }
}

const openCards = [];

function addOpenCard(card) {
  openCards.push(card);

  if (openCards.length > 1) {
      var firstCard = openCards.pop();
      var secondCard = openCards.pop();
      if (getIcon(firstCard) == getIcon(secondCard)) {
        lockOpenCard(firstCard);
        lockOpenCard(secondCard);
      } else {
        resetCard(firstCard);
        resetCard(secondCard);
      }
      increaseMoves();
      checkWinner();
      lowerStarRating();
  }
}

function getIcon(card) {
  return card.children[0].classList[1];
}

function cardListener(event) {
  var element = event.target;
  if(element.classList.contains('card')
    && !element.classList.contains('match')
    && !element.classList.contains('open') ) {
    displaySymbol(element);
    addOpenCard(element);
  }
  else {
    console.log('clicked the deck');
  }
}

// Shuffle function from https://stackoverflow.com/a/11972692
function shuffle(cards) {
  for (var i = cards.children.length; i >= 0; i--) {
     cards.appendChild(cards.children[Math.random() * i | 0]);
  }
}
 // entry point
document.addEventListener("DOMContentLoaded", function(event) {
  const cards = document.querySelector('.deck');
  shuffle(cards);
  cards.addEventListener('click', cardListener);
  const refresh = document.querySelector('.restart');
  refresh.addEventListener('click', refreshListener);
});

function resetMoves() {
  const moves = document.querySelector('.moves');
  moves.textContent = 0;
}

// Add refresh
function refreshListener(event) {
  const cards = document.querySelector('.deck');
  shuffle(cards);
  for (let i = 0; i < cards.children.length; i++) {
    const card = cards.children[i];
    resetCard(card);
  }
  resetMoves();
  resetRating();
}
