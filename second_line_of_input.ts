import { Coordinates, endMarsRover, upperRightCoordinates } from "./index";
import { clear, print, askQuestion } from "./console";
import {
  CoordinatePosition,
  currentPosition,
  getFirstLineOfInput,
  directions,
} from "./first_line_of_input";

let newCurrentPosition: CoordinatePosition;

//prompt the user to get second line of input
export function getSecondLineOfInput() {
  clear(false);
  print("------------------------");
  print(`🥳Perfect !! 🥳`);
  print("------------------------");

  print("Now we can send our rover on the Mars mission!! ");
  askQuestion(
    "Please enter the second line of input separated to find the Rover position (Please Enter L/R/M): ",
    checkSecondLineOfInput
  );
}

function checkSecondLineOfInput(movement: string) {
  if (movement && movement.length > 0) {
    if (checkIfMovementIsValid(movement)) {
      newCurrentPosition = { ...currentPosition };
      return getOutput(movement);
    } else {
      print("***************************************");
      print("Ohho!! You did not follow the movement rules ☹");
      return endMarsRover();
    }
  } else {
    print(`You did not enter the Second Line of Input :(`);
    return endMarsRover();
  }
}

function checkIfMovementIsValid(movement: string) {
  let regExpression = new RegExp("L|M|R");
  return regExpression.test(movement.toUpperCase());
}

//This function is for test cases not used in the app itself
export function getRoverposition(
  movement: string,
  upperRightCoordinates1: Coordinates,
  startPosition: CoordinatePosition
): string {
  newCurrentPosition = { ...startPosition };
  newCurrentPosition.direction = newCurrentPosition.direction.toUpperCase();
  if (!directions.includes(newCurrentPosition.direction.toUpperCase()))
    return "Failed";

  return returnRoverPosition(movement);
}

function returnRoverPosition(movement: string): string {
  var movementArray: string[] = movement
    .toUpperCase()
    .replace(/\s+/g, "")
    .trim()
    .split("");

  for (let i = 0; i < movementArray.length; i++) {
    if (movementArray[i] == "L" || movementArray[i] == "R")
      setNewDirection(movementArray[i]);
    else if (movementArray[i] == "M") setOutput();
  }
  if (isValidOutput()) {
    return (
      newCurrentPosition.xycoordinates.X.toString() +
      " " +
      newCurrentPosition.xycoordinates.Y.toString() +
      " " +
      newCurrentPosition.direction
    );
  } else {
    return "Failed";
  }
}

function getOutput(movement: string) {
  if (
    getRoverposition(movement, upperRightCoordinates, newCurrentPosition) !=
    "Failed"
  ) {
    print("Great!! Your rover is currently at the position below ☹");
    print("***************************************");
    print(
      newCurrentPosition.xycoordinates.X.toString() +
        " " +
        newCurrentPosition.xycoordinates.Y.toString() +
        " " +
        newCurrentPosition.direction
    );
    print("***************************************");
    askQuestion("Press  enter to start again ", getFirstLineOfInput);
  } else {
    print("***************************************");
    print("Sadly, your rover has crashed! ☹");
    return endMarsRover();
  }
}

function setNewDirection(movement: string) {
  if (
    (movement == "L" && newCurrentPosition.direction == "N") ||
    (movement == "R" && newCurrentPosition.direction == "S")
  )
    newCurrentPosition.direction = "W";
  else if (
    (movement == "R" && newCurrentPosition.direction == "N") ||
    (movement == "L" && newCurrentPosition.direction == "S")
  )
    newCurrentPosition.direction = "E";
  else if (
    (movement == "L" && newCurrentPosition.direction == "W") ||
    (movement == "R" && newCurrentPosition.direction == "E")
  )
    newCurrentPosition.direction = "S";
  else if (
    (movement == "R" && newCurrentPosition.direction == "W") ||
    (movement == "L" && newCurrentPosition.direction == "E")
  )
    newCurrentPosition.direction = "N";
}

function setOutput() {
  if (newCurrentPosition.direction == "E") {
    newCurrentPosition.xycoordinates.X = newCurrentPosition.xycoordinates.X + 1;
  } else if (newCurrentPosition.direction == "W") {
    newCurrentPosition.xycoordinates.X = newCurrentPosition.xycoordinates.X - 1;
  } else if (newCurrentPosition.direction == "N") {
    newCurrentPosition.xycoordinates.Y = newCurrentPosition.xycoordinates.Y + 1;
  } else if (newCurrentPosition.direction == "S") {
    newCurrentPosition.xycoordinates.Y = newCurrentPosition.xycoordinates.Y - 1;
  }
}

function isValidOutput(): boolean {
  if (
    newCurrentPosition.xycoordinates.X < 0 ||
    newCurrentPosition.xycoordinates.X > upperRightCoordinates.X
  )
    return false;
  if (
    newCurrentPosition.xycoordinates.Y < 0 ||
    newCurrentPosition.xycoordinates.Y > upperRightCoordinates.Y
  )
    return false;
  return true;
}

//Trying to write code to exit the app if the user does not want to move his rover any further
// function checkNextAction(action: string): void {
//   if (action.toUpperCase() === "X") process.exit();
//   else getFirstLineOfInput();
// }
