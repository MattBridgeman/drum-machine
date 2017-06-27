import { NEW_BUFFER_SEGMENT, CLEAR_BUFFER_SEGMENTS } from "../constants/buffer.constants";
import { unique } from "../library/natives/numbers";

let initialState = [];

export default function buffer(state = initialState, action) {
  switch (action.type) {
    case NEW_BUFFER_SEGMENT:
      let { time, index } = action;
      return [...state, {
        time,
        index,
        bar: 0,
        id: unique()
      }];
    case CLEAR_BUFFER_SEGMENTS:
      return [];
    default:
      return state;
  }
}