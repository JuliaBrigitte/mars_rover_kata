import { Coordinates, endMarsRover, upperRightCoordinates } from "./index";
import { clear, print, askQuestion } from "./console";
import { getSecondLineOfInput } from "./second_line_of_input";

export const directions = ["N", "E", "W", "S"];

export type CoordinatePosition = {
  xycoordinates: Coordinates;
  direction: string;
};

export let currentPosition: CoordinatePosition = {
  xycoordinates: { X: 0, Y: 0 },
  direction: "",
};

export function getFirstLineOfInput() {
  clear(false);
  print("------------------------");
  print(`🥳 Ready to Explore !! 🥳`);
  print("------------------------");

  print("Now we can start our mission!! ");
  askQuestion(
    "Please enter the first line of input separated by space (eg: 1 1 N): ",
    checkFirstLineOfInput
  );
}

//If coordinates are valid get second line of input
function checkFirstLineOfInput(coordinates: string): void {
  if (coordinates && coordinates.length > 0) {
    if (checkIfCordinatesAreValid(coordinates)) {
      return getSecondLineOfInput();
    } else {
      print("***************************************");
      print("Sadly, the start position is invalid! ☹");
      return endMarsRover();
    }
  } else {
    print(`You did not enter the First Line of Input :(`);
    return endMarsRover();
  }
}

//This function ensures the first line cooridinates are greater than 0 and less than/equal to Upper right coordinates
//Ensures the directions are correct
function checkIfCordinatesAreValid(coordinates: string) {
  let firstLineOfInput: string[] = coordinates
    .replace(/\s+/g, " ")
    .trim()
    .split(" ");

  if (firstLineOfInput.length != 3) return false;
  currentPosition.xycoordinates.X = Number(firstLineOfInput[0]);
  currentPosition.xycoordinates.Y = Number(firstLineOfInput[1]);
  currentPosition.direction = firstLineOfInput[2].toUpperCase();

  if (
    !directions.includes(currentPosition.direction.toUpperCase()) ||
    currentPosition.xycoordinates.X < 0 ||
    currentPosition.xycoordinates.X > upperRightCoordinates.X ||
    currentPosition.xycoordinates.Y < 0 ||
    currentPosition.xycoordinates.Y > upperRightCoordinates.Y
  )
    return false;
  return true;
}
