import { Battleship } from "./battleship";

/*
  Rework the UI to make sense

  Interactive items:
  Game type buttons - Single, Two Player, Clear
    Simple - use existing functions to add click events
  */
// buildGrid for each player board
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

// add button clicks for events
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
    alert("You clicked me! I don't do anything yet!");
  });
}

function shipYardButtons(player) {
  const horizontal = document.getElementById(`${player.name}Horizontal`);
  horizontal.style.backgroundColor = "cyan";
  const vertical = document.getElementById(`${player.name}Vertical`);
  colorFlip(horizontal, vertical);
  colorFlip(vertical, horizontal);
}

function colorFlip(button1, button2) {
  button1.addEventListener("click", () => {
    button1.style.backgroundColor = "cyan";
    button2.style.backgroundColor = "gray";
  });
}

function singlePlayerInit() {
  const game = new Battleship("single");

  // build grid display
  buildGrid(game.playerOne);
  buildGrid(game.playerTwo);
  // add ship yard button toggle
  shipYardButtons(game.playerOne);
  shipTracker(game.playerOne);
  placeShips(game.playerOne);
}

function colorShip(ship, color) {
  for (let i = 0; i < ship.children.length; i++) {
    let child = ship.children[i];

    child.style.backgroundColor = color;
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

function displayShips(player) {
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

function handleClick(player) {
  // use a query selector to pull all of the players gridBoxes
  const gridBoxes = document.querySelectorAll(`.gridBox-${player.name}`);
  gridBoxes.forEach((box) => {
    box.addEventListener("click", () => {
      // test if player is in ship placement stage
      if (player.active === true && player.gameboard.shipsPlaced <= 4) {
        // add in check that move is valid
        if (
          player.gameboard.placeShip(
            player.ships[player.gameboard.shipsPlaced],
            Number(box.id.charAt(0)),
            Number(box.id.charAt(1)),
            "horizontal", // placeholder for now
            ) !== false
        ) {
        // place ship if valid move 
        shipTracker(player);
        player.gameboard.placeShip(
          player.ships[player.gameboard.shipsPlaced],
          Number(box.id.charAt(0)),
          Number(box.id.charAt(1)),
          "horizontal", // placeholder for now
        )
        displayShips(player);
        console.log(`Total ships placed ${player.gameboard.shipsPlaced}`)
        }
      }
    });
  });
  // if player is active and has not placed all ships
  // place current ship at location clicked
  // refresh player board
}
function placeShips(player) {
  // set player active
  player.active = true;
  // highlight current ship to place
  const ships = player.gameboard.shipsPlaced;
  // read grid click and place on players board
  // add click events to players board -- move to separate function
  handleClick(player);
  // return error message if placement is invalid
  // refresh ui to display ship placed
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
