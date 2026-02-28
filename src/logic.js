// store game logic here
//

import { Player } from "./player";

// create game initiate function
export function playerInit() {
  // build two players and place all ships
  const player = new Player();
  
  // player board

  player.gameboard.placeShip(player.ship5, 0, 0, "horizontal");
  player.gameboard.placeShip(player.ship4, 0, 1, "horizontal");
  player.gameboard.placeShip(player.ship3v1, 0, 2, "horizontal");
  player.gameboard.placeShip(player.ship3v2, 0, 3, "horizontal");
  player.gameboard.placeShip(player.ship2, 0, 4, "horizontal");

  return player
}

export function buildBoards() {
  // build out board parent divs on template.html for board1 and board2
  const playerOneBoard = document.getElementById("playerOne");
  const playerTwoBoard = document.getElementById("playerTwo");
  // build out 10 divs for rows
  buildGrid(playerOneBoard);
  buildGrid(playerTwoBoard);
  // build out 10 div blocks for each cell inside the rows
}

function buildGrid(boardDiv) {
  for (let i = 0; i <= 9; i++) {
    const row = document.createElement("div");
    row.className = "row";
    // row.id = `row${9 - i}`; prob don't need
    for (let j = 0; j <= 9; j++) {
      const box = document.createElement("div");
      box.className = "gridBox";
      box.id = `[${9 - j}, ${i}]`;
      // add click event that displays id when clicked
      box.addEventListener("click", () => {
        console.log(`[${9 - j}, ${i}]`);
        // build logic to check if the coordinate is occupied by a ship
      });

      row.appendChild(box);
    }

    boardDiv.appendChild(row);
  }
}

// only works for one side
export function scanGrid(player, parentClass) {
  // accept a player and then scan their board to populate their ship coordinates
  const boardArray = player.gameboard.board;
  // boardArray is 10 arrays of 10 items
  for (let i = 0; i < boardArray.length; i++) {
    // Inner loop (uses j) iterates over elements within the current row (matrix[i])
    for (let j = 0; j < boardArray[i].length; j++) {
      if ( boardArray[i][j] !== null) {
        // const box = document.querySelector(parentClass+ ` .row #[${j}, ${i}]`)
        const box = document.getElementById(`[${j}, ${i}]`)
        box.style.backgroundColor = "red";
      }
    }
  }
}
