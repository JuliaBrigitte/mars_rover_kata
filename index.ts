import { readBuilderProgram } from "typescript";
import { clear, print, askQuestion } from "./console";
import { getFirstLineOfInput } from "./first_line_of_input";

export type Coordinates = {
  X: number;
  Y: number;
};

export let upperRightCoordinates: Coordinates = { X: 0, Y: 0 };

export function acceptCoordinates(): void {
  clear(false);
  print("--------------------------");
  print("| Welcome to Mars Rover Kata! |");
  print("--------------------------");

  askQuestion(
    `Please enter the upper right coordinates (each coordinate should be greater than 0) separated by space: `,
    startMarsRover
  );
}

//This function ensures the Upper Right cooridinates are valid
//Ensures the coordinates are greater than 0
//Ensures there are only 2 coordinates provided
function checkIfCordinatesAreValid(coordinates: string) {
  //remove all the extra spaces in input string
  var xy_coordinates: string[] = coordinates
    .replace(/\s+/g, " ")
    .trim()
    .split(" ");
  if (xy_coordinates.length != 2) return false;
  if (Number(xy_coordinates[0]) > 0 && Number(xy_coordinates[1]) > 0) {
    upperRightCoordinates.X = Number(xy_coordinates[0]);
    upperRightCoordinates.Y = Number(xy_coordinates[1]);
    return true;
  }
  return false;
}

//If coordinates are valid get first line of input
function startMarsRover(coordinates: string): void {
  if (coordinates && coordinates.length > 0) {
    if (checkIfCordinatesAreValid(coordinates)) {
      return getFirstLineOfInput();
    } else {
      print("***************************************");
      print("Sadly, the coordinates are invalid! ☹");
      return endMarsRover();
    }
  } else {
    print(`You did not enter the Coordinates :(`);
    return endMarsRover();
  }
}

export function endMarsRover(): void {
  print("***************************************");
  print("Ohho!! your Rover cannot make it to Mars!!. 😭");
  askQuestion("Press ENTER to restart! ", acceptCoordinates);
}

acceptCoordinates();

module.exports = {
  acceptCoordinates,
};
