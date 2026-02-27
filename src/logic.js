// store game logic here
//

import { Player } from "./player";

// create game initiate function
export function playerInit() {
  // build two players and place all ships
  const playerOne = new Player();
  const playerTwo = new Player();

  // player board

  playerOne.gameboard.placeShip(playerOne.ship5, 0, 0, "horizontal");
  playerOne.gameboard.placeShip(playerOne.ship4, 0, 1, "horizontal");
  playerOne.gameboard.placeShip(playerOne.ship3v1, 0, 2, "horizontal");
  playerOne.gameboard.placeShip(playerOne.ship3v2, 0, 3, "horizontal");
  playerOne.gameboard.placeShip(playerOne.ship2, 0, 4, "horizontal");

  playerTwo.gameboard.placeShip(playerTwo.ship5, 0, 0, "horizontal");
  playerTwo.gameboard.placeShip(playerTwo.ship4, 0, 1, "horizontal");
  playerTwo.gameboard.placeShip(playerTwo.ship3v1, 0, 2, "horizontal");
  playerTwo.gameboard.placeShip(playerTwo.ship3v2, 0, 3, "horizontal");
  playerTwo.gameboard.placeShip(playerTwo.ship2, 0, 4, "horizontal");
  // build DOM elements to render to page
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
    for ( let i = 0; i <= 9; i++ ) { 
        const row = document.createElement("div");
        row.id = `row${9-i}`;
        for ( let i = 0; i <= 9; i++) {
            const box = document.createElement("div");
            box.id = `box${i}`;

            row.appendChild(box);
        }

        boardDiv.appendChild(row);
    }
}