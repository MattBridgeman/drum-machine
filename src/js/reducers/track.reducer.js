import { TRACK_STATE_CHANGE } from "../constants/track.constants";

//Track States: "idle", "loading", "ready", "clear"

let initialState = {
  name: "Untitled Track",
  trackId: undefined,
  userId: undefined,
  state: "idle"
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