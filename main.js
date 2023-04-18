/*----- constants -----*/
const COLORS = {
    "-1": 'purple',
    "1": 'hotpink',
    "0": 'black'

};


/*----- state variables -----*/
let board //3 x 3 array
let turn //1 or -1
let winner //null = no winner, 1 or -1 = winner, t = tie;

/*----- cached elements  -----*/
const playAgainBtn = document.querySelector('button');
const markerEls = [...document.querySelectorAll('#board > div')];
const messageEl = document.querySelector('h1');

/*----- event listeners -----*/

document.getElementById('board').addEventListener('click', playerMove);
playAgainBtn.addEventListener('click', init);


/*----- functions -----*/
//initialize all states, then call render();
function init() {
    board = [
        [0,0,0],
        [0,0,0],
        [0,0,0],
    ];
    turn = 1;
    winner = null;
    render();
}

function playerMove(evt) {
    const colIdx = markerEls.indexOf(evt.target);
    // Guards...
   
    
    if (colIdx === -1 || winner) return;
    console.log(colIdx);
    
    //have to find the rowIdx, Im sure there was a more elegant way
    let sRowIdx = markerEls[colIdx].getAttribute("id")[2];
    let numRowIdx = Number(sRowIdx);
    let sColIdx = markerEls[colIdx].getAttribute("id")[0];
    let numColIdx = Number(sColIdx);

    // Update the board state with the cur player value (turn)
    if (board[numColIdx][numRowIdx] === 0) {
        board[numColIdx][numRowIdx] = turn;
    } else {
        return;
    };
  
    

    // Check for winner
    
    winner = getWinner(numColIdx, numRowIdx);
    checkForTie();
    render();
    turn *= -1;
    
  }







//render function below
function render() {
    renderBoard();
    renderMessage();
    playAgainBtn.disabled = true;
    renderControls();
};

function renderBoard() {
    board.forEach(function(colArr, colIdx){
        colArr.forEach(function(cellVal, rowIdx){
            const cellId = `${colIdx},${rowIdx}`;
            const cellEl = document.getElementById(cellId);
            cellEl.style.backgroundColor = COLORS[cellVal];
        })
    })
}


function renderMessage() {
    if (winner === 't') {
        messageEl.innerText = "It's a Tie!!!";
    } else if (winner) {
        messageEl.innerHTML = `<span style="color: ${COLORS[winner]}">${COLORS[winner].toUpperCase()}</span> Wins!`;
    } else {
        // Game is in play
        messageEl.innerHTML = `<span style="color: ${COLORS[turn]}">${COLORS[turn].toUpperCase()}</span>'s Turn`;
    }
}

function renderControls() {
    if (winner) {
        playAgainBtn.disabled = false
    }
}

function getWinner(colIdx, rowIdx) {
    return checkVerticalWin(colIdx, rowIdx) ||
      checkHorizontalWin(colIdx, rowIdx) ||
      checkDiagonalWinNESW(colIdx, rowIdx) ||
      checkDiagonalWinNWSE(colIdx, rowIdx); 
  }
  
  function checkDiagonalWinNWSE(colIdx, rowIdx) {
    const adjCountNW = countAdjacent(colIdx, rowIdx, -1, 1);
    const adjCountSE = countAdjacent(colIdx, rowIdx, 1, -1);
    return (adjCountNW + adjCountSE) >= 2 ? board[colIdx][rowIdx] : null;
  }

  function checkDiagonalWinNESW(colIdx, rowIdx) {
    const adjCountNE = countAdjacent(colIdx, rowIdx, 1, 1);
    const adjCountSW = countAdjacent(colIdx, rowIdx, -1, -1);
    return (adjCountNE + adjCountSW) >= 2 ? board[colIdx][rowIdx] : null;
  }

  function checkHorizontalWin(colIdx, rowIdx) {
    const adjCountLeft = countAdjacent(colIdx, rowIdx, -1, 0);
    const adjCountRight = countAdjacent(colIdx, rowIdx, 1, 0);
    return (adjCountLeft + adjCountRight) >= 2 ? board[colIdx][rowIdx] : null;
  }

  function checkVerticalWin(colIdx, rowIdx) {
    const adCountDown = countAdjacent(colIdx, rowIdx, 0, -1);
    const adCountUp = countAdjacent(colIdx, rowIdx, 0, 1) ;
    return (adCountDown + adCountUp) >= 2 ? board[colIdx][rowIdx] : null;
  }

  function countAdjacent(colIdx, rowIdx, colOffset, rowOffset) {
    const player = board[colIdx][rowIdx];
    let count = 0;
    colIdx += colOffset;
    rowIdx += rowOffset;
    while (
      // Ensure colIdx is within bounds of the board array
      board[colIdx] !== undefined &&
      board[colIdx][rowIdx] !== undefined &&
      board[colIdx][rowIdx] === player
    ) {
      count++;
      colIdx += colOffset;
      rowIdx += rowOffset;
    }
    return count;
  }

//   function checkForTie() {
//     board.forEach(function(colArr, i){
//         colArr.forEach(function(cellVal, j){
//             if (board[i][j] === 0) {
//                 console.log("something is working");
//                 return;
//             }
//         });
//     });
//     console.log("it did not work")
//     // winner = 't';
//     // render();
//     // return;
// }

function checkForTie() {
    for (let i = 0; i < board.length; i++) {
        colArr = board[i];
        for (let j = 0; j < colArr.length; j++) {
            cellVal = colArr[j];
            if (cellVal === 0) {
                return;
            }
        }
    }

    winner = 't';
    return;
}





  

