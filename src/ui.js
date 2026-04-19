import { Battleship } from "./battleship";

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
      doublePlayerInit(); // still testing this
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
function displayBoard(player) {
  const boardArray = player.gameboard.board;

  for (let i = 0; i <= 9; i++) {
    for (let j = 0; j <= 9; j++) {
      const box = document.getElementById(`${i}${j}${player.name}`);

      if (boardArray[i][j] && player.gameboard.hits.includes(`${i}${j}`)) {
        box.style.backgroundColor = "red";
      } else if (boardArray[i][j]) {
        box.style.backgroundColor = "green";
      }
    }
  }
}

function hideBoard(player) {
  // selet all boxes and color them lightblue
  const gridBoxes = document.querySelectorAll(`.gridBox-${player.name}`);
  gridBoxes.forEach((box) => {
    box.style.backgroundColor = "lightblue";
    // doesnt work
    /*
    const boardArray = player.gameboard.board;
    const x = Number(box.id.charAt(0));
    const y = Number(box.id.charAt(1));
    if ( player.active === true && boardArray[x][y] ) {
     box.style.backgroundColor = "green"; 
    }
    */
  });
  
  // look at player board and pull array of all hits
  const hits = player.gameboard.hits;
  if ( hits.length >= 1) {
    hits.forEach((hit) => {
      const x = Number(hit.charAt(0));
      const y = Number(hit.charAt(1));
      const box = document.getElementById(`${x}${y}${player.name}`);
      box.style.backgroundColor = "red";
    });
  }

  const misses = player.gameboard.missed;
  if ( misses.length >= 1 ) {
    misses.forEach((miss) => {
      const x = Number(miss.charAt(0));
      const y = Number(miss.charAt(1));
      const box = document.getElementById(`${x}${y}${player.name}`);
      box.style.backgroundColor = "purple";
    });
  }
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
  if (player.active === true && player.gameboard.shipsPlaced < 5) {
    const move = player.gameboard.placeShip(
      player.ships[player.gameboard.shipsPlaced],
      Number(box.id.charAt(0)),
      Number(box.id.charAt(1)),
      player.gameboard.orientation,
    );
    shipTracker(player);
    displayBoard(player);
    consoleTracker(game, player, move);
    if (player.gameboard.shipsPlaced === 5) {
      game.togglePlayer();
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
  if (player.gameboard.shipsPlaced === 5) {
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
    console.textContent = `Active player is ${game.activePlayer.name}`;
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
  game.playerOne.active = true;
  boardSetupClick(game, game.playerOne);
  // prompt computer player to set up board
  game.playerTwo.shipSetup();
  // add click events to computer player board
  computerBoardClick(game.playerOne, game.playerTwo);
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
function doublePlayerInit() {
  const game = new Battleship("double");

  // build grid display
  buildGrid(game.playerOne);
  buildGrid(game.playerTwo);
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
        // recieve and attack
        if (game.stage === true && player.active === false) {
          // recieve the board click and convert to an x and y
          const x = Number(box.id.charAt(0));
          const y = Number(box.id.charAt(1));
          // check if attack is a hit
          const board = player.gameboard;
          const attack = board.receiveAttack(x, y);
          // if yes flag the box as red
          // else flag as purple
          // find logic ot hide other player
          if (game.activePlayer.name === "playerOne") {
            hideBoard(game.playerOne);
          } else {
            hideBoard(game.playerTwo);
          }
          if (player.active === true) {
            displayBoard(player);
          }
          if (attack === true) {
            box.style.backgroundColor = "red";
          } else {
            box.style.backgroundColor = "purple";
          }
          game.togglePlayer();
          // write function that updates console w/active player
          consoleTracker(game, player);
        }
      },
      { once: true },
    );
  });
}
