import { NEW_TRACK_LOADING } from "../constants/track.constants";

export function newTrackLoading(userId, trackId) {
  return {
    type: NEW_TRACK_LOADING,
    userId,
    trackId
  };
};