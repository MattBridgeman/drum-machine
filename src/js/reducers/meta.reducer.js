import { CHANGE_TRACK_TITLE, CHANGE_TRACK_CREATED_DATE } from "../constants/meta.constants";
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
    case CHANGE_TRACK_CREATED_DATE:
      return {
        ...state,
        date: action.date
      };
    default:
      return state;
  }
}