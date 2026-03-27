import { Human } from "./player";
import { Computer } from "./player";

export class Battleship {
  constructor(type) {
    this.type = type;
    if (type === "single") {
      this.playerOne = new Human("playerOne", "One");
      this.playerTwo = new Computer("playerTwo", "Two");
      this.activePlayer = this.playerOne;
    } else {
      this.playerOne = new Human("playerOne");
      this.playerTwo = new Human("playerTwo");
      this.activePlayer = this.playerOne;
    }
  }
}
