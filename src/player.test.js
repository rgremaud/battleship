import { Player } from "./player";

test("Create player and place ship", () => {
  const playerOne = new Player();

  const board = playerOne.gameboard;

  board.placeShip(playerOne.ship5, 0, 0, "horizontal");

  expect(board.board[0][0]).toBe(playerOne.ship5);
});