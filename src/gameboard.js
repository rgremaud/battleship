export class Gameboard {
  constructor() {
    this.board = Array.from({ length: 10 }, () => Array(10).fill(null));
    this.missed = [];
    this.hits = [];
    this.sunkShips = 0;
    this.shipsPlaced = 0;
    this.orientation = "horizontal";
  }

  validMove(x, y) {
    // need to update validMove check to check that board location is available
    if (!(x >= 0 && x <= 9 && y >= 0 && y <= 9) || this.board[x][y] !== null) {
      return false;
    }
    return true;
  }

  placeShip(ship, x, y, orientation) {
    let trigger = true;
    const moves = [];
    if (orientation === "horizontal") {
      for (let i = 0; i < ship.length; i++) {
        moves.push([x + i, y]);
        if (this.validMove(x + i, y) !== true) {
          trigger = false;
        }
      }
    } else if (orientation === "vertical") {
      for (let i = 0; i < ship.length; i++) {
        moves.push([x, y - i]);
        if (this.validMove(x, y - i) !== true) {
          trigger = false;
        }
      }
    }
    if (trigger === true) {
      moves.forEach((cord) => {
        this.board[cord[0]][cord[1]] = ship;
      });
      this.shipsPlaced += 1;
    } else {
      return false;
    }
  }

  receiveAttack(x, y) {
    if (this.board[x][y]) {
      this.board[x][y].hit(); // tracks hit on ship
      if (this.board[x][y].sunk === true) this.sunkShips += 1; // sink ship
      this.board[x][y] = "hit"; // testing for ui
      this.hits.push(`${x}${y}`); // push to hits
      return true;
    } else {
      this.board[x][y] = "miss";
      this.missed.push(`${x}${y}`);
      return false;
    }
  }

  allSunk() {
    if (this.sunkShips === 5) {
      return true;
    } else {
      return false;
    }
  }
}
