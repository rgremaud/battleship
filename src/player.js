/*
Create a Player class/factory.
There will be two types of players in the game, ‘real’ players and ‘computer’ players.
Each player object should contain its own gameboard.

example of extending
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a noise.`);
  }
}

// Extend the base class
class Dog extends Animal {
  constructor(name, breed) {
    // Call the parent class constructor using super()
    super(name);
    this.breed = breed;
  }

  // Override the speak method
  speak() {
    console.log(`${this.name} barks.`);
  }
}
*/

import { Gameboard } from "./gameboard";
import { Ship } from "./ship";

export class Player {
  constructor() {
    this.gameboard = new Gameboard();
    this.ship5 = new Ship(5);
    this.ship4 = new Ship(4);
    this.ship3v1 = new Ship(3);
    this.ship3v2 = new Ship(3);
    this.ship2 = new Ship(2);
  }
}

// class Human extends Player {}
// class Computer extends Playerr {}
