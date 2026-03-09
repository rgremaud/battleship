import "./reset.css";
import "./styles.css";

// import { buildBoards } from "./ui";
import { Battleship } from "./battleship";
import { placeShips } from "./ui";
// import { printGrid } from "./ui";
import { buildGrid } from "./ui";

const game = new Battleship("single");

const playerOne = game.playerOne;
const playerTwo = game.playerTwo;

placeShips(playerOne);
placeShips(playerTwo);

buildGrid(game, playerOne, "playerOne");
buildGrid(game, playerTwo, "playerTwo");

// likely remove print grid
// prints initial grid
// printGrid(game, playerOne, "playerOne");
// printGrid(game, playerTwo, "playerTwo");

// set playerOne to active for first move
playerOne.active = true;
