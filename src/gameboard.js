export class Gameboard {
  constructor() {
    this.board = Array.from({ length: 10 }, () => Array(10).fill(null));
    this.missed = [];
    this.sunkShips = 0;
  }

  validMove(x, y) {
    // need to update validMove check to check that board location is available
    if ( !(x >= 0 && x <= 9 && y >= 0 && y <= 9) || this.board[x][y] !== null ) {
      return false
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
        //this.board[x + i][y] = ship;
      }
    } else if (orientation === "vertical") {
      for (let i = 0; i < ship.length; i++) {
        moves.push([x, y - i]);
        if (this.validMove(x, y - i) !== true) {
          trigger = false;
        }
        //this.board[x][y - i] = ship;
      }
    }
    if (trigger === true) {
      moves.forEach((cord) => {
        this.board[cord[0]][cord[1]] = ship;
      });
    }
  }

  /*
  placeShip(ship, x, y, orientation) {
    try {
      let trigger = true;
      const moves = [];
      if ( orientation === "horizontal" ) {
        for ( let i = 0; i < ship.length; i++ ) {
          moves.push([x+i, y]);
          if ( this.validMove(x + i, y) !== true ) {
            trigger = false;
          }
          //this.board[x + i][y] = ship;
        }
      } else if ( orientation === "vertical" ) {
          for ( let i = 0; i < ship.length; i++ ) {
            moves.push([x, y-i]);
            if ( this.validMove(x, y - i) !== true ) { 
              trigger = false;
            }
          //this.board[x][y - i] = ship;
        }
      }
      /*
      if ( trigger === true ) {
        moves.forEach((cord) => {
          this.board[cord[0]][cord[1]] = ship;
        }
      }
      
    } catch (e) {
      console.error(e.message);
      return "error";
    } finally {
      if ( trigger === true ( {
        moves.forEach((cord) => {
          this.board[cord[0]][cord[1]] = ship;
        }
      }
    }

  validMove(x, y) {
    // need to update validMove check to check that board location is available
    if (!(x >= 0 && x <= 9 && y >= 0 && y <= 9)) {
      throw new Error(`Coordinate is not valid: [${x}, ${y}]`);
    } else if (this.board[x][y] !== null) {
      throw new Error(`Coordinate is taken: [${x}, ${y}]`);
    }
    return true;
    }
*/
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
