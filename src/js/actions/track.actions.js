import { TRACK_STATE_CHANGE, NEW_TRACK } from "../constants/track.constants";

export function trackStateChange(trackType) {
  return {
    type: TRACK_STATE_CHANGE,
    trackType
  };
};
export function newTrack(userId, trackId) {
  return {
    type: NEW_TRACK,
    userId,
    trackId
  };
};