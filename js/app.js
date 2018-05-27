// List of all cards
const allCards = ['fa-diamond','fa-diamond',
              'fa-paper-plane-o','fa-paper-plane-o',
              'fa-anchor','fa-anchor',
              'fa-bolt','fa-bolt',
              'fa-cube','fa-cube',
              'fa-leaf','fa-leaf',
              'fa-bicycle','fa-bicycle',
              'fa-bomb','fa-bomb'
              ];

// Keep track of cards flipped
let flippedCards = [];

// Moves variables
let moves = 0;
let counter = document.querySelector(".moves");

// Star Icons
const stars = document.querySelectorAll('.fa-star');

//Load New Game
newGame();

 /*   - shuffle the list of cards using the provided "shuffle" method below*/
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

//Create card HTML
function makeCard(card) {
  return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
}

//Make card grid dynamically
function newGame(){
  let deck = document.querySelector('.deck');
  let cardGrid = shuffle(allCards).map(function(card) {
    return makeCard(card);
  });
  deck.innerHTML = cardGrid.join('');
}

// Counts the moves player makes
function moveCounter(){
  moves++;
  counter.innerHTML = moves;

  //Star rating handler
  //if player has more than 8 moves, delete a star
  if (moves > 8 && moves < 15) {
    for (i=0; i < 3; i++) {
      if (i > 1) {
        stars[i].style.visibility = 'collapse';
      }
    }
  //if player has more than 16 moves, delete a star
} else if (moves > 16){
    for (i=0; i<3; i++){
      if(i > 0){
        stars[i].style.visibility = 'collapse';
      }
    }
  }
}

//Check to see if cards match
function cardMatch(){
  flippedCards[0].classList.add('match');
  flippedCards[0].classList.add('open');
  flippedCards[0].classList.add('show');

  flippedCards[1].classList.add('match');
  flippedCards[1].classList.add('open');
  flippedCards[1].classList.add('show');
}

// If cards do not match
function notMatching(){
  //Flip over after 800ms
  setTimeout(function(){
    for (let card of flippedCards){
      card.classList.remove('open','show');
    }
    flippedCards = []; //Empty flippedCards array
   }, 800);
}

//Event listener if a card is clicked
let cardList = document.querySelectorAll('.card');

for(let card of cardList) {
  card.addEventListener('click', function(flipCard){
    //Disable clicking on the same card
    if (!card.classList.contains('open') &&     !card.classList.contains('show') && !card.classList.contains('match')){

    //Add the card to a *list* of "open" cards
    flippedCards.push(card);

    //Prevent from flipping more than two cards
    if (flippedCards.length > 2){
        //hide
    } else {
        //Show cards
        card.classList.add('open','show');
        //Check if cards match
        if (flippedCards[0].dataset.card ==   flippedCards[1].dataset.card){
            moveCounter();
            cardMatch();
            //empty flippedCards array
            flippedCards = [];
          } else {
            moveCounter();
            notMatching();
          }
      }
  }
});
  //empty flippedCards array
  flippedCards = [];
//end
}
