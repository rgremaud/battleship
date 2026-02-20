import { Ship } from "./ship.js";

test("Ship sink test", () => {
  ship = new Ship(5);
  ship.hit();
  ship.hit();
  ship.hit();
  ship.hit();
  ship.hit();

  expect(ship.isSunk()).toBe(true);
});

test("Ship hit test", () => {
  ship = new Ship(5);
  ship.hit();

  expect(ship.hits).toBe(1);
});
