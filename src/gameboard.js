export class Gameboard {
  constructor() {
    // build an array of 10x10
    this.board = Array.from({ length: 10 }, () => Array(10).fill(null));
    this.missed = [];
    this.ships = [];
    this.sunkShips = 0;
  }

  validMove(x, y) {
    if (!(x >= 0 && x <= 9 && y >= 0 && y <= 9)) {
      throw new Error("Coordinate is not valid")
    }
    return true
  }

  placeShip(ship, x, y, orientation) {
    try {
      // test valid move for entry point
      this.validMove(x, y)
      // calculate entry point for ships final coordinate
      if (orientation === "horizontal") {
        // horizontal
        this.validMove(x + ship.length - 1, y);

        for (let i = 0; i < ship.length; i++) {
          this.board[x + i][y] = ship;
        }
      } else if (orientation === "verticle") {
        // verticle 
        this.validMove(x, y - ship.length + 1)

        for (let i = 0; i < ship.length; i++) {
          this.board[x][y - i] = ship;
        }

        this.ships.push(ship);
      }
    } catch (e) {
      console.error(e.message)
    }
  }

  receiveAttack(x, y) {
    // recieves an attack and sends it to the appropriate ship
    if (this.board[x][y]) {
      this.board[x][y].hit();
      if (this.board[x][y].sunk === true) this.sunkShips += 1;
      // return this.board[x][y]
    } else {
      // push coordinate to missed hits
      this.missed.push([x, y])
    }
  }

  allSunk() {
    if (this.sunkShips === 5) {
      return true
    } else {
      return false
    }
  }
}
