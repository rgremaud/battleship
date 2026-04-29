import { displayBoard } from "./newui.js";

export function winCheck(game, player, box) {
  // add in logic to track if there is a winner
  const console = document.getElementById("console");
  if (player.gameboard.sunkShips === 5) {
    console.textContent = `${player.name} has lost!`;
  }
}

export function shipSetup(game, player, box) {
  const x = Number(box.id.charAt(0));
  const y = Number(box.id.charAt(1));
  const console = document.getElementById("console");

  const activeShip = player.ships[player.gameboard.shipsPlaced];
  player.gameboard.placeShip(activeShip, x, y, player.gameboard.orientation);
  // insert function to update active player and stage of game
  if (
    game.type === "double" &&
    game.attacker === game.playerOne &&
    game.playerOne.gameboard.shipsPlaced === 5
  ) {
    game.toggleActive();
    console.textContent = `${game.attacker.name}'s turn to place ships!`;
  }
  if (
    game.playerOne.gameboard.shipsPlaced === 5 &&
    game.playerTwo.gameboard.shipsPlaced === 5
  ) {
    console.textContent = `All ships placed!  Attacker is ${game.attacker.name}`;
    game.stage = true;
  }
}

export function attackEvent(game, player, box) {
  // recieve attack
  const x = Number(box.id.charAt(0));
  const y = Number(box.id.charAt(1));
  const board = player.gameboard;
  const attack = board.receiveAttack(x, y);
  const console = document.getElementById("console");
  displayBoard(game, game.attacker);
  displayBoard(game, game.playerTwo);
  if (attack === true) {
    box.style.backgroundColor = "red";
  } else {
    box.style.backgroundColor = "purple";
  }
  // prompt computer attack back
  if (player.name === "playerTwo" && game.type === "single") {
    const computerAttack = game.playerTwo.attack(game.playerOne.gameboard);
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
  if (game.type === "double") {
    game.stage = "pause";
  }
  game.toggleActive();
  console.textContent = `Attacker is ${game.attacker.name}`;
}
