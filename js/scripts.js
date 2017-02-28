var intervalInstance;
var stopGame;
var currentState;
var newGameState;
var myIntervalInstance;
var limit = 0;
var nameGameState = [59,65,67,74,89,109,110,114,115,124,139,159,161,163,165,167,170,171,172,174,180,181,185,186,187,189,209,212,215,217,219,224,225,226,229,232,237,239,259,265,267,269,274,277,279,280,281,282,285,286,287,289,309,315,317,319,324,327,329,334,337,339,359,365,367,370,371,372,374,377,380,381,382,385,386,387,390,509,515,522,525,559,565,572,575,587,609,615,618,619,620,622,625,629,630,634,635,637,638,639,659,662,665,670,672,675,678,681,683,687,709,711,713,715,718,719,720,722,725,728,729,730,731,733,737,759,760,764,765,767,770,772,775,778,783,787,809,815,818,819,820,823,826,829,830,831,833,838,839];


function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

shuffleArray(nameGameState);

function createName () {
  if(limit === nameGameState.length){
    clearInterval(myIntervalInstance);
    return;
  }
  myIntervalInstance = setInterval(createName, 175);
  document.getElementsByClassName('table--cell')[nameGameState[limit]].classList.add('alive');
  limit += 1;
};

function createBoard (size){
  var myBoard = document.createElement('table');
  myBoard.id = 'gameBoard';
  for(var i = 0; i < 20; i++){
    var tableRow = document.createElement('tr');
    for(var j = 0; j < 50; j++){
      var tableCell = document.createElement('td');
      tableCell.className = 'table--cell';
      tableRow.appendChild(tableCell);
    }
    myBoard.appendChild(tableRow);
  }
  document.getElementById('home').appendChild(myBoard);

  document.getElementById('gameBoard').addEventListener('click', function(e){
    if(e.target.classList.contains('table--cell') && !e.target.classList.contains('alive')){
      e.target.classList.add('alive');
    } else e.target.classList.remove('alive');
  });
}

createBoard();
createName();

document.querySelector('.start--button').addEventListener('click', function(e){
  stopGame = false;
  document.querySelectorAll('.button-container').forEach(function(element){
    element.style.top = "90vh";
  });

  gameOfLife();
});

document.querySelector('.stop--button').addEventListener('click', function(e){
  stopGame = true;

  window.location.reload();

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
