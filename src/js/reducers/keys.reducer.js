import { KEYDOWN, KEYUP } from "../constants/keys.constants";

//example entry
// {
//   keyCode: "36"
//   keyName: "home",
//   time: 1234
// }

let initialState = [];

export default function keys(state = initialState, action) {
  let { keyCode, keyName, time } = action;
  switch (action.type) {
    case KEYDOWN:
      return [
        {
          keyCode,
          keyName,
          time
        },
        ...state.filter(key => key.keyCode !== keyCode)
      ]
    case KEYUP:
      return state.filter(key => key.keyCode !== keyCode)
    default:
      return state;
  }
}