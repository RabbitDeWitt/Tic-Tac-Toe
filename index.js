const tiles = Array.from(document.querySelectorAll('.tile'));
const currentPlayer = document.querySelector('.display-player');
const announcer = document.querySelector('.announcer');
const resetBtn = document.querySelector('.reset');

let isXturn = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [0, 4, 8]
]

let numberOfPlays = 0;


function startGame(){
  numberOfPlays = 0;
  for(let tile of tiles){
    tile.addEventListener('click', handleClick, {once: true});
  }
  resetBtn.addEventListener('click', resetGame, {once: true});
}

function endGame(isWin, currentPlayer) {
  if(isWin){
    announcer.innerHTML = `Player <span class = ${currentPlayer}> ${currentPlayer[currentPlayer.length - 1]}</span> Won!!!`;
    for(let tile of tiles){
      tile.removeEventListener('click', handleClick);
    }
  }else if(!isWin && numberOfPlays == 9){
    announcer.innerHTML = `Draw`;
  }
  announcer.classList.remove('hide');
}

function resetGame() {
  for(let tile of tiles){
    tile.classList.remove('playerX');
    tile.classList.remove('playerO');
  }
  announcer.classList.add('hide');
  announcer.innerHTML = ``;
  startGame();
}

function checkForWin(currentPlayer){
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return tiles[index].classList.contains(currentPlayer);
    });
  });
}

function placeMark(tile, classToAdd){
  tile.classList.add(classToAdd);
}

function swapPlayer(){
  isXturn = !isXturn;
  currentPlayer.classList.remove('playerX');
  currentPlayer.classList.remove('playerO');

  if(isXturn){
    currentPlayer.classList.add('playerX');
  }else{
    currentPlayer.classList.add('playerO');
  }
}

function handleClick(e){
  const tile = e.target;
  const classToAdd = isXturn ? 'playerX' : 'playerO';
  numberOfPlays++;
  placeMark(tile, classToAdd);

  if(numberOfPlays >= 5){
    endGame(checkForWin(classToAdd), classToAdd);
  }
  
  
  swapPlayer();
}


startGame()