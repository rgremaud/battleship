import { Gameboard } from "./gameboard";
import { Ship } from "./ship";

test("Place ship test", () => {
  ship3 = new Ship(3);
  board = new Gameboard();

  board.placeShip(ship3, 1, 2, "verticle");

  expect(board.board[1][2]).toBe(ship3);
  expect(board.board[1][1]).toBe(ship3);
  expect(board.board[1][0]).toBe(ship3);
});

test("Recieve Attack - sink ship", () => {
  ship3 = new Ship(3);
  board = new Gameboard();

  board.placeShip(ship3, 1, 2, "verticle");

  board.receiveAttack(1, 2);
  board.receiveAttack(1, 1);
  board.receiveAttack(1, 0);
  // expect(ship3.hits).toBe(3);
  expect(board.sunkShips).toBe(1);
});

test("Recieve attack - missed hits", () => {
  board = new Gameboard();

  board.receiveAttack(2, 1);
  board.receiveAttack(8, 9);
  board.receiveAttack(0, 1);

  expect(board.missed).toStrictEqual([
    [2, 1],
    [8, 9],
    [0, 1],
  ]);
});

// // check how x and y coordinates are applied

test("All sunk", () => {
  board = new Gameboard();
  sunk = board.allSunk();
  ship1 = new Ship(5);
  ship2 = new Ship(4);
  ship3 = new Ship(3);
  ship4 = new Ship(3);
  ship5 = new Ship(2);
  board.placeShip(ship1, 0, 0, "horizontal");
  board.placeShip(ship2, 0, 1, "horizontal");
  board.placeShip(ship3, 0, 2, "horizontal");
  board.placeShip(ship4, 0, 3, "horizontal");
  board.placeShip(ship5, 0, 4, "horizontal");

  expect(sunk).toBe(false);

  // sink ship 1 - [0,0]
  board.receiveAttack(0, 0);
  board.receiveAttack(1, 0);
  board.receiveAttack(2, 0);
  board.receiveAttack(3, 0);
  board.receiveAttack(4, 0);
  // sink ship 2
  board.receiveAttack(0, 1);
  board.receiveAttack(1, 1);
  board.receiveAttack(2, 1);
  board.receiveAttack(3, 1);
  // sink ship 3
  board.receiveAttack(0, 2);
  board.receiveAttack(1, 2);
  board.receiveAttack(2, 2);
  // sink ship 4
  board.receiveAttack(0, 3);
  board.receiveAttack(1, 3);
  board.receiveAttack(2, 3);
  // sink ship 5
  board.receiveAttack(0, 4);
  board.receiveAttack(1, 4);

  expect(board.sunkShips).toBe(5);
});
