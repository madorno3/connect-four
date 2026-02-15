/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

var WIDTH = 7;
var HEIGHT = 6;

var currPlayer = 1; // active player: 1 or 2
var board = []; // array of rows, each row is array of cells  (board[y][x])
let gameOver = false;

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard(rows,cols) {
  
  for(let i=0; i < rows; i++){
    let row = [];
    for(let cell=0; cell < cols; cell++){
      // let containsPiece = null;
      row.push(null);
    }
    board.push(row);
  }
  return board;

  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
}


/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  let htmlBoard = document.getElementById("board");
  var top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (var x = 0; x < WIDTH; x++) {
    var headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // creating html rows in the first loop and td as cells in the second one
  // appending cells to the rows and rows to the html board
  for (var y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (var x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(col) {
  // start from the bottom row and move up
  for (let i = board.length - 1; i >= 0; i--) {
    if (board[i][col] === null) {
      return i; 
    }
  }
  return null; 
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const gamePiece = document.createElement("div");
  if(currPlayer === 1) {
    gamePiece.className = "player1-piece";
  } else{
    gamePiece.className = "player2-piece";
  }

  const cell = document.getElementById(`${y}-${x}`); 
  console.log(cell);
  cell.appendChild(gamePiece);

}

/** endGame: announce game end */

function endGame(msg) {
  gameOver = true;
  alert(`Congratulations Player ${currPlayer}, you won!`);
  console.log("end of game");
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  // column that was clicked

  if (gameOver) return;

  var x = +evt.target.id;

  // get next spot in column 
  var y = findSpotForCol(x);

  if (y === null) return;

  board[y][x] = currPlayer;
  console.log(board);

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  if(currPlayer === 1) {
    currPlayer = 2 ;
    
  } else {
    currPlayer = 1;
    
  }

  console.log(`The current player is: ${currPlayer}`);

}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard(HEIGHT,WIDTH);
makeHtmlBoard();
findSpotForCol();
