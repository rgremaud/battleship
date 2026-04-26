export function shipSetup(game, player, box) {
  const x = Number(box.id.charAt(0));
  const y = Number(box.id.charAt(1));

  const activeShip = player.ships[player.gameboard.shipsPlaced];
  player.gameboard.placeShip(activeShip, x, y, player.gameboard.orientation);
  // insert function to update active player and stage of game
  if (
    game.type === "double" &&
    game.attacker === game.playerOne &&
    game.playerOne.gameboard.shipsPlaced === 5
  ) {
    game.toggleActive();
  }
  if (
    game.playerOne.gameboard.shipsPlaced === 5 &&
    game.playerTwo.gameboard.shipsPlaced === 5
  ) {
    game.stage = true;
  }
}
