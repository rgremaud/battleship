import { Human } from "./player";
import { Computer } from "./player";

test("Create player and place ship", () => {
  const playerOne = new Human();

  const board = playerOne.gameboard;

  board.placeShip(playerOne.ship5, 0, 0, "horizontal");

  expect(board.board[0][0]).toBe(playerOne.ship5);
});

test("Computer move", () => {
  const computer = new Computer();

  // return a random coordinate of [x, y] where x and 9 are a number between 0-9
  move = computer.move();

  expect(move[0]).toBeGreaterThanOrEqual(0);
  expect(move[0]).toBeLessThanOrEqual(9);

  expect(move[1]).toBeGreaterThanOrEqual(0);
  expect(move[1]).toBeLessThanOrEqual(9);
});
