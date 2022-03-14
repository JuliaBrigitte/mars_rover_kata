import { Coordinates, endMarsRover, upperRightCoordinates } from "./index";
import { clear, print, askQuestion } from "./console";
import { getSecondLineOfInput } from "./second_line_of_input";

const directions = ["N", "E", "W", "S"];

export type coordinatePosition = {
  xycoordinates: Coordinates;
  direction: string;
};

export let currentPosition: coordinatePosition = {
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
    "Please enter the first line of input separated by space: ",
    checkFirstLineOfInput
  );
}

function checkFirstLineOfInput(coordinates: string) {
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

function checkIfCordinatesAreValid(coordinates: string) {
  let firstLineOfInput: string[] = coordinates
    .replace(/\s+/g, " ")
    .trim()
    .split(" ");

  if (firstLineOfInput.length != 3) return false;
  currentPosition = {
    xycoordinates: {
      X: Number(firstLineOfInput[0]),
      Y: Number(firstLineOfInput[1]),
    },
    direction: firstLineOfInput[2],
  };

  if (
    !directions.includes(currentPosition.direction) ||
    Number(currentPosition.xycoordinates.X) < 0 ||
    Number(currentPosition.xycoordinates.X) > upperRightCoordinates.X ||
    Number(currentPosition.xycoordinates.Y) < 0 ||
    Number(currentPosition.xycoordinates.Y) > upperRightCoordinates.Y
  )
    return false;
  return true;
}
