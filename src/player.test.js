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

test("Valid move", () => {
  const computer = new Computer();

  expect(computer.validMove([-1, 3])).toBe(false);
  expect(computer.validMove([5, 5])).toBe(true);
  expect(computer.validMove([9, 10])).toBe(false);
})

test("Check Array", () => {
  const computer = new Computer();

  const arrayOne = [[1,2], [3, 4]];
  const arrayTwo = [3,4];
  const arrayThree = [5, 6];

  expect(computer.checkArray(arrayOne, arrayTwo)).toBe(true);
  expect(computer.checkArray(arrayOne, arrayThree)).toBe(false);
});

test("Build queue", () => {
  const computer = new Computer();
  // hit is at [4, 5] -> next moves = [5, 5], [3, 5] [4, 6] [4, 4]
  computer.previousMoves = [[5, 5] [4, 4]];
  // computer.queue = [[5, 5]]
  computer.buildQueue([4, 5]);
  
  expect(computer.queue).toStrictEqual([3, 5], [4, 6]);
})