import { NEW_TRACK_LOADING, LOAD_DEFAULT_TRACK, TRACK_SAVE } from "../constants/track.constants";

export function newTrackLoading(userId, trackId) {
  return {
    type: NEW_TRACK_LOADING,
    userId,
    trackId
  };
};

export function loadDefaultTrack() {
  return {
    type: LOAD_DEFAULT_TRACK
  };
};

export function saveTrack() {
  return {
    type: TRACK_SAVE
  };
};