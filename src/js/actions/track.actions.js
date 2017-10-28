import { NEW_TRACK_LOADING, LOAD_DEFAULT_TRACK } from "../constants/track.constants";

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