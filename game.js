const board = document.querySelector("#board");
const playerTurn = document.querySelector("#player-turn");
const WIDTH = 8;
let moveTurn = 1;
let currPlayer = "white";
playerTurn.textContent = currPlayer;

const starting_pos = [
  ROOK,
  KNIGHT,
  BISHOP,
  QUEEN,
  KING,
  BISHOP,
  KNIGHT,
  ROOK,
  PAWN,
  PAWN,
  PAWN,
  PAWN,
  PAWN,
  PAWN,
  PAWN,
  PAWN,
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  PAWN,
  PAWN,
  PAWN,
  PAWN,
  PAWN,
  PAWN,
  PAWN,
  PAWN,
  ROOK,
  KNIGHT,
  BISHOP,
  QUEEN,
  KING,
  BISHOP,
  KNIGHT,
  ROOK,
];

function createBoard() {
  starting_pos.forEach((piece, i) => {
    const div = document.createElement("div");
    div.innerHTML = piece;
    //div.textContent = i
    div.classList.add("square");
    //console.log(div.classList); //
    div.setAttribute("square-id", i);
    //div.setAttribute("draggable", true)

    const row = Math.floor((63 - i) / 8) + 1;

    if (row % 2 === 0) {
      div.classList.add(i % 2 === 0 ? "color1" : "color2");
    } else {
      div.classList.add(i % 2 === 0 ? "color2" : "color1");
    }

    if (i < 16) {
      div.firstChild.firstChild.classList.add("black");
    } else if (i > 47) {
      div.firstChild.firstChild.classList.add("white");
    }

    board.append(div);
  });
}

createBoard();

const allSquares = document.querySelectorAll("#board .square");

allSquares.forEach((square) => {
  square.addEventListener("dragstart", dragStart);
  square.addEventListener("drop", dragDrop);
  square.addEventListener("dragover", dragOver);
});

let startPosId;
let draggedElement;

function dragOver(element) {
  element.preventDefault();
}

function dragStart(element) {
  element.dataTransfer.effectAllowed = "move";

  startPosId = element.target.parentNode.getAttribute("square-id");
  draggedElement = element.target;

  // console.log(draggedElement);

  checkPieceMoves();
}

function dragDrop(element) {
  valids = document.querySelectorAll(".valid");
  valids.forEach((valid) => {
    valid.classList.remove("valid");
  });
  element.stopPropagation();
  //console.log(element.target);

  // take piece
  //element.target.parentNode.append(draggedElement)
  //element.target.remove()

  // move piece
  element.target.append(draggedElement);

  //changePlayer();
}

function changePlayer() {
  currPlayer === "white" ? (currPlayer = "black") : (currPlayer = "white");

  playerTurn.textContent = currPlayer;
  moveTurn++;
}

function checkPieceMoves() {
  startPosId = parseInt(startPosId);
  pieceType = draggedElement.id;
  let pieceColor = draggedElement.firstChild.classList[0];
  //let pieceColor = currPlayer;
  //console.log(startPosId);
  let validMoves = [];
 
  let rowNum = startPosId % 8;
  let colNum = Math.floor(startPosId / WIDTH);

  function checkRows() {
    let parseRowUp = startPosId;
    let parseRowDown = startPosId;

    while (parseRowUp >= 8) {
        if (allSquares[parseRowUp - 8].firstChild) {
            validMoves.push(allSquares[parseRowUp - 8]); // Append the first encountered piece
            break; // Exit the loop after encountering the first piece
        }
        validMoves.push(allSquares[parseRowUp - 8]); // Append empty squares
        parseRowUp -= 8;
    }

    while (parseRowDown < 56) {
        if (allSquares[parseRowDown + 8].firstChild) {
            validMoves.push(allSquares[parseRowDown + 8]); // Append the first encountered piece
            break; // Exit the loop after encountering the first piece
        }
        validMoves.push(allSquares[parseRowDown + 8]); // Append empty squares
        parseRowDown += 8;
    }
}

function checkCols() {
    let parseColLeft = startPosId;
    let parseColRight = startPosId;

    while (parseColLeft % 8 !== 0) {
        if (allSquares[parseColLeft - 1].firstChild) {
            validMoves.push(allSquares[parseColLeft - 1]); // Append the first encountered piece
            break; // Exit the loop after encountering the first piece
        }
        validMoves.push(allSquares[parseColLeft - 1]); // Append empty squares
        parseColLeft -= 1;
    }

    while ((parseColRight + 1) % 8 !== 0) {
        if (allSquares[parseColRight + 1].firstChild) {
            validMoves.push(allSquares[parseColRight + 1]); // Append the first encountered piece
            break; // Exit the loop after encountering the first piece
        }
        validMoves.push(allSquares[parseColRight + 1]); // Append empty squares
        parseColRight += 1;
    }
}

function checkDiagonals() {
    let topLeft = startPosId;
    let topRight = startPosId;
    let bottomLeft = startPosId;
    let bottomRight = startPosId;

    while (topLeft % 8 !== 0 && topLeft >= 8) {
        if (allSquares[topLeft - (WIDTH + 1)].firstChild) {
            validMoves.push(allSquares[topLeft - (WIDTH + 1)]); // Append the first encountered piece
            break; // Exit the loop after encountering the first piece
        }
        validMoves.push(allSquares[topLeft - (WIDTH + 1)]); // Append empty squares
        topLeft -= WIDTH + 1;
    }

    while ((topRight + 1) % 8 !== 0 && topRight >= 8) {
        if (allSquares[topRight - (WIDTH - 1)].firstChild) {
            validMoves.push(allSquares[topRight - (WIDTH - 1)]); // Append the first encountered piece
            break; // Exit the loop after encountering the first piece
        }
        validMoves.push(allSquares[topRight - (WIDTH - 1)]); // Append empty squares
        topRight -= WIDTH - 1;
    }

    while (bottomLeft % 8 !== 0 && bottomLeft <= 55) {
        if (allSquares[bottomLeft + (WIDTH - 1)].firstChild) {
            validMoves.push(allSquares[bottomLeft + (WIDTH - 1)]); // Append the first encountered piece
            break; // Exit the loop after encountering the first piece
        }
        validMoves.push(allSquares[bottomLeft + (WIDTH - 1)]); // Append empty squares
        bottomLeft += WIDTH - 1;
    }

    while ((bottomRight + 1) % 8 !== 0 && bottomRight <= 55) {
        if (allSquares[bottomRight + (WIDTH + 1)].firstChild) {
            validMoves.push(allSquares[bottomRight + (WIDTH + 1)]); // Append the first encountered piece
            break; // Exit the loop after encountering the first piece
        }
        validMoves.push(allSquares[bottomRight + (WIDTH + 1)]); // Append empty squares
        bottomRight += WIDTH + 1;
    }
}



  switch (pieceType) {
    case "pawn":
      let direction = pieceColor == "white" ? -1 : 1;
      let pawnDirection = direction * WIDTH;
      console.log(parseInt(draggedElement.getAttribute("times-moved")));
      if (parseInt(draggedElement.getAttribute("times-moved")) > 0) {
        validMoves.push(allSquares[startPosId + pawnDirection]);
      } else if (parseInt(draggedElement.getAttribute("times-moved")) === 0) {
        validMoves.push(allSquares[startPosId + pawnDirection]);
        if (!allSquares[startPosId + pawnDirection].firstChild) {
          validMoves.push(allSquares[startPosId + 2 * pawnDirection]);
        }
        //console.log(allSquares[startPosId + pawnDirection])
      }
      break;
    case "king":
      const kingOffsets = [
        { row: -1, col: -1 }, // top left
        { row: -1, col: 0 }, // top mid
        { row: -1, col: 1 }, // top right
        { row: 0, col: 1 }, // mid right
        { row: 1, col: 1 }, // bottom right
        { row: 1, col: 0 }, // bottom mid
        { row: 1, col: -1 }, // bottom left
        { row: 0, col: -1 }, // mid left
      ];

      for (const offset of kingOffsets) {
        const newRow = Math.floor(startPosId / WIDTH) + offset.row;
        const newCol = (startPosId % WIDTH) + offset.col;
        const newPosId = newRow * WIDTH + newCol;

        if (
          newRow >= 0 &&
          newRow < WIDTH &&
          newCol >= 0 &&
          newCol < WIDTH &&
          !allSquares[newPosId].firstChild
        ) {
          validMoves.push(allSquares[newPosId]);
        }
      }

      break;
    case "queen":
      checkRows();
      checkCols();
      checkDiagonals();

      break;
    case "rook":
      checkRows();
      checkCols();
      break;
    case "bishop":
      checkDiagonals();

      break;
    case "knight":
      const knightOffsets = [
        [-2, -1],
        [-2, 1],
        [-1, -2],
        [-1, 2],
        [1, -2],
        [1, 2],
        [2, -1],
        [2, 1],
      ];

      for (const [dx, dy] of knightOffsets) {
        const newRow = rowNum + dx;
        const newCol = colNum + dy;

        if (
          newRow >= 0 &&
          newRow < 8 &&
          newCol >= 0 &&
          newCol < 8 &&
          !allSquares[newCol * 8 + newRow].firstChild
        ) {
          const newPosId = newCol * 8 + newRow;
          //console.log(newRow, newCol, newPosId)
          //console.log(newPosId)
          validMoves.push(allSquares[newPosId]);
        }
      }
      break;
  }

  validMoves.forEach((square) => {
    //console.log(square)
    if (square.firstChild && square.firstChild.firstChild.classList.contains(currPlayer)){
     console.log(square.firstChild.firstChild)
     validMoves.pop(square)
    } else{ square.classList.add("valid")}
    
    //console.log(square.getAttribute("square-id"));
    //console.log(square.firstChild);
  });
  //console.log(validMoves);

  return validMoves;
}
r