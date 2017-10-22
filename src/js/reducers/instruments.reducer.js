import { unique } from "../library/natives/numbers";
import { NEW_TRACK_LOADING } from "../constants/track.constants";

let initialState = [];

let defaultState = [{
  id: 0,
  type: "drumMachine",
  machineId: 0,
  selected: true
},{
  id: 1,
  type: "reverb",
  machineId: 0,
  selected: false
},{
  id: 3,
  type: "master",
  machineId: 0,
  selected: false
}];

let uniqueGenerator = unique();

export default function instruments(state = initialState, action) {
  switch (action.type) {
    case NEW_TRACK_LOADING:
      return initialState;
    default:
      return state;
  }
}