import { unique } from "../library/natives/numbers";
import { NEW_TRACK_LOADING, LOAD_DEFAULT_TRACK, NEW_TRACK_LOADED } from "../constants/track.constants";

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
},{
  id: 4,
  type: "synth",
  machineId: 0,
  selected: false
}];

let uniqueGenerator = unique();

export default function instruments(state = initialState, action) {
  switch (action.type) {
    case NEW_TRACK_LOADING:
      return initialState;
    case LOAD_DEFAULT_TRACK:
      return defaultState;
    case NEW_TRACK_LOADED:
      return action.instruments;
    default:
      return state;
  }
}