var boardSize = document.querySelector('.size--input');
var intervalInstance;
var stopGame;
var currentState;
var newGameState;

if(!boardSize.value){
  boardSize = 50;
}

document.querySelector('.size--input').addEventListener('blur', function(e){
  if(!e.target.value){
    return;
  }
  var myBoard = document.getElementById('gameBoard');
  boardSize = e.target.value;
  document.body.removeChild(myBoard);
  createBoard(boardSize);
});

document.querySelector('.size--input').addEventListener('keydown', function(e){
  if(e.keyCode === 13 && e.target.value){
    var myBoard = document.getElementById('gameBoard');
    boardSize = e.target.value;
    document.body.removeChild(myBoard);
    createBoard(boardSize);
  }
});

function createBoard (size){
  var myBoard = document.createElement('table');
  myBoard.id = 'gameBoard';
  for(var i = 0; i < size; i++){
    var tableRow = document.createElement('tr');
    for(var j = 0; j < size; j++){
      var tableCell = document.createElement('td');
      tableCell.className = 'table--cell';
      tableRow.appendChild(tableCell);
    }
    myBoard.appendChild(tableRow);
  }
  document.body.appendChild(myBoard);

  document.getElementById('gameBoard').addEventListener('click', function(e){
    if(e.target.classList.contains('table--cell')){
      e.target.classList.add('alive');
    }
  });
}

createBoard(boardSize);

document.querySelector('.start--button').addEventListener('click', function(e){
  stopGame = false;

  document.querySelectorAll('.table--cell').forEach(function(element){
    element.style.border = "none";
    element.style.borderRadius = "100%";
  });

  gameOfLife();
});

document.querySelector('.stop--button').addEventListener('click', function(e){
  stopGame = true;

  document.body.removeChild(document.querySelector('#gameBoard'));

  createBoard(boardSize);
});

function gameOfLife(){
  intervalInstance = setInterval(checkCells, 250);
}

function checkCells(){
  if(stopGame){
    clearInterval(intervalInstance);
  } else {
    currentState = document.getElementsByClassName('table--cell');
    newGameState = [];
    for(var i = 0; i < currentState.length; i++){
      var currentCell = currentState[i];
      if(currentCell.classList.contains('alive')){
        checkRulesForLiveCell(currentCell, i);
      } else checkRulesForDeadCell(currentCell, i);
    }

    for(var j = 0; j < currentState.length; j++){
      document.getElementsByClassName('table--cell')[j].outerHTML = newGameState[j].outerHTML;
    }
  }

}

function checkRulesForDeadCell(element, index){
  var myElement = element.cloneNode(true);

  var numForNeighbors = checkNeighbors(index);

  if(numForNeighbors === 3){
    myElement.classList.add('alive');
  }

  newGameState.push(myElement);
}

function checkRulesForLiveCell(element, index){
  var newElement = element.cloneNode(true);

  var numberOfNeighbors = checkNeighbors(index);
  if(numberOfNeighbors < 2){
    newElement.classList.remove('alive');
  } else if(numberOfNeighbors > 3){
    newElement.classList.remove('alive');
  }

  newGameState.push(newElement);
}

function checkNeighbors(index){
  var liveNeighbors = 0;

  // North Neighbor
  if(document.getElementsByClassName('table--cell')[index - boardSize] && document.getElementsByClassName('table--cell')[index - boardSize].classList.contains('alive')){
    liveNeighbors += 1;
  }

  // North East Neighbor
  if(document.getElementsByClassName('table--cell')[index-(boardSize - 1)] && document.getElementsByClassName('table--cell')[index-(boardSize - 1)].classList.contains('alive')){
    liveNeighbors += 1;
  }

  // North West Neighbor
  if(document.getElementsByClassName('table--cell')[index-(boardSize + 1)] && document.getElementsByClassName('table--cell')[index-(boardSize + 1)].classList.contains('alive')){
    liveNeighbors += 1;
  }

  // East Neighbor
  if(document.getElementsByClassName('table--cell')[index + 1] && document.getElementsByClassName('table--cell')[index + 1].classList.contains('alive')){
    liveNeighbors += 1;
  }

  // West Neighbor
  if(document.getElementsByClassName('table--cell')[index - 1] && document.getElementsByClassName('table--cell')[index - 1].classList.contains('alive')){
    liveNeighbors += 1;
  }

  // South Neighbor
  if(document.getElementsByClassName('table--cell')[index + boardSize] && document.getElementsByClassName('table--cell')[index + boardSize].classList.contains('alive')){
    liveNeighbors += 1;
  }

  // South East Neighbor
  if(document.getElementsByClassName('table--cell')[index + (boardSize - 1)] && document.getElementsByClassName('table--cell')[index + (boardSize - 1)].classList.contains('alive')){
    liveNeighbors += 1;
  }

  // South West Neighbor
  if(document.getElementsByClassName('table--cell')[index + (boardSize + 1)] && document.getElementsByClassName('table--cell')[index + (boardSize + 1)].classList.contains('alive')){
    liveNeighbors += 1;
  }

  return liveNeighbors;
}
