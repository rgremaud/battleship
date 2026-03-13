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
    this.pendingMoves = [];
  }

  move() {
    return [
      Math.round(Math.random() * (9 - 0) + 0),
      Math.round(Math.random() * (9 - 0) + 0),
    ];
  }

  attackRandom(board) {
    // call the receiveAttack move for opp's board
    const move = this.move();

    if (!this.previousMoves.includes(move)) {
      const coordinate = board.receiveAttack(move[0], move[1]); // returns true or false
      this.previousMoves.push(move);

      return [move[0], move[1], coordinate];
    } else {
      this.attackRandom(board);
    }
  }

  validMove([x, y]) {
    return 0 <= x && x <= 9 && 0 <= y && y <= 9;
  }

  attackSmart(board) {
    // need to test the cycling of possible moves is working correctly

    // Identify if there are any pending moves
    if (this.pendingMoves.length > 0) {
      const coordinate = this.pendingMoves[0]; // returns true or false
      this.pendingMoves.shift(); // removes 1st element
      board.receiveAttack(coordinate[0], coordinate[1]); // play the attack

      if (coordinate) {
        const possibleMoves = [
          [coordinate[0] + 1 , coordinate[1]],
          [coordinate[0] - 1, coordinate[1]],
          [coordinate[0], coordinate[1] + 1],
          [coordinate[0], coordinate[1] - 1],
        ];
        // add only valid moves (0 =< x =< 9, 0 <= y <= 9)
        // ex [3, 2] -> [4, 2] [2, ,2] [3, 3] [3, 1]
        possibleMoves.forEach((coord) => {
          if ( this.validMove(coord)) {
            this.pendingMoves.push(coord)
          }
        })
      }

      this.previousMoves.push(coordinate); // track the move

      return [coordinate[0], coordinate[1], coordinate]; // return the coordinate
    }
    // call the receiveAttack move for opp's board
    const move = this.move();

    if (!this.previousMoves.includes(move)) {
      const coordinate = board.receiveAttack(move[0], move[1]); // returns true or false

      if (coordinate) this.previousMoves.push(move);

      return [move[0], move[1], coordinate];
    } else {
      this.attackRandom(board);
    }
  }
}
