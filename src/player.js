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
      [x+1, y],
      [x-1, y],
      [x, y+1],
      [x, y-1]
    ]

    // add valid moves that have not been visited and not currently in queue 
    moves.forEach((move) => {
      if (this.validMove(move) && !this.checkArray(this.previousMoves, move) && !this.checkArray(this.queue, move)) {
        this.queue.push(move);
      }
    });
  }

  attack(board) {
    // call the receiveAttack move for opp's board
    if ( this.queue.length === 0 ) { 
    const move = this.move();

    if (!this.previousMoves.includes(move)) {
      const coordinate = board.receiveAttack(move[0], move[1]); // returns true or false

      if ( coordinate === true ) {
        // build all possible coordinates
      }

      this.previousMoves.push(move);

      return [move[0], move[1], coordinate];
    } else {
      this.attack(board);
    }
  } else {
    // logic for if there are pending moves
  }
  }

  validMove([x, y]) {
    return 0 <= x && x <= 9 && 0 <= y && y <= 9;
  }

  checkArray(array, subArray){
    if(JSON.stringify(array).includes(JSON.stringify(subArray))) return true;
    return false;
  }

  // attack(board) {
  //   // Identify if there are any pending moves and play them
  //   if (this.pendingMoves.length > 0) {
  //     const move = this.pendingMoves[0]; // assigns next move up
  //     this.previousMoves.push(move); // track the move
  //     this.pendingMoves.shift(); // removes element at 0 index
  //     const play = board.receiveAttack(move[0], move[1]); // play the move - returns true or false
  //     // if hit update calculate all possible moves from hit and add them to queue
  //     if (play) {
  //       let possibleMoves = [
  //         [move[0] + 1, move[1]],
  //         [move[0] - 1, move[1]],
  //         [move[0], move[1] + 1],
  //         [move[0], move[1] - 1],
  //       ];
  //       possibleMoves.forEach((coord) => {
  //         if (this.validMove(coord) && !this.checkArray(this.previousMoves, coord)) {
  //           this.pendingMoves.push(coord);
  //         }
  //       });
  //     }

  //     return [move[0], move[1], play]; // return the coordinate
  //   } else {
  //     // generate a random move
  //     const move = this.move();
  //     if (this.validMove(move) && !this.checkArray(this.previousMoves, move) && !this.checkArray(this.previousMoves, move)) { 
  //     // if (!this.previousMoves.includes(move)) { // doesnt work
  //       this.previousMoves.push(move);
  //       const play = board.receiveAttack(move[0], move[1]); // returns true or false

  //       if (play) {
  //         let possibleMoves = [
  //           [move[0] + 1, move[1]],
  //           [move[0] - 1, move[1]],
  //           [move[0], move[1] + 1],
  //           [move[0], move[1] - 1],
  //         ];
  //         possibleMoves.forEach((coord) => {
  //           if (this.validMove(coord) && !this.checkArray(this.previousMoves, coord) && !this.checkArray(this.previousMoves, coord))  {
  //             this.pendingMoves.push(coord);
  //           }
  //         });
  //       }

  //       return [move[0], move[1], play];
  //     } else {
  //       this.attackSmart(board);
  //     }
  //   }
  // }
}
