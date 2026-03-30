export class Gameboard {
  constructor() {
    this.board = Array.from({ length: 10 }, () => Array(10).fill(null));
    this.missed = [];
    this.sunkShips = 0;
  }

  validMove(x, y) {
    if (!(x >= 0 && x <= 9 && y >= 0 && y <= 9)) {
      throw new Error(`Coordinate is not valid: [${x}, ${y}]`);
    }
    return true;
  }

  placeShip(ship, x, y, orientation) {
    try {
      this.validMove(x, y);
      if (orientation === "horizontal") {
        this.validMove(x + ship.length - 1, y);

        for (let i = 0; i < ship.length; i++) {
          this.board[x + i][y] = ship;
        }
      } else if (orientation === "vertical") {
        this.validMove(x, y - ship.length + 1);

        for (let i = 0; i < ship.length; i++) {
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
