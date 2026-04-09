export class Gameboard {
  constructor() {
    this.board = Array.from({ length: 10 }, () => Array(10).fill(null));
    this.missed = [];
    this.sunkShips = 0;
  }

  validMove(x, y) {
    // need to update validMove check to check that board location is available
    if (!(x >= 0 && x <= 9 && y >= 0 && y <= 9)) {
      throw new Error(`Coordinate is not valid: [${x}, ${y}]`);
    } else if ( !this.board  ) {
      throw new Error(`Coordinate is taken: [${x}, ${y}]`);
    }
    return true;
  }

  placeShip(ship, x, y, orientation) {
    try {
      // need to update to check valid move for all coordinates of a ship
      if (orientation === "horizontal") {
        for (let i = 0; i < ship.length; i++) {
          this.validMove(x + i, y);
          this.board[x + i][y] = ship;
        }
      } else if (orientation === "vertical") {
        for (let i = 0; i < ship.length; i++) {
          this.validMove(x, y - i); 
          this.board[x][y - i] = ship;
        }
      }
    } catch (e) {
      console.error(e.message);
      return "error";
    }
  }

  receiveAttack(x, y) {
    if (this.board[x][y]) {
      this.board[x][y].hit();
      if (this.board[x][y].sunk === true) this.sunkShips += 1;
      return true;
    } else {
      this.missed.push([x, y]);
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
