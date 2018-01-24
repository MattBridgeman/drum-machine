import { PLAY_PREVIEW, PAUSE_PREVIEW } from "../constants/preview.constants";

export let playPreview = id => {
  return {
    type: PLAY_PREVIEW,
    id
  };
};

export let pausePreview = () => {
  return {
    type: PAUSE_PREVIEW
  };
};