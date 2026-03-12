import { Battleship } from "./battleship";

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
// update this to build grid w/no event listeners on boxes
// break out the box click events so it only adds to player based boxes
// single player game needs to include a click event that pushes the computers play to the opponents board
// current iteration attempts to push computer clicks to the same grid as player's
// updates so click events are only active once
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
      // box.addEventListener("click", () => {
      //   if (game.activePlayer === player) {
      //     boxEventListener(game, player, box, i, j);
      //   }
      // doesn't work
      // // attempt to add a click event that triggers computer attack after human attack
      // if (game.activePlayer === game.playerOne) {
      //   // // call player two function to attack
      //   const attack = game.playerTwo.attack(game.playerOne.gameboard); // returns true or false
      //   // // verify if hit
      //   // // update color
      //   // if ( attack === true ) {
      //   //   box.style.backgroundColor = "red";
      //   // } else {
      //   //   box.style.backgroundColor = "purple";
      //   // }
      //   console.log(attack);
      // }
      // });

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

  // doesnt work
  // box.removeEventListener('click', this.boxEventListener, false);
}

export function buttonEvents() {
  const singlePlayer = document.getElementById("single");
  const twoPlayer = document.getElementById("double");

  singlePlayer.addEventListener("click", () => {
    singlePlayerInit();
  })

  twoPlayer.addEventListener("click", () => {
    alert("Yahoo!");
  })
}
function singlePlayerInit() {
  const game = new Battleship("single");

  const humanPlayer = game.playerOne;
  const computerPlayer = game.playerTwo;

  placeShips(humanPlayer);
  placeShips(computerPlayer);

  buildGrid(game, humanPlayer, "playerOne");
  buildGrid(game, computerPlayer, "playerTwo");

  // add in funtion to add click event listeners only to the computer players board
  // addClickEvents(game);

  playerOne.active = true;
}

function addClickEvents(game) {
  // accept board as input
  // if game.type = single
  // add click events to only the playerTwo board
  /*
    const board = game.playerTwo.gameboard;
  */
  // else add click events to playerOne and playerTwo board
  // required inputs for each box: boxEventListener(game, player, box, i, j) 
}

/*

to do:

Get single player init to work
Remove the ability to click a box multiple times

*/
