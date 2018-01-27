import { PLAY_PREVIEW, PAUSE_PREVIEW, LOADING_PREVIEW } from "../constants/preview.constants";

export let playPreview = (userId, id) => {
  return {
    type: PLAY_PREVIEW,
    userId,
    id
  };
};

export let pausePreview = () => {
  return {
    type: PAUSE_PREVIEW
  };
};

export let loadingPreview = id => {
  return {
    type: LOADING_PREVIEW,
    id
  };
};