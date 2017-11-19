import { CHANGE_TRACK_TITLE } from "../constants/meta.constants";
import { NEW_TRACK_LOADING, LOAD_DEFAULT_TRACK, NEW_TRACK_LOADED } from "../constants/track.constants";

let initialState = {
  title: "Untitled Track"
};

export default function meta(state = initialState, action) {
  switch (action.type) {
    case NEW_TRACK_LOADING:
      return initialState;
    case LOAD_DEFAULT_TRACK:
      return initialState;
    case NEW_TRACK_LOADED:
      return action.meta;
    case CHANGE_TRACK_TITLE:
      return {
        ...state,
        title: action.title
      };
    default:
      return state;
  }
}