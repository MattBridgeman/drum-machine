import { NEW_TRACK_LOADING, LOAD_DEFAULT_TRACK, NEW_TRACK_SAVE, NEW_TRACK_LOADED } from "../constants/track.constants";

//Track States: "idle", "loading"

let initialState = {};

let defaultState = {
  name: "Untitled Track",
  trackId: "default",
  userId: undefined,
  state: "idle",
  write: true
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case NEW_TRACK_LOADING:
      return {
        ...state,
        trackId: action.trackId,
        userId: action.userId,
        state: "loading"
      };
    case LOAD_DEFAULT_TRACK:
      return defaultState;
    case NEW_TRACK_SAVE:
      return {
        ...state,
        trackId: action.trackId,
        userId: action.userId
      };
    case NEW_TRACK_LOADED:
      return {
        ...state,
        ...action.track,
        state: "idle",
        write: action.write
      }
    default:
      return state;
  }
}