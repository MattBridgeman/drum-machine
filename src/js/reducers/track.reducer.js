import { TRACK_STATE_CHANGE } from "../constants/track.constants";

let initialState = {
  name: "Untitled Track",
  userId: undefined,
  state: "preload"
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case TRACK_STATE_CHANGE:
      return {
        ...state,
        state: action.state
      }
    default:
      return state;
  }
}