import { Battleship } from "./battleship";
import { addShipYard } from "./shiptracker.js";
import { shipTracker } from "./shiptracker.js";
import { shipSetup } from "./clickevents.js";

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
  const playerOne = game.playerOne;
  const playerTwo = game.playerTwo;

  const boxesP1 = document.querySelectorAll(`.gridBox-${playerOne.name}`);
  const boxesP2 = document.querySelectorAll(`.gridBox-${playerTwo.name}`);

  clickEvent(game, playerOne, boxesP1);
  clickEvent(game, playerTwo, boxesP2);
}

function clickEvent(game, player, boxes) {
  // if game.type === single and playerOne
  boxes.forEach((box) => {
    box.addEventListener("click", () => {
      // ship placement stage
      if (
        game.stage === false &&
        player.gameboard.shipsPlaced !== 5 &&
        game.attacker === player
      ) {
        shipSetup(game, player, box);
        displayBoard(game, player);
        shipTracker(player); // look at moving this to shiptracker function
        // attack stage
      } else if (game.stage === true && game.attacker !== player) {
        // recieve attack
        const x = Number(box.id.charAt(0));
        const y = Number(box.id.charAt(1));
        const board = player.gameboard;
        const attack = board.receiveAttack(x, y);
        displayBoard(game, player);
        // displayBoard(game, game.playerTwo); removing for now
        if (attack === true) {
          box.style.backgroundColor = "red";
        } else {
          box.style.backgroundColor = "purple";
        }
        // prompt computer attack back
        if (player.name === "playerTwo" && game.type === "single") {
          const computerAttack = game.playerTwo.attack(
            game.playerOne.gameboard,
          );
          const attackLocation = document.getElementById(
            `${computerAttack[0]}${computerAttack[1]}${game.playerOne.name}`,
          );
          if (computerAttack[2] === true) {
            attackLocation.style.backgroundColor = "red";
          } else {
            attackLocation.style.backgroundColor = "purple";
          }
          game.toggleActive();
        }
        game.toggleActive();
      }
    });
  });
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
  addShipYard(game);
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
