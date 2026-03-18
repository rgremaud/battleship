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

  move() {
    return [
      Math.round(Math.random() * (9 - 0) + 0),
      Math.round(Math.random() * (9 - 0) + 0),
    ];
  }

  buildQueue([x, y]) {
    // take a coordinate that was a hit and return all eligible board spots around it
    const moves = [
      [x + 1, y],
      [x - 1, y],
      [x, y + 1],
      [x, y - 1],
    ];

    // add valid moves that have not been visited and not currently in queue
    moves.forEach((move) => {
      if (
        this.validMove(move) &&
        !this.checkArray(this.moves, move) &&
        !this.checkArray(this.queue, move)
      ) {
        this.queue.push(move);
      }
    });
  }

  validMove([x, y]) {
    return 0 <= x && x <= 9 && 0 <= y && y <= 9;
  }

  attack(board) {
    // call the receiveAttack move for opp's board
    // if (this.queue.length === 0) {
    const move = this.move();
    // const gameboard = board;
    if ( this.validMove(move) ) {  

      const coordinate = board.receiveAttack(move[0], move[1]); // returns true or false
      // if (coordinate === true) {
      //   // build all possible coordinates
      // }
      this.moves.push(`${move[0]}${move[1]}`);

      return [move[0], move[1], coordinate];
      } // else {
      //   this.attack(gameboard);
      // }
  }
}
