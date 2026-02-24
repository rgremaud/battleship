import { Gameboard } from "./gameboard";
import { Ship } from "./ship";

test("Place ship test", () => {
  ship3 = new Ship(3);
  board = new Gameboard();

  board.placeShip(ship3, 2, 1, "verticle");
  
  expect(board.board[2][1]).toBe(ship3);
  expect(board.board[1][1]).toBe(ship3);
  expect(board.board[0][1]).toBe(ship3);
});

test("Recieve Attack - sink ship" , () => {
  ship3 = new Ship(3);
  board = new Gameboard();

  board.placeShip(ship3, 2, 1, "verticle");

  expect(board.receiveAttack(2,1)).toBe(ship3);
  expect(board.receiveAttack(1,1)).toBe(ship3);
  expect(board.receiveAttack(0,1)).toBe(ship3);
  expect(ship3.sunk).toBe(true);
  expect(board.sunkShips).toBe(1);
})

test("Recieve attack - missed hits" , () => {
  board = new Gameboard();

  board.receiveAttack(2,1)
  board.receiveAttack(8,9)
  board.receiveAttack(0,1)

  expect(board.missed).toStrictEqual([[2,1], [8,9], [0, 1]])
})
