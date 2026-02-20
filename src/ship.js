/*
Begin your app by creating the Ship class/factory (your choice).
    Your ‘ships’ will be objects that include their length, the number of 
    times they’ve been hit and whether or not they’ve been sunk.

    REMEMBER you only have to test your object’s public interface. 
    Only methods or properties that are used outside of your ‘ship’ object need unit tests.

    Ships should have a hit() function that increases the number of ‘hits’ in your ship.
    isSunk() should be a function that calculates whether a ship is considered sunk based on its length and the number of hits it has received.

    Each player gets ships of length: 5, 4, 3, 3, 2
*/

export class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
    this.sunk = false;
  }

  hit() {
    return (this.hits += 1);
  }

  isSunk() {
    if (this.hits === this.length) {
      this.sunk = true;
    }

    return this.sunk;
  }
}
