import { unique } from "../library/natives/numbers";
import { NEW_TRACK_LOADING, LOAD_DEFAULT_TRACK, NEW_TRACK_LOADED } from "../constants/track.constants";
import { ON_NEW_INSTRUMENT } from "../constants/instruments.constants";
import { fromJS, Map } from "immutable";
import { newId } from "../library/utils";

let initialState = [];

let defaultState = [{
  id: 0,
  from: {
    machineId: 0,
    type: "drumMachine",
    nodePath: "outputs/main"
  },
  to: {
    machineId: 0,
    type: "master",
    nodePath: "inputs/main"
  }
},{
  id: 1,
  from: {
    machineId: 0,
    type: "drumMachine",
    nodePath: "outputs/send1"
  },
  to: {
    machineId: 0,
    type: "reverb",
    nodePath: "inputs/main"
  }
},{
  id: 2,
  from: {
    machineId: 0,
    type: "reverb",
    nodePath: "outputs/main"
  },
  to: {
    machineId: 0,
    type: "master",
    nodePath: "inputs/main"
  }
},{
  id: 3,
  from: {
    machineId: 0,
    type: "synth",
    nodePath: "outputs/main"
  },
  to: {
    machineId: 0,
    type: "master",
    nodePath: "inputs/main"
  }
}];

let uniqueGenerator = unique();

export default function connections(state = initialState, action) {
  const { instrumentType, machineId } = action;
  let $state = fromJS(state);
  let nextId = newId(state.map(({ id }) => id));
  switch(action.type) {
    case NEW_TRACK_LOADING:
      return initialState;
    case LOAD_DEFAULT_TRACK:
      return defaultState;
    case NEW_TRACK_LOADED:
      return action.connections;
    case ON_NEW_INSTRUMENT:
      $state = $state.push(Map({
        id: nextId,
        from: Map({
          machineId,
          type: instrumentType,
          nodePath: "outputs/main"
        }),
        to: Map({
          machineId: 0,
          type: "master",
          nodePath: "inputs/main"
        })
      }))
      if(instrumentType === "drumMachine") {
        $state = $state.push(Map({
          id: ++nextId,
          from: Map({
            machineId,
            type: instrumentType,
            nodePath: "outputs/send1"
          }),
          to: Map({
            machineId: 0,
            type: "reverb",
            nodePath: "inputs/main"
          })
        }));
      } 
      return $state.toJS();
    default:
      return state;
  }
};