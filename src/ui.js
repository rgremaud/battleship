import { Battleship } from "./battleship";
import { addShipYard } from "./shiptracker.js";
import { shipTracker } from "./shiptracker.js";
import { shipSetup } from "./clickevents.js";
import { attackEvent } from "./clickevents.js";
import { winCheck } from "./clickevents.js";
/* two player issues:
 * ship tracker for player 2 doesn't display ship 1 as active
 * ship placement click wipes the click event
 * fix by adding click event back?
 */
export function buttonInit() {
  const singlePlayer = document.getElementById("single");
  const twoPlayer = document.getElementById("double");
  const clear = document.getElementById("clear");
  const console = document.getElementById("console");

  singlePlayer.addEventListener(
    "click",
    () => {
      gameInit("single");
      console.textContent = "Please place your ships!";
    },
    { once: true },
  );

  twoPlayer.addEventListener(
    "click",
    () => {
      gameInit("double");
      console.textContent =
        "Two player game!  Player one please place your ships.";
    },
    { once: true },
  );

  clear.addEventListener("click", () => {
    //clearGame();
  });
}

function buildGrid(player) {
  const playerBoard = document.getElementById(`${player.name}`);
  for (let i = 0; i <= 9; i++) {
    const column = document.createElement("div");
    column.className = "column";
    for (let j = 0; j <= 9; j++) {
      const box = document.createElement("div");
      box.className = `gridBox-${player.name}`;
      box.id = `${i}${9 - j}${player.name}`;

      column.appendChild(box);
    }
    playerBoard.appendChild(column);
  }
}

function gameInit(gameType) {
  // initialize game, build visual grids
  const game = new Battleship(gameType);
  buildGrid(game.playerOne);
  buildGrid(game.playerTwo);
  // add click events
  addClicks(game);
  // prompt ship setup
  addShipYard(game);
}

export function addClicks(game) {
  const playerOne = game.playerOne;
  const playerTwo = game.playerTwo;

  const boxesP1 = document.querySelectorAll(`.gridBox-${playerOne.name}`);
  const boxesP2 = document.querySelectorAll(`.gridBox-${playerTwo.name}`);

  clickEvent(game, playerOne, boxesP1);
  clickEvent(game, playerTwo, boxesP2);
  pauseButton(game);
}

function clickEvent(game, player, boxes) {
  boxes.forEach((box) => {
    box.addEventListener(
      "click",
      () => {
        // ship placement stage
        if (
          game.stage === false &&
          player.gameboard.shipsPlaced !== 5 &&
          game.attacker === player
        ) {
          shipSetup(game, player, box);
          shipTracker(player); // look at moving this to shiptracker function
          // attack stage
        } else if (game.stage === true && game.attacker !== player) {
          attackEvent(game, player, box);
          winCheck(game, player, box);
        }
        refreshDisplay(game)
      },
      { once: true },
    );
  });
}


function refreshDisplay(game) {
 displayBoard(game, game.playerOne);
 displayBoard(game, game.playerTwo);
}

export function displayBoard(game, player) {
  const boardArray = player.gameboard.board;
  const gridBoxes = document.querySelectorAll(`.gridBox-${player.name}`);
  gridBoxes.forEach((box) => {
    const x = Number(box.id.charAt(0));
    const y = Number(box.id.charAt(1));
    if (boardArray[x][y] === "hit") {
      box.style.backgroundColor = "red";
    } else if (boardArray[x][y] === "miss") {
      box.style.backgroundColor = "purple";
    } else if ((boardArray[x][y] && game.attacker === player && game.type === "single") ||
               (boardArray[x][y] && game.attacker === player && game.stage === false) || 
               (boardArray[x][y] && game.attacker === player && game.stage === "unpause")
              )
      {
      box.style.backgroundColor = "green";
    } else {
      box.style.backgroundColor = "lightblue";
    }
  });
}

function pauseButton(game) {
  const button = document.getElementById("pause");

  button.addEventListener("click", () => {
    game.stage = "unpause";
    refreshDisplay(game);
    game.stage = true;
  });
}
