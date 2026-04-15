import { Battleship } from "./battleship";

/*
  Rework the UI to make sense

  Interactive items:
  Game type buttons - Single, Two Player, Clear
    Simple - use existing functions to add click events
  */
// General functions
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

function clearGame() {
  // doesnt work
  // needs to reset all of the visuals for both sides
  const playerOne = document.getElementById("playerOne");
  const playerTwo = document.getElementById("playerTwo");

  playerOne.textContent = "";
  playerTwo.textContent = "";
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
    if ( player.gameboard.orientation === "horizontal" ) {
      player.gameboard.orientation = "vertical";
    } else {
      player.gameboard.orientation = "horizontal";
    }
  });
}

function colorShip(ship, color) {
  if ( ship ) { 
    for (let i = 0; i < ship.children.length; i++) {
      let child = ship.children[i];

      child.style.backgroundColor = color;
    }
  }
}

function shipTracker(player) {
  const shipDivs = document.querySelectorAll(`.${player.name}ship`);
  // pull all ships and color them all gray
  shipDivs.forEach((ship) => {
    colorShip(ship, "purple");
  });
  // assigns active ship and colors it cyan
  const activeShip = shipDivs[player.gameboard.shipsPlaced];

  colorShip(activeShip, "cyan");
}

function displayBoard(player) {
  const boardArray = player.gameboard.board;

  for (let i = 0; i <= 9; i++) {
    for (let j = 0; j <= 9; j++) {
      const box = document.getElementById(`${i}${j}${player.name}`);

      if (boardArray[i][j]) {
        box.style.backgroundColor = "green";
      }
    }
  }
}

function setupEvent(box, game, player) {
      if (player.active === true && player.gameboard.shipsPlaced < 5) {
        const move = player.gameboard.placeShip(
          player.ships[player.gameboard.shipsPlaced],
          Number(box.id.charAt(0)),
          Number(box.id.charAt(1)),
          player.gameboard.orientation,
        ) 
        shipTracker(player);
        displayBoard(player); 
        consoleTracker(game, player, move);
        if ( player.gameboard.shipsPlaced === 5) {
          game.togglePlayer();
        }
      }
}

function boardSetupClick(game, player) {
  // use a query selector to pull all of the players gridBoxes
  const gridBoxes = document.querySelectorAll(`.gridBox-${player.name}`);
  gridBoxes.forEach((box) => {
    box.addEventListener("click", () => {
      setupEvent(box, game, player);
    });
  });
}

function consoleTracker(game, player, move) {
  const console = document.getElementById('console');

  // update for all ships placed for single and double games
  if ( player.gameboard.shipsPlaced === 5 ) {
    console.textContent = "All your ships have been placed.  Time to attack!";
  };
  if ( player.gameboard.shipsPlaced === 5 && game.type !== "single" && player.name === "playerOne" ) {
    console.textContent = "Player two place your ships!";
  }

  // update console if move is not valid
  if ( move === false ) {
    console.textContent = "Invalid move.  Please try again";
  }
}

function winCheck(player) {
  const console = document.getElementById('console');
 if ( player.gameboard.sunkShips === 5 ) {
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
    box.addEventListener("click", () => {
      if ( human.gameboard.shipsPlaced === 5 ) {
      // recieve attack
      const x = Number(box.id.charAt(0));
      const y = Number(box.id.charAt(1));
      const recieveAttack = computer.gameboard.receiveAttack(x, y);
      // refresh board
      if ( recieveAttack === true ) {
        box.style.backgroundColor = "red"; 
      } else {
        box.style.backgroundColor = "purple";
      };
      winCheck(computer);
      // attack
      const attack = computer.attack(human.gameboard);
      // will need to refactor this
      const humanBox = document.getElementById(`${attack[0]}${attack[1]}${human.name}`);
      if ( attack[2] === true ) {
        humanBox.style.backgroundColor = 'red';
      } else {
        humanBox.style.backgroundColor = 'purple';
      }
      winCheck(human);
      }
    });
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
  // add clicks to board that recieves attacks and hides board
  removeClicks(playerOne);
  removeClicks(playerTwo);
  gameClicks(game, playerOne);
  gameClicks(game, playerTwo);
}

// doesnt work
function removeClicks(player) {
  const gridBoxes = document.querySelectorAll(`.gridBox-${player.name}`);
  gridBoxes.forEach((box) => {
    box.removeEventListener('click', setupEvent);
  });
}

function gameClicks(game, player) {
  const gridBoxes = document.querySelectorAll(`.gridBox-${player.name}`);
  gridBoxes.forEach((box) => {
    box.addEventListener("click", () => {
      if (player.active === false && player.gameboard.shipsPlaced === 5) {
        console.log("You placed your ships and are attacking");
        game.togglePlayer();
      }
    });
  });
}


/* 
  Shipyard Buttons - Horizontal or Vertical
  Gameboards - Grid needs to be selectable for placing and ships and then playing game

  Shipyard buttons and game flow should be closely integrated with active player
  
  Items to build w/ui.js
  Grid for gameboard - take from existing ui doc.

  Items that track game:
  Console section with promps etc.
  
  singlePlayerInit - 
    Create a single player game
    Add grids for both playerOne and playerTwo board
    Prompt user to place their ships on the board
    Create game stage:
      staging
  grid clicks to check following scenarios:
    if player is active, and not all ships placed
      allow to click on own board to place current ship in queue
    if player is active, and all ships placed
      allow to click on opponents board to make attack
    else do nothing




 */
