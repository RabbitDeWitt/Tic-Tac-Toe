const tiles = Array.from(document.querySelectorAll('.tile'));
const currentPlayer = document.querySelector('.display-player');

let isXturn = true;

function placeMark(tile, classToAdd){
  tile.classList.add(classToAdd);
}

function swapPlayer(classToAdd){
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
  placeMark(tile, classToAdd);
  swapPlayer(classToAdd);
}

for(let tile of tiles){
  tile.addEventListener('click', handleClick, {once: true});
}