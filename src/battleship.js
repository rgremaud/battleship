import { Player } from "./player"

export class Battleship { 
    constructor() {
        this.playerOne = new Player("playerOne");
        this.playerTwo = new Player("playerTwo");
        this.activePlayer = this.playerOne;
    }
}