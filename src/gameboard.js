/*
Create a Gameboard class/factory.

Note that we have not yet created any User Interface. 
We should know our code is coming together by running the tests. 
You shouldn’t be relying on console.log or DOM methods to make sure your code is doing what you expect it to.
Gameboards should be able to place ships at specific coordinates by calling the ship factory or class.
Gameboards should have a receiveAttack function that takes a pair of coordinates, 
determines whether or not the attack hit a ship and then sends the ‘hit’ function to the correct ship, 
or records the coordinates of the missed shot.
Gameboards should keep track of missed attacks so they can display them properly.
Gameboards should be able to report whether or not all of their ships have been sunk.

10x10 board
ships: two sets of 5, 4, 3, 3, 2 - tie to players

*/

export class Gameboard {
  constructor() {
    // build an array of 10x10
    this.board = Array.from({ length: 10 }, () => Array(10).fill(null));
    this.missed = [];
  }

  validMove(x, y) {
    if (!(x >= 0 && x <= 9 && y >= 0 && y <= 9)) {
      throw new Error("Coordinate is not valid")
    }
    return true
  }

  placeShip(ship, x, y, orientation) {
    // update array locations for ship from null to false
    /*
    confirm this is valid move
    valid moves will stay between index values of 0 to 9 for each input
   
    test coordinate is not valid
    test that coordinate + ship length coordinate is not valid

    */

    try {
      // test valid move for entry point
      this.validMove(x, y)
      // calculate entry point for ships final coordinate
      if (orientation === "horizontal") {
        // horizontal
        this.validMove(x, y + ship.length);
        this.board[x][y] = false;
        this.board[x][y + 1] = false;
      } else {
        // verticle 
        this.board[x][y] = false;
        this.board[x + 1][y] = false;
      }
    } catch (e) {
      console.error(e.message)
    }
  }

  receiveAttack() { }
}
