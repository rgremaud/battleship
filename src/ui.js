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
  const console = document.getElementById("console")

  singlePlayer.addEventListener(
    "click",
    () => {
      singlePlayerInit();
      console.textContent = "Please place your ships!"
    },
    { once: true },
  );

  twoPlayer.addEventListener(
    "click",
    () => {
      alert("This button doesnt work yet!");
    },
    { once: true },
  );

  clear.addEventListener("click", () => {
    alert("You clicked me! I don't do anything yet!");
  });
}

function shipYardActions(player) {
  // set orientation click events
  let shipOrientation = "horizontal";

  const horizontalButton = document.getElementById(`${player.name}Horizontal`);
  horizontalButton.style.backgroundColor = "cyan";
  const verticalButton = document.getElementById(`${player.name}Vertical`);
  const console = document.getElementById("console")

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
  const shipDivs = document.querySelectorAll(".ship");
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
        if ( activeShip.length === 2 ) { 
          console.textContent = "All ships placed.  Please fire your first missle!"
        }
        activeShip = shipObjects[shipCount];
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

// function doublePlayerInit() {
//   const game = new Battleship("double");

  
// }

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
  }
}

function gridBoxClick(player, opponent, box, x, y) {
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
    console.textContent = `${player.name} has lost!`
  }

  // trigger computer player's move
  const play = player.attack(opponentBoard);
  const attackBox = document.getElementById(`${play[0]}${play[1]}playerOne`); // returning invalid at times

  if (play[2] === true) {
    attackBox.style.backgroundColor = "red";
  } else {
    attackBox.style.backgroundColor = "purple";
  }
}
