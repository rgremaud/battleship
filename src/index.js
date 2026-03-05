/*
import your classes/factories into another file, and drive the game using event listeners to interact with your objects. 
*/
import "./reset.css";
import "./styles.css";

// import { buildBoards } from "./ui";
import { playerInit } from "./ui";
import { printGrid } from "./ui";
import { buildGrid } from "./ui";

const playerOne = playerInit();
const playerTwo = playerInit();

buildGrid(playerOne, "playerOne");
buildGrid(playerTwo, "playerTwo");

// prints initial grid
printGrid(playerOne, "playerOne");
printGrid(playerTwo, "playerTwo");

// set playerOne to active
playerOne.active = true;
