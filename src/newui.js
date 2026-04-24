import { Battleship } from "./battleship";
import { shipYardButtons } from "./shiptracker.js";
import { shipTracker } from "./shiptracker.js";

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
    clearGame();
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
  boardSetup(game);
}

function addClicks(game) {
  // add event listeners to all grid spots that properly process depending on game stage
  // playerBoxes = query select all
  // if game.type === single and playerOne
  // allow for ship placement on board when game.stage = false
  // if game.type === single and playerTwo (computer) and game.stage = true
  // allow to recieve attack from playerOne
  // return attack to playerOne
  // else if game.type === double and player one and game.stage = false
  // allow for ship placement
  // else if game.type === double and player one has placed all ships and game.stage = false
  // allow player two to place ships
}
function boardSetup(game) {
  // if game.type === single
  if ( game.type === single ) {
    shipYardButtons(game.playerOne);
    shipTracker(game.playerOne);
    game.playerTwo.shipSetup();
    game.attacker = game.playerOne // look at moving this into click event?
  }
  // prompt playerOne to setup ships
  // add computer ships game.playerTwo.shipSetup();
  // set game.stage = true
  // else (game.type === double
  // prompt playerOne to setup ships
  // prompt playertwo to setup ships
  // set game.stage = true
}

function displayBoard(game, player) {
  const boardArray = player.gameboard.board;
  const gridBoxes = document.querySelectorAll(`.gridBox-${player.name}`);
  const attacker = game.attacker;
  gridBoxes.forEach((box) => {
    const x = Number(box.id.charAt(0));
    const y = Number(box.id.charAt(1));
    if (boardArray[x][y] === "hit") {
      box.style.backgroundColor = "red";
    } else if (boardArray[x][y] === "miss") {
      box.style.backgroundColor = "purple";
    } else if (
      boardArray[x][y] &&
      (attacker !== player || game.type === "single" || game.stage === false)
    ) {
      box.style.backgroundColor = "green";
    } else {
      box.style.backgroundColor = "lightblue";
    }
  });
}






















