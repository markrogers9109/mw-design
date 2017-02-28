var boardSize = 50;
var intervalInstance;
var stopGame;
var currentState;
var newGameState;
var myIntervalInstance;
var limit = 0;
var nameGameState = [354, 360, 363, 372, 393, 404, 405, 409, 410, 422, 443, 454, 456, 458, 460, 463, 467, 468, 469, 472, 480, 481, 482, 487, 488, 489, 493, 504, 507, 510, 513, 516, 522, 523, 524, 525, 529, 533, 540, 543, 554, 560, 563, 566, 572, 576, 579, 580, 581, 582, 583, 587, 588, 589, 590, 593, 604, 610, 613, 616, 622, 626, 629, 636, 640, 643, 654, 660, 663, 667, 668, 669, 672, 676, 679, 680, 681, 682, 683, 687, 688, 689, 690, 694, 854, 860, 870, 874, 904, 910, 920, 924, 940, 954, 960, 964, 965, 966, 970, 974, 979, 980, 981, 986, 987, 990, 991, 992, 1004, 1010, 1017, 1020, 1024, 1028, 1032, 1035, 1040, 1054, 1057, 1060, 1064, 1065, 1066, 1067, 1070, 1074, 1078, 1079, 1080, 1081, 1082, 1085, 1090, 1104, 1106, 1108, 1110, 1113, 1117, 1120, 1124, 1128, 1135, 1140, 1155, 1159, 1164, 1165, 1166, 1167, 1171, 1175, 1178, 1179, 1180, 1181, 1182, 1185, 1190, 1191];


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
    for(var j = 0; j < size; j++){
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

createBoard(boardSize);
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
