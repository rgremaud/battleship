// store game ui here
// currently using tag input to differentiate between two boards when printing - look for better solution

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

  return player;
}

// builds visual grid
export function buildGrid(player, boardDivId) {
  const playerBoard = document.getElementById(boardDivId);
  for (let i = 0; i <= 9; i++) {
    const row = document.createElement("div");
    row.className = "row";
    // row.id = `row${9 - i}`; prob don't need
    for (let j = 0; j <= 9; j++) {
      const box = document.createElement("div");
      box.className = "gridBox";
      box.id = `${boardDivId}[${9 - j}, ${i}]`;
      // add click event that displays id when clicked
      box.addEventListener("click", () => {
        console.log(`[${9 - j}, ${i}]`);
        // build logic to check if the coordinate is occupied by a ship
        // hitEventListener(player, box, 9 - j, i);
        const board = player.gameboard;
        // take the div coordinate from box clicked
        // verify that x, y coordinates are properly transitioning to recieve attack
        if (board.receiveAttack(i, 9-j) === true) {
          box.style.backgroundColor = "red";
        } else {
          box.style.backgroundColor = "purple";
        }
      });

      row.appendChild(box);
    }

    playerBoard.appendChild(row);
  }
}

export function printGrid(player, boardDivId) {
  // accept a player and then scan their board to populate their ship coordinates
  const boardArray = player.gameboard.board;
  // boardArray is 10 arrays of 10 items
  for (let i = 0; i < boardArray.length; i++) {
    for (let j = 0; j < boardArray[i].length; j++) {
      if (boardArray[i][j] !== null) {
        const box = document.getElementById(`${boardDivId}[${j}, ${i}]`);
        box.style.backgroundColor = "green";
      }
    }
  }
}

// function hitEventListener(player, box, x, y) {
//   // define player board
//   const board = player.gameboard;
//   // take the div coordinate from box clicked
//   if (board.recieveAttack(x, y) === true) {
//     box.style.backgroundColor = "red";
//   } else {
//     box.style.backgroundColor = "purple";
//   }
// }
