import { PLAY_PREVIEW, PAUSE_PREVIEW, LOADING_PREVIEW } from "../constants/preview.constants";

//state: idle, loading, playing

const initialState = {
  state: "idle",
  soundId: undefined
};

export default function preview(state = initialState, action) {
  switch(action.type){
    case PLAY_PREVIEW:
      return {
        state: "playing",
        soundId: action.id
      };
    case PAUSE_PREVIEW:
      return {
        ...state,
        state: "idle"
      };
    case LOADING_PREVIEW:
      return {
        state: "loading",
        soundId: action.id
      };
    default:
      return state;
  }
};