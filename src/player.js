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

  attackSmart(board) {
    /*
    Identify if there are any pending moves
    if ( this.pendingMoves.length > 0) {
      const coordinate = this.pendingMoves[0]
      pop out first element from this.pendingMoves
      board.receiveAttack(coordinate[0], coordinate[1])
      this.previousMoves.push(coordinate)

      return [coordinate[0], coordinate[1], coordinate];
    }

    Use the move function for randomly picking attack
    const move = this.move();

    if (!this.previousMoves.includes(move)) { 
    const coordinate = board.receiveAttack(move[0], move[1]); // returns true or false
      if true -> build out pendingMoves based on neighboring points

      return [move[0], move[1], coordinate];
    }   
    
    */
  }
}
