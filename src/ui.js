import { Battleship } from "./battleship"

export function placeShips(player) {
  // build two players and place all ships

  // player board
  player.gameboard.placeShip(player.ship5, 0, 0, "horizontal");
  player.gameboard.placeShip(player.ship4, 0, 1, "horizontal");
  player.gameboard.placeShip(player.ship3v1, 0, 2, "horizontal");
  player.gameboard.placeShip(player.ship3v2, 0, 3, "horizontal");
  player.gameboard.placeShip(player.ship2, 0, 4, "horizontal");
}

// build display grid
export function buildGrid(game, player, boardDivId) {
  const playerBoard = document.getElementById(boardDivId);
  for (let i = 0; i <= 9; i++) {
    const row = document.createElement("div");
    row.className = "row";
    for (let j = 0; j <= 9; j++) {
      const box = document.createElement("div");
      box.className = "gridBox";
      box.id = `${boardDivId}[${i}, ${9 - j}]`;
      // add click event that displays id when clicked
      box.addEventListener("click", () => {
        if (game.activePlayer === player) {
          boxEventListener(game, player, box, i, j);
        }
        // attempt to add a click event that triggers computer attack after human attack
        if (game.type === "single") {
          game.playerTwo.attack(player.gameboard)
        }
      });

      row.appendChild(box);
    }

    playerBoard.appendChild(row);
  }
}

function boxEventListener(game, player, box, i, j) {
  const board = player.gameboard;

  // update box
  if (board.receiveAttack(i, 9 - j) === true) {
    box.style.backgroundColor = "red";
  } else {
    box.style.backgroundColor = "purple";
  }

  if (board.allSunk()) {
    alert("All your ships are sunk!");
  }

  // switch active player
  if (game.activePlayer === game.playerOne) {
    game.activePlayer = game.playerTwo;
  } else {
    game.activePlayer = game.playerOne;
  }

  // update active player
  const div = document.getElementById("activePlayer");
  div.textContent = `Active board: ${game.activePlayer.name}`;
}

/*
single player init

call the battleship class w/1 human and 1 computer player
const game = new Battleship("single")
update click event to call computer player class after human makes a move
prompt human player to make first move

*/
