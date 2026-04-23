import { Human } from "./player";
import { Computer } from "./player";

export class Battleship {
  constructor(type) {
    this.type = type;
    if (type === "single") {
      this.playerOne = new Human("playerOne");
      this.playerTwo = new Computer("computer");
    } else {
      this.type = "double";
      this.playerOne = new Human("playerOne");
      this.playerTwo = new Human("playerTwo");
    }
    this.attacker = this.playerOne;
    this.stage = false; // false, true, pause
  }

  toggleActive() {
    if (this.attacker === this.playerOne) {
      this.attacker = this.playerTwo;
    } else {
      this.attacker = this.playerOne;
    }
  }
}
