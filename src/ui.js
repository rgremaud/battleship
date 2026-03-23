import { Battleship } from "./battleship";

function placeShips(player) {
  // player board - Remove after done w/testing
  player.gameboard.placeShip(player.ship5, 0, 0, "horizontal");
  player.gameboard.placeShip(player.ship4, 0, 1, "horizontal");
  player.gameboard.placeShip(player.ship3v1, 0, 2, "horizontal");
  player.gameboard.placeShip(player.ship3v2, 0, 3, "horizontal");
  player.gameboard.placeShip(player.ship2, 0, 4, "horizontal");
}

// build grid boxes
function buildGrid(game, player, boardDivId) {
  const playerBoard = document.getElementById(boardDivId);
  for (let i = 0; i <= 9; i++) {
    const column = document.createElement("div");
    column.className = "column";
    for (let j = 0; j <= 9; j++) {
      const box = document.createElement("div");
      box.className = `gridBox-${player.name}`;
      box.id = `${i}${9 - j}${boardDivId}`;

      column.appendChild(box);
    }

    playerBoard.appendChild(column);
  }
}


export function buttonEvents() {
  const singlePlayer = document.getElementById("single");
  const twoPlayer = document.getElementById("double");
  const clear = document.getElementById("clear")

  singlePlayer.addEventListener("click", () => {
    singlePlayerInit();
  }, { once: true });

  twoPlayer.addEventListener("click", () => {
    alert("Yahoo!");
  }, { once: true });

  clear.addEventListener("click", () => {
    alert("You clicked me!")
  })
}
function singlePlayerInit() {
  const game = new Battleship("single");

  const humanPlayer = game.playerOne;
  const computerPlayer = game.playerTwo;

  placeShips(humanPlayer);
  // placeShips(computerPlayer);
  computerPlayer.shipSetup();

  buildGrid(game, humanPlayer, "playerOne");
  buildGrid(game, computerPlayer, "playerTwo");

  // add in funtion to add click event listeners only to the computer players board
  addClickEvents(game);

  // add function to print computer players ship location for testing
  computerShips(computerPlayer);

  humanPlayer.active = true;
}

function computerShips(player) {
  const boardArray = player.gameboard.board;

  for (let i = 0; i <= 9; i++) {
    for (let j = 0; j <= 9; j++) {
      const box = document.getElementById(`${i}${j}playerTwo`)

      if (boardArray[i][j]) {
        box.style.backgroundColor = "green";
      }
    }
  }
}

function addClickEvents(game) {
  // accept board as input
  // if game.type = single
  if (game.type === "single") {
    const boxes = document.querySelectorAll(".gridBox-playerTwo");

    boxes.forEach((box) => {
      box.addEventListener("click", () => {
        gridBoxClick(game, game.playerTwo, game.playerOne, box, box.id.charAt(0), box.id.charAt(1))
      }, { once: true });
    });
    // add click events to only the playerTwo board
    /*
    const board = game.playerTwo.gameboard;
    loop all of the row - 10 rows
    loop within each row - 10 boxes
  */
    // else add click events to playerOne and playerTwo board
    // required inputs for each box: boxEventListener(game, player, box, i, j)
  }
}

// new event listener
function gridBoxClick(game, player, opponent, box, x, y) {
  const board = player.gameboard;
  const opponentBoard = opponent.gameboard;

  // update box
  if (board.receiveAttack(x, y) === true) {
    box.style.backgroundColor = "red";
  } else {
    box.style.backgroundColor = "purple";
  }

  if (board.allSunk()) {
    alert("All your ships are sunk!");
  }

  // trigger computer player's move
  const play = player.attack(opponentBoard);
  const attackBox = document.getElementById(`${play[0]}${play[1]}playerOne`); // returning invalid at times

  if (play[2] === true) {
    attackBox.style.backgroundColor = "red";
  } else {
    attackBox.style.backgroundColor = "purple";
  }
  // example boxId for playerOne div - 09playerOne

  // // switch active player
  // if (game.activePlayer === game.playerOne) {
  //   game.activePlayer = game.playerTwo;
  // } else {
  //   game.activePlayer = game.playerOne;
  // }

  // // update active player
  // const div = document.getElementById("activePlayer");
  // div.textContent = `Active board: ${game.activePlayer.name}`;

  // // doesnt work
}
