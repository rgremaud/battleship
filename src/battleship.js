import { Human } from "./player";
// import { Computer } from "./player"

export class Battleship {
  constructor() {
    this.playerOne = new Human("playerOne");
    this.playerTwo = new Human("playerTwo");
    this.activePlayer = this.playerOne;
  }
}
