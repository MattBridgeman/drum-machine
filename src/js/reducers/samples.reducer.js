import { SAMPLES_LOADING, SAMPLES_LOADED, SAMPLES_LOAD_ERROR } from "../constants/samples.constants";

//Uploads States: "idle", "loading", "loaded", "error"

let defaultState = {
  state: "idle",
  samples: {
    //userId: []
  }
};

export default function samples(state = defaultState, action) {
  switch (action.type) {
    case SAMPLES_LOADING:
      return {
        ...state,
        state: "loading"
      }
    case SAMPLES_LOADED:
      return {
        ...state,
        state: "loaded",
        tracks: {
          ...state.tracks,
          [action.userId]: action.tracks
        }
      }
    case SAMPLES_LOAD_ERROR:
      return {
        ...state,
        state: "error",
        error: action.error
      }
    default:
      return state;
  }
}