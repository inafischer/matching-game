// Global variables

const openCards = [];
let timer;

// Entry point called when page is loaded

document.addEventListener("DOMContentLoaded", function(event) {
  const cards = document.querySelector('.deck');
  shuffle(cards);
  cards.addEventListener('click', cardListener);
  const refresh = document.querySelector('.restart');
  timer = startTimer();
  refresh.addEventListener('click', refreshListener);
});

// Event listeners

function refreshListener(event) {
  const cards = document.querySelector('.deck');
  shuffle(cards);
  for (let i = 0; i < cards.children.length; i++) {
    const card = cards.children[i];
    resetCard(card);
  }
  resetMoves();
  resetRating();
  clearInterval(timer);
  startTimer();
}

function cardListener(event) {
  const element = event.target;
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

// Gameplay functions

function startTimer(){
    let sec = 0;
    document.getElementById('gameTimerDisplay').innerHTML = '0 seconds';
    const timer = setInterval(function(){
        const time = sec + (sec == 1 ?' second':' seconds');
        document.getElementById('gameTimerDisplay').innerHTML = time;
        sec++;
    }, 1000);
    return timer;
}

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

function addOpenCard(card) {
  openCards.push(card);

  if (openCards.length > 1) {
      const firstCard = openCards.pop();
      const secondCard = openCards.pop();
      if (getIcon(firstCard) == getIcon(secondCard)) {
        lockOpenCard(firstCard);
        lockOpenCard(secondCard);
      } else {
        setTimeout(function() {
          resetCard(firstCard);
          resetCard(secondCard);
        }, 500);
      }
      increaseMoves();
      checkWinner();
      lowerStarRating();
  }
}

function getIcon(card) {
  return card.children[0].classList[1];
}

// Shuffle function from https://stackoverflow.com/a/11972692
function shuffle(cards) {
  for (let i = cards.children.length; i >= 0; i--) {
     cards.appendChild(cards.children[Math.random() * i | 0]);
  }
}

//scoring functions

function increaseMoves() {
  const moves = document.querySelector('.moves');
  moves.textContent = parseInt(moves.textContent) + 1;
}

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

function resetMoves() {
  const moves = document.querySelector('.moves');
  moves.textContent = 0;
}

//winning functions

function checkWinner() {
  const winner = document.querySelectorAll('.match');
  const cards = document.querySelectorAll('.card');

  if (winner.length === cards.length) {
    clearInterval(timer);
    const star = getStars();
    const time = getTime();
    const newGame = confirm("You win! Your star rating was " + star + " " + ((star == 1) ? "star":"stars") +
      " and it took you " + time +
      "! Would you like to play another game?");
    if(newGame) {
      refreshListener();
    }
  }
}

function getStars() {
  return document.querySelector('.stars').children.length;
}

function getTime() {
  return document.getElementById('gameTimerDisplay').textContent;
}
