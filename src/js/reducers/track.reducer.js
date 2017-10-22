import { NEW_TRACK_LOADING } from "../constants/track.constants";

//Track States: "idle", "loading", "ready", "clear"

let initialState = {
  name: "Untitled Track",
  trackId: undefined,
  userId: undefined,
  state: "idle"
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case NEW_TRACK_LOADING:
      return {
        ...state,
        trackId: action.trackId,
        userId: action.userId,
        state: "loading"
      }
    default:
      return state;
  }
}