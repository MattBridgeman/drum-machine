import { unique } from "../library/natives/numbers";
import { NEW_TRACK_LOADING, LOAD_DEFAULT_TRACK, NEW_TRACK_LOADED } from "../constants/track.constants";
import { CHANGE_INSTRUMENT, ON_NEW_INSTRUMENT, DELETE_INSTRUMENT } from "../constants/instruments.constants";
import { Map, fromJS } from "immutable";

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

export default function instruments(state = initialState, action) {
  let { id, instrumentType, machineId } = action;
  let $state = fromJS(state);
  switch (action.type) {
    case NEW_TRACK_LOADING:
      return initialState;
    case LOAD_DEFAULT_TRACK:
      return defaultState;
    case NEW_TRACK_LOADED:
      return action.instruments;
    case CHANGE_INSTRUMENT:
      return $state.map(item => {
        if(item.get('id') === id) {
          return item.set("selected", true)
        } else {
          return item.set("selected", false)
        }
      }).toJS();
    case ON_NEW_INSTRUMENT:
      return $state
        .map(item => item.set("selected", false))
        .push(Map({
          id,
          type: instrumentType,
          machineId,
          selected: true
        })).toJS();
    case DELETE_INSTRUMENT:
      return $state
        .filter(item => item.get("id") !== id).toJS();
    default:
      return state;
  }
}