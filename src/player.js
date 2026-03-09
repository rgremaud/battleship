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

  /*
  function to make a move
  Math.round(Math.random() * (9-0)+0)
  */
  makeMove(board) {
    const move = [
      Math.round(Math.random() * (9 - 0) + 0),
      Math.round(Math.random() * (9 - 0) + 0),
    ];

    if (this.previousMoves.includes(move)) {
      board.receiveAttack(move[0], move[1]);
      this.previousMoves.push(move);
    } else {
      this.makeMove(board);
    }
  }
}
