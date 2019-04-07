import { NEW_BUFFER_SEGMENT, CLEAR_BUFFER_SEGMENTS, CLEAR_BUFFER_SEGMENT } from "../constants/buffer.constants";
import { NEW_TRACK_LOADING } from "../constants/track.constants";
import { unique } from "../library/natives/numbers";
import { last } from "../library/natives/array";

let initialState = [];
let uniqueGenerator = unique();

export default function buffer(state = initialState, action) {
  switch (action.type) {
    case NEW_BUFFER_SEGMENT:
      let { time, index } = action;
      let lastEntry = last(state || []);
      let lastId = lastEntry ? lastEntry.id : -1;
      return [...state, {
        time,
        index,
        bar: 0,
        id: lastId + 1
      }];
    case CLEAR_BUFFER_SEGMENT:
      return state.filter(segment => segment.id !== action.id);
    case CLEAR_BUFFER_SEGMENTS:
      return [];
    case NEW_TRACK_LOADING:
      return initialState;
    default:
      return state;
  }
}