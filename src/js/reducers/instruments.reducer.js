//import { NEW_BUFFER_SEGMENT, CLEAR_BUFFER_SEGMENTS, CLEAR_BUFFER_SEGMENT } from "../constants/buffer.constants";
import { unique } from "../library/natives/numbers";

let initialState = [{
  id: 0,
  type: "drumMachine",
  machineId: 0,
  selected: true
}];

let uniqueGenerator = unique();

export default function instruments(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}