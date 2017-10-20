import { unique } from "../library/natives/numbers";

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
    default:
      return state;
  }
}