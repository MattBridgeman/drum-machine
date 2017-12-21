import { NEW_TRACK_LOADING, LOAD_DEFAULT_TRACK, NEW_TRACK_SAVE, NEW_TRACK_LOADED } from "../constants/track.constants";
import { USER_TRACKS_LOADING, USER_TRACKS_LOADED } from "../constants/tracks.constants";

//Tracks States: "idle", "loading"

let defaultState = {
  state: "idle",
  tracks: {
    //userId: []
  }
};

export default function tracks(state = defaultState, action) {
  switch (action.type) {
    case USER_TRACKS_LOADING:
      return {
        ...state,
        state: "loading"
      }
    case USER_TRACKS_LOADED:
      return {
        state: "idle",
        tracks: {
          ...state.tracks,
          [action.userId]: action.tracks
        }
      }
    default:
      return state;
  }
}