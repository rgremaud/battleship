// ship yard functions
export function addShipYard(game) {
  if ( game.type === "single" ) {
    shipYardButtons(game.playerOne);
    shipTracker(game.playerOne);
    game.playerTwo.shipSetup();
    game.attacker = game.playerOne // look at moving this into click event?
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

export function shipTracker(player) {
  const shipDivs = document.querySelectorAll(`.${player.name}ship`);
  shipDivs.forEach((ship) => {
    colorShip(ship, "purple");
  });
  const activeShip = shipDivs[player.gameboard.shipsPlaced];

  colorShip(activeShip, "cyan");
}
