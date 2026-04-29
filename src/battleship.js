import { Human } from "./player";
import { Computer } from "./player";

export class Battleship {
  constructor(type) {
    this.type = type;
    if (type === "single") {
      this.playerOne = new Human("playerOne");
      this.playerTwo = new Computer("playerTwo");
    } else {
      this.type = "double";
      this.playerOne = new Human("playerOne");
      this.playerTwo = new Human("playerTwo");
    }
    this.attacker = this.playerOne;
    this.stage = false; // false, true, pause
    this.winner = null;
  }

  winCheck() {
    if (this.playerOne.gameBoard.shipsPlaced === 5) {
      this.winner = this.playerTwo;
    } else if (this.playerTwo.gameBoard.shipsPlaced === 5) {
      this.winner = this.playerOne;
    }
  }

  toggleActive() {
    if (this.attacker === this.playerOne) {
      this.attacker = this.playerTwo;
    } else {
      this.attacker = this.playerOne;
    }
  }
}
