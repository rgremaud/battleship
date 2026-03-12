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
    this.previousMoves = [];
  }

  move() {
    return [
      Math.round(Math.random() * (9 - 0) + 0),
      Math.round(Math.random() * (9 - 0) + 0),
    ];
  }

  attack(board) {
    // call the receiveAttack move for opp's board
    const move = this.move();

    if (!this.previousMoves.includes(move)) {
      const coordinate = board.receiveAttack(move[0], move[1]); // returns true or false
      this.previousMoves.push(move);
      
      return [move[0], move[1], coordinate];
    } else {
      this.makeMove(board);
    }
  }
}
