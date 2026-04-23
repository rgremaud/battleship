import { Battleship } from "./battleship";
/*
 To do list on two player:
  After all ships placed - update console to show: All ships placed.  Attacking player is player one!
  Update all 'active player' to attacking player
  refactor click code so there is a single function for both single player and double player
 */

// Game init function
export function gameInit() {
  const singlePlayer = document.getElementById("single");
  const twoPlayer = document.getElementById("double");
  const clear = document.getElementById("clear");
  const console = document.getElementById("console");

  singlePlayer.addEventListener(
    "click",
    () => {
      singlePlayerInit();
      console.textContent = "Please place your ships!";
    },
    { once: true },
  );

  twoPlayer.addEventListener(
    "click",
    () => {
      doublePlayerInit();
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

function clearGame() {
  // doesnt work
  // needs to reset all of the visuals for both sides
  const playerOne = document.getElementById("playerOne");
  const playerTwo = document.getElementById("playerTwo");

  playerOne.textContent = "";
  playerTwo.textContent = "";
}

// Gameboard functions
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

// ship yard functions
function shipYardButtons(player) {
  const horizontal = document.getElementById(`${player.name}Horizontal`);
  horizontal.style.backgroundColor = "cyan";
  const vertical = document.getElementById(`${player.name}Vertical`);
  colorFlip(player, horizontal, vertical);
  colorFlip(player, vertical, horizontal);
}

function colorFlip(player, button1, button2) {
  button1.addEventListener("click", () => {
    button1.style.backgroundColor = "cyan";
    button2.style.backgroundColor = "gray";
    if (player.gameboard.orientation === "horizontal") {
      player.gameboard.orientation = "vertical";
    } else {
      player.gameboard.orientation = "horizontal";
    }
  });
}

function colorShip(ship, color) {
  if (ship) {
    for (let i = 0; i < ship.children.length; i++) {
      let child = ship.children[i];

      child.style.backgroundColor = color;
    }
  }
}

function shipTracker(player) {
  const shipDivs = document.querySelectorAll(`.${player.name}ship`);
  shipDivs.forEach((ship) => {
    colorShip(ship, "purple");
  });
  const activeShip = shipDivs[player.gameboard.shipsPlaced];

  colorShip(activeShip, "cyan");
}

function boardSetupEvent(box, game, player) {
  if (game.attacker === player && player.gameboard.shipsPlaced < 5) {
    const move = player.gameboard.placeShip(
      player.ships[player.gameboard.shipsPlaced],
      Number(box.id.charAt(0)),
      Number(box.id.charAt(1)),
      player.gameboard.orientation,
    );
    shipTracker(player);
    displayBoard(game, player);
    consoleTracker(game, player, move);
    if (player.gameboard.shipsPlaced === 5) {
      game.toggleActive();
    }
  }
}

function boardSetupClick(game, player) {
  // use a query selector to pull all of the players gridBoxes
  const gridBoxes = document.querySelectorAll(`.gridBox-${player.name}`);
  gridBoxes.forEach((box) => {
    box.addEventListener("click", () => {
      boardSetupEvent(box, game, player);
      if (
        game.stage === false &&
        game.playerOne.gameboard.shipsPlaced === 5 &&
        game.playerTwo.gameboard.shipsPlaced === 5
      ) {
        game.stage = true;
        gameClicks(game, game.playerOne);
        gameClicks(game, game.playerTwo);
      }
    });
  });
}

function consoleTracker(game, player, move = "") {
  const console = document.getElementById("console");

  // update for all ships placed for single and double games
  if (player.gameboard.shipsPlaced === 5 && game.stype === "single") {
    console.textContent = "All your ships have been placed.  Time to attack!";
  }

  if (
    player.gameboard.shipsPlaced === 5 &&
    game.type !== "single" &&
    player.name === "playerOne"
  ) {
    console.textContent = "Player two place your ships!";
  }

  // update console if move is not valid
  if (move === false) {
    console.textContent = "Invalid move.  Please try again";
  }

  // track active player
  if (game.stage === true) {
    console.textContent = `Active player is ${game.attacker.name}`;
  }

  if (
    game.playerOne.shipsPlaced === 5 &&
    game.playerTwo.shipsPlaced === 5 &&
    game.type === "double"
  ) {
    console.textContent = `All ships placed.  Active player ${game.attacker.name}`;
  }
}

function winCheck(player) {
  const console = document.getElementById("console");
  if (player.gameboard.sunkShips === 5) {
    console.textContent = `${player.name} has lost`;
  }
}

// Single player functions
function singlePlayerInit() {
  const game = new Battleship("single");

  // build grid display
  buildGrid(game.playerOne);
  buildGrid(game.playerTwo);
  // add ship yard button toggle
  shipYardButtons(game.playerOne);
  shipTracker(game.playerOne);
  // set player active and set board click
  boardSetupClick(game, game.playerOne);
  // prompt computer player to set up board
  game.playerTwo.shipSetup();
  // add click events to computer player board
  game.attacker = game.playerOne;
//  computerBoardClick(game.playerOne, game.playerTwo);
  //gameTestClick(game, game.playerOne);
  gameTestClick(game, game.playerTwo);
  
}

function computerBoardClick(human, computer) {
  const gridBoxes = document.querySelectorAll(`.gridBox-${computer.name}`);
  gridBoxes.forEach((box) => {
    box.addEventListener(
      "click",
      () => {
        if (human.gameboard.shipsPlaced === 5) {
          // recieve attack
          const x = Number(box.id.charAt(0));
          const y = Number(box.id.charAt(1));
          const recieveAttack = computer.gameboard.receiveAttack(x, y);
          // refresh board
          if (recieveAttack === true) {
            box.style.backgroundColor = "red";
          } else {
            box.style.backgroundColor = "purple";
          }
          winCheck(computer);
          // attack
          const attack = computer.attack(human.gameboard);
          // will need to refactor this
          const humanBox = document.getElementById(
            `${attack[0]}${attack[1]}${human.name}`,
          );
          if (attack[2] === true) {
            humanBox.style.backgroundColor = "red";
          } else {
            humanBox.style.backgroundColor = "purple";
          }
          winCheck(human);
        }
      },
      { once: true },
    );
  });
}

// double player functions
function stageButton(game) {
  const pause = document.getElementById("stage");

  pause.addEventListener("click", () => {
    // hide the player's ships
    game.stage = true;
  });
}

function doublePlayerInit() {
  const game = new Battleship("double");

  // build grid display
  buildGrid(game.playerOne);
  buildGrid(game.playerTwo);
  // add pause button
  stageButton(game);
  // add ship yard button toggle
  shipYardButtons(game.playerOne);
  shipYardButtons(game.playerTwo);
  shipTracker(game.playerOne);
  shipTracker(game.playerTwo);
  // set player active and set board clicks w/p1 active
  game.playerOne.active = true;
  boardSetupClick(game, game.playerOne);
  boardSetupClick(game, game.playerTwo);
}

function gameClicks(game, player) {
  const gridBoxes = document.querySelectorAll(`.gridBox-${player.name}`);
  gridBoxes.forEach((box) => {
    box.addEventListener(
      "click",
      () => {
        if (game.stage === true && game.attacker !== player) {
          const x = Number(box.id.charAt(0));
          const y = Number(box.id.charAt(1));
          const board = player.gameboard;
          const attack = board.receiveAttack(x, y);
          displayBoard(game, game.playerOne);
          displayBoard(game, game.playerTwo);
          if (attack === true) {
            box.style.backgroundColor = "red";
          } else {
            box.style.backgroundColor = "purple";
          }
          game.toggleActive();
          consoleTracker(game, player);
          // game.stage = "pause";
        }
      },
      { once: true },
    );
  });
}

function gameTestClick(game, player) {
  const gridBoxes = document.querySelectorAll(`.gridBox-${player.name}`);
  gridBoxes.forEach((box) => {
    box.addEventListener(
      "click",
      () => {
        // need to update game.attacker to track on both a single player and 2x game
        if (game.stage === true && game.attacker !== player) {
          // recieve attack
          const x = Number(box.id.charAt(0));
          const y = Number(box.id.charAt(1));
          const board = player.gameboard;
          const attack = board.receiveAttack(x, y);
          // refresh boards - Update to just player's board?
          displayBoard(game, game.playerOne);
          displayBoard(game, game.playerTwo);
          if (attack === true) {
            box.style.backgroundColor = "red";
          } else {
            box.style.backgroundColor = "purple";
          }
          // prompt computer attack back
          if (player.name === "playerTwo" && game.type === "single") {
            const computerAttack = game.playerTwo.attack(game.playerOne.gameboard);
            const playerBox = document.getElementById(
              `${attack[0]}${attack[1]}${game.playerOne.name}`,
            );
            if (computerAttack[2] === true) {
              playerBox.style.backgroundColor = "red";
            } else {
              playerBox.style.backgroundColor = "purple";
            }
          }
          game.toggleActive();
          consoleTracker(game, player);
          // game.stage = "pause";
        }
      },
      { once: true },
    );
  });
}
