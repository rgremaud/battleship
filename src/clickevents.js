export function clearGame() {
  // select the gameboard divs id playerOne id playerTwo
  const playerOne = document.getElementById("playerOne");
  const playerTwo = document.getElementById("playerTwo");
  // clear textContent
  playerOne.textContent = "";
  playerTwo.textContent = "";
}

export function clicked(game, player, box) {
  const x = Number(box.id.charAt(0));
  const y = Number(box.id.charAt(1));
  const board = player.gameboard.board;
  if (
    board[x][y] &&
    (player.gameboard.missed.includes(`${x}${y}`) ||
      player.gameboard.hits.includes(`${x}${y}`))
  ) {
    return true;
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
    console.style.color = "#9ece6a";
  }
  if (
    game.playerOne.gameboard.shipsPlaced === 5 &&
    game.playerTwo.gameboard.shipsPlaced === 5
  ) {
    console.textContent = `All ships placed!  Attacker is ${game.attacker.name}`;
    console.style.color = "#9ece6a";
    game.stage = true;
  }
}

export function attackEvent(game, player, box) {
  // recieve attack
  const x = Number(box.id.charAt(0));
  const y = Number(box.id.charAt(1));
  const board = player.gameboard;
  const attack = board.receiveAttack(x, y); // check if this prompts attack
  const console = document.getElementById("console");
  if (attack === true) {
    box.style.backgroundColor = "#f77b8e";
  } else {
    box.style.backgroundColor = "#1f2335";
  }
  // prompt computer attack back
  if (player.name === "playerTwo" && game.type === "single") {
    const computerAttack = game.playerTwo.attack(game.playerOne.gameboard);
    const attackLocation = document.getElementById(
      `${computerAttack[0]}${computerAttack[1]}${game.playerOne.name}`,
    );
    if (computerAttack[2] === true) {
      attackLocation.style.backgroundColor = "#f77b8e";
    } else {
      attackLocation.style.backgroundColor = "#7dcfff";
    }
    winCheck(game, game.playerOne); // validate that this check if computer has won
    game.toggleActive();
  }
  if (game.type === "double") {
    game.stage = "pause";
  }
  game.toggleActive();
  if (!game.winner) {
    console.textContent = `Time for ${game.attacker.name} to attack!`;
  }
}

export function winCheck(game, player) {
  // add in logic to track if there is a winner
  const console = document.getElementById("console");
  if (player.gameboard.sunkShips === 5) {
    game.winner = true;
    console.textContent = `${player.name} has lost!`;
    console.style.color = "#f7768e";
  }
}
