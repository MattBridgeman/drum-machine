import { NEW_TRACK_LOADING, LOAD_DEFAULT_TRACK, TRACK_SAVE, NEW_TRACK_SAVE, NEW_TRACK_LOADED } from "../constants/track.constants";

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

export function newTrackSave(userId, trackId) {
  return {
    type: NEW_TRACK_SAVE,
    userId,
    trackId
  };
};

export function newTrackLoaded(state) {
  return {
    type: NEW_TRACK_LOADED,
    ...state
  };
};