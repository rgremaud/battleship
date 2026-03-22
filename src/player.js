import { Gameboard } from "./gameboard";
import { Ship } from "./ship";

class Player {
  constructor(name) {
    this.gameboard = new Gameboard();
    this.name = name;
    this.ship5 = new Ship(5);
    this.ship4 = new Ship(4);
    this.ship3v1 = new Ship(3);
    this.ship3v2 = new Ship(3);
    this.ship2 = new Ship(2);
    this.ships = [
      this.ship5,
      this.ship4,
      this.ship3v1,
      this.ship3v2,
      this.ship2,
    ];
    this.active = false; // possibly remove
  }
}

export class Human extends Player {
  constructor(name) {
    super(name);
  }
}

export class Computer extends Player {
  constructor(name) {
    super(name);
    this.moves = [];
    this.queue = [];
  }

  coordinate() {
    return [
      Math.round(Math.random() * (9 - 0) + 0),
      Math.round(Math.random() * (9 - 0) + 0),
    ];
  }

  buildQueue([x, y]) {
    const moves = [
      [x + 1, y],
      [x - 1, y],
      [x, y + 1],
      [x, y - 1],
    ];

    moves.forEach((move) => {
      if (
        !this.moves.includes(`${move[0]}${move[1]}`) &&
        this.validMove(move)
      ) {
        this.queue.push(move);
      }
    });
  }

  validMove([x, y]) {
    return 0 <= x && x <= 9 && 0 <= y && y <= 9;
  }

  attack(board) {
    let move = this.coordinate();

    if (this.queue.length > 0) {
      move = this.queue[0];
      this.queue.shift();
    }

    while (this.moves.includes(`${move[0]}${move[1]}`)) {
      move = this.coordinate();
    }

    if (this.validMove(move)) {
      const coordinate = board.receiveAttack(move[0], move[1]);
      if (coordinate === true) {
        this.buildQueue(move);
      }
      this.moves.push(`${move[0]}${move[1]}`);

      return [move[0], move[1], coordinate];
    }
  }

  placeShips() {
    /*
    randomize the placement of all ships for computer player
    start w/largest ship and cycle through each ship

    decide if ship will be placed horizontally or vertically
    pick a random coordinate
    calculate if there is enough room for ship to fit
    place ship
    */
    this.ships.forEach((ship) => {
      // set initial variables
      let entry = "";
      let validPlacement = false;
      let orientation = "";
      // placeShip(ship, x, y, orientation)
      while (validPlacement === false) {
        entry = this.coordinate();

        // randomize an orientation
        const randomizer = Math.random();
        if (randomizer > 0.5) {
          orientation = "horizontal";
        } else {
          orientation = "vertical";
        }

        // test end point for valid placement
        if ( orientation === "horizontal") { 
          // build array for all coordinates of ship
          // test if each coordinate is valid and unoccupied on board
          // if true then update validPlacement to true 
        }

      }
    });
  }
}
