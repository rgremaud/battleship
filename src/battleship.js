import { Human } from "./player";
import { Computer } from "./player";

export class Battleship {
  constructor(type) {
    this.type = type;
    if (type === "single") {
      this.playerOne = new Human("playerOne");
      this.playerTwo = new Computer("playerTwo");
      this.activePlayer = this.playerOne;
    } else {
      this.type = "double";
      this.playerOne = new Human("playerOne");
      this.playerTwo = new Human("playerTwo");
      this.activePlayer = this.playerOne;
    }
    this.stage = false; // false, true, pause
  }

  toggleActive() {
    if (this.activePlayer === this.playerOne) {
      this.activePlayer = this.playerTwo;
      this.playerTwo.active = true;
      this.playerOne.active = false;
    } else {
      this.activePlayer = this.playerOne;
      this.playerOne.active = true;
      this.playerTwo.active = false;
    }
  }
}
