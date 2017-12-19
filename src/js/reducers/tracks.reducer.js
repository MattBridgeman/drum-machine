import { NEW_TRACK_LOADING, LOAD_DEFAULT_TRACK, NEW_TRACK_SAVE, NEW_TRACK_LOADED } from "../constants/track.constants";

//Tracks States: "idle", "loading"

let defaultState = {
  state: "idle",
  userId: undefined,
  tracks: []
};

export default function tracks(state = defaultState, action) {
  switch (action.type) {
    default:
      return state;
  }
}