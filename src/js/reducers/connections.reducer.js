import { unique } from "../library/natives/numbers";

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
}];

let uniqueGenerator = unique();

export default function connections(state = initialState, action) {
  return state;
};