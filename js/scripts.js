var intervalInstance;
var stopGame;
var currentState;
var newGameState;
var myIntervalInstance;
var limit = 0;
var nameGameState = [109,115,117,124,139,159,160,164,165,174,189,209,211,213,215,217,220,221,222,224,230,231,235,236,237,239,259,262,265,267,269,274,275,276,279,282,287,289,309,315,317,319,324,327,329,330,331,332,335,336,337,339,359,365,367,369,374,377,379,384,387,389,409,415,417,420,421,422,424,427,430,431,432,435,436,437,440,559,565,572,575,609,615,622,625,637,659,665,668,669,670,672,675,679,680,684,685,687,688,689,709,712,715,720,722,725,728,731,733,737,759,761,763,765,768,769,770,772,775,778,779,780,781,783,787,809,810,814,815,817,820,822,825,828,833,837,859,865,868,869,870,873,876,879,880,881,883,888,889];


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
