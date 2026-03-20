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
    const moves = [
      [x + 1, y],
      [x - 1, y],
      [x, y + 1],
      [x, y - 1],
    ];

    moves.forEach((move) => {
      if (!this.moves.includes(`${move[0]}${move[1]}`) && this.validMove(move) ) {
        this.queue.push(move);
      }
    });
  }

  validMove([x, y]) {
    return 0 <= x && x <= 9 && 0 <= y && y <= 9;
  }

  attack(board) {
    let move = this.move();

    if (this.queue.length > 0) {
      move = this.queue[0];
      this.queue.shift();
    }

    while (this.moves.includes(`${move[0]}${move[1]}`)) {
      move = this.move();
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
}
