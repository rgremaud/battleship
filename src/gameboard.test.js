import { Gameboard } from "./gameboard";
import { Ship } from "./ship";

test("Place ship test", () => {
  ship = new Ship(2);
  board = new Gameboard();

  board.placeShip(ship, 0, 0, "horizontal");
  // board.board[x][y]

  expect(board.board[0][0]).toBe(false);
  expect(board.board[0][1]).toBe(false);
});
