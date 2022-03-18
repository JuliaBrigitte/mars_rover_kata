import * as index from './index';
import {getRoverposition} from './second_line_of_input';



describe("This is a parameterised test to get the rover position. The code handles extra space and is case insensitive. ", () => {
  test.each`
  upperRightCoordinates| startPosition| movement | result
  ${{X: 5,Y:5}}|${{xycoordinates:{X:1,Y:2}, direction:'N'}}|${"LM LML M LM M"} | ${"1 3 N"}
  ${{X: 5,Y:5}}|${{xycoordinates:{X:1,Y:2}, direction:'N'}}|${"LMlml M LM M"} | ${"1 3 N"}
  ${{X: 5,Y:5}}|${{xycoordinates:{X:1,Y:2}, direction:'N'}}|${"LMLMLMLMM"} | ${"1 3 N"}
  ${{X: 5,Y:5}}|${{xycoordinates:{X:1,Y:2}, direction:'N'}}|${"MMMMMM"} | ${"Failed"}
  ${{X: 5,Y:5}}|${{xycoordinates:{X:3,Y:3}, direction:'e'}}|${"MM RM M R MR RM"} | ${"5 1 E"}
  ${{X: 5,Y:-5}}|${{xycoordinates:{X:3,Y:3}, direction:'e'}}|${"MM RM M R MR RM"} | ${"Failed"}
  ${{X: 5,Y:-5}}|${{xycoordinates:{X:3,Y:3}, direction:'e'}}|${"MM RM M R MR RM"} | ${"Failed"}
  ${{X: 5,Y:5}}|${{xycoordinates:{X:13,Y:3}, direction:'e'}}|${"MM RM M R MR RM"} | ${"Failed"}
  ${{X: 5,Y:5}}|${{xycoordinates:{X:3,Y:3}, direction:'x'}}|${"MM RM M R MR RM"} | ${"Failed"}
 
`('Upper Right Coordinates : $upperRightCoordinates, Start Position: $startPosition. Test successful for $movement with a result : $result', ({upperRightCoordinates,startPosition,movement,result}) => {
 
  index.upperRightCoordinates = upperRightCoordinates;
 
expect(getRoverposition(movement,upperRightCoordinates,startPosition)).toBe(result);

});
});