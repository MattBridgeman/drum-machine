import { NEW_BUFFER_SEGMENT, CLEAR_BUFFER_SEGMENTS, CLEAR_BUFFER_SEGMENT } from "../constants/buffer.constants";
import { unique } from "../library/natives/numbers";

let initialState = [];
let uniqueGenerator = unique();

export default function buffer(state = initialState, action) {
  switch (action.type) {
    case NEW_BUFFER_SEGMENT:
      let { time, index } = action;
      return [...state, {
        time,
        index,
        bar: 0,
        id: uniqueGenerator()
      }];
    case CLEAR_BUFFER_SEGMENT:
      return state.filter(segment => segment.id !== action.id);
    case CLEAR_BUFFER_SEGMENTS:
      return [];
    default:
      return state;
  }
}