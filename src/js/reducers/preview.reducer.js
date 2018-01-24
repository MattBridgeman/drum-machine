import { PLAY_PREVIEW, PAUSE_PREVIEW } from "../constants/preview.constants";

const initialState = {
  isPlaying: false,
  soundId: undefined
};

export default function preview(state = initialState, action) {
  switch(action.type){
    case PLAY_PREVIEW:
      return {
        isPlaying: true,
        soundId: action.id
      };
    case PAUSE_PREVIEW:
      return {
        ...state,
        isPlaying: false
      };
    default:
      return state;
  }
};