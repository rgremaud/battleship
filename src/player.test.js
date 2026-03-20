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

  move = computer.move();

  expect(move[0]).toBeGreaterThanOrEqual(0);
  expect(move[0]).toBeLessThanOrEqual(9);

  expect(move[1]).toBeGreaterThanOrEqual(0);
  expect(move[1]).toBeLessThanOrEqual(9);
});

test("Valid move", () => {
  const computer = new Computer();

  for(let i = 0; i <= 100; i++ ) {
    expect(computer.validMove([
      Math.round(Math.random() * (9 - 0) + 0),
      Math.round(Math.random() * (9 - 0) + 0),
    ])).toBe(true);
  };
})

test("Build queue", () => {
  const computer = new Computer();
  // hit is at [4, 5] -> next moves = [5, 5], [3, 5] [4, 6] [4, 4]
  computer.moves = ["55", "44"];
  
  computer.buildQueue([4, 5]);
  expect(computer.queue).toStrictEqual([[3, 5], [4, 6]]);
})