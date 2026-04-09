import { Battleship } from "./battleship";

function buildGrid(player, boardDivId) {
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

// needs to be refactored
function shipYardActions(player) {
  // set orientation click events
  // set initial orientation
  let shipOrientation = "horizontal";

  const horizontalButton = document.getElementById(`${player.name}Horizontal`);
  horizontalButton.style.backgroundColor = "cyan";
  const verticalButton = document.getElementById(`${player.name}Vertical`);
  const console = document.getElementById("console");

  horizontalButton.addEventListener("click", () => {
    shipOrientation = "horizontal";
    horizontalButton.style.backgroundColor = "cyan";
    verticalButton.style.backgroundColor = "gray";
  });

  verticalButton.addEventListener("click", () => {
    shipOrientation = "vertical";

    horizontalButton.style.backgroundColor = "gray";
    verticalButton.style.backgroundColor = "cyan";
  });

  // set ship variables
  const shipDivs = document.querySelectorAll(`.${player.name}ship`);
  let shipCount = 0;
  shipHighlight(shipDivs[shipCount], "cyan");

  const shipObjects = player.ships;
  let activeShip = shipObjects[0];

  // add a click event to all of the player one grid boxes that increases ship count by 1
  const gridBoxes = document.querySelectorAll(`.gridBox-${player.name}`);
  gridBoxes.forEach((box) => {
    box.addEventListener("click", () => {
      // throws an error when you have highlighted all ships and click again
      if (
        player.gameboard.placeShip(
          activeShip,
          Number(box.id.charAt(0)),
          Number(box.id.charAt(1)),
          shipOrientation,
        ) !== "error"
      ) {
        shipCount += 1;
        shipDivs.forEach((ship) => {
          shipHighlight(ship, "gray");
        });
        if (shipCount <= 4) {
          shipHighlight(shipDivs[shipCount], "cyan");
        }

        // need to add logic to utilize invalid move notification when placing ship
        player.gameboard.placeShip(
          activeShip,
          Number(box.id.charAt(0)),
          Number(box.id.charAt(1)),
          shipOrientation,
        );
        displayShips(player);
        if (activeShip.length === 2) {
          console.textContent =
            "All ships placed.  Please fire your first missle!";
        }
        activeShip = shipObjects[shipCount];
      } else { 
        console.textContent = "Invalid ship placement - please try again";
      }
    });
  });
}

function shipHighlight(ship, color) {
  for (let i = 0; i < ship.children.length; i++) {
    let child = ship.children[i];

    child.style.backgroundColor = color;
  }
}

function singlePlayerInit() {
  const game = new Battleship("single");

  // prompt human player to place all their ships for gave to start
  game.playerTwo.shipSetup();

  buildGrid(game.playerOne, "playerOne");
  buildGrid(game.playerTwo, "playerTwo");

  addClickEvents(game);
  shipYardActions(game.playerOne);

  game.playerOne.active = true;
}

function doublePlayerInit() {
  /*
  Two do for double player init:
  - add prompts for p1 and p2 to place ships w/view of other player hidden
  - track active player at all times to help w/visibility
  - remove ship placement click event after all ships are placed
 */
  const game = new Battleship("double");

  // set up grid for both players
  buildGrid(game.playerOne, "playerOne");
  buildGrid(game.playerTwo, "playerTwo");

  // add click events
  shipYardActions(game.playerOne);
  shipYardActions(game.playerTwo);
  addClickEvents(game); // adds click listeners to both

  game.playerOne.active = true;
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

function addClickEvents(game) {
  if (game.type === "single") {
    const boxes = document.querySelectorAll(".gridBox-playerTwo");

    boxes.forEach((box) => {
      box.addEventListener(
        "click",
        () => {
          gridBoxClick(
            game,
            game.playerTwo,
            game.playerOne,
            box,
            box.id.charAt(0),
            box.id.charAt(1),
          );
        },
        { once: true },
      );
    });
  } else if (game.type === "double") {
    // add logic for click events on two player game
    // add for both player 1 and two - need to refactor

    const p2boxes = document.querySelectorAll(".gridBox-playerTwo");

    p2boxes.forEach((box) => {
      box.addEventListener(
        "click",
        () => {
          gridBoxClick(
            game,
            game.playerTwo,
            game.playerOne,
            box,
            box.id.charAt(0),
            box.id.charAt(1),
          );
        },
        { once: true },
      );
    });

    const p1boxes = document.querySelectorAll(".gridBox-playerOne");

    p1boxes.forEach((box) => {
      box.addEventListener(
        "click",
        () => {
          gridBoxClick(
            game,
            game.playerOne,
            game.playerTwo,
            box,
            box.id.charAt(0),
            box.id.charAt(1),
          );
        },
        { once: true },
      );
    });
  }
}

function gridBoxClick(game, player, opponent, box, x, y) {
  const board = player.gameboard;
  const opponentBoard = opponent.gameboard;
  const console = document.getElementById("console");

  // update box
  if (board.receiveAttack(x, y) === true) {
    box.style.backgroundColor = "red";
  } else {
    box.style.backgroundColor = "purple";
  }

  if (board.allSunk()) {
    console.textContent = `${player.name} has lost!`;
  }

  // trigger computer player's move
  // below should only occur in single player game
  if (game.type === "single") {
    const play = player.attack(opponentBoard);
    const attackBox = document.getElementById(`${play[0]}${play[1]}playerOne`);

    if (play[2] === true) {
      attackBox.style.backgroundColor = "red";
    } else {
      attackBox.style.backgroundColor = "purple";
    }
  }

  if (game.type === "double") {
   game.togglePlayer(); 
  } 
}
