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
    return [Math.round(Math.random() * 9), Math.round(Math.random() * 9)];
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

  shipSetup() {
    this.ships.forEach((ship) => {
      let validPlacement = false;

      while (validPlacement === false) {
        validPlacement = true;

        let entry = this.coordinate();
        while (this.gameboard.board[entry[0]][entry[1]] !== null) {
          entry = this.coordinate();
        }
        let orientation = "horizontal";

        const randomizer = Math.random();
        if (randomizer > 0.5) {
          orientation = "vertical";
        }

        const shipArray = [entry];
        for (let i = 1; i < ship.length; i++) {
          if (orientation === "horizontal") {
            shipArray.push([entry[0] + i, entry[1]]);
          } else {
            shipArray.push([entry[0], entry[1] - i]);
          }
        }

        shipArray.forEach((el) => {
          if (
            !this.validMove(el) ||
            this.gameboard.board[el[0]][el[1]] !== null
          ) {
            validPlacement = false;
          }
        });

        if (validPlacement === true) {
          this.gameboard.placeShip(ship, entry[0], entry[1], orientation);
        }
      }
    });
    console.log(this.gameboard.board); // testing
  }
}
