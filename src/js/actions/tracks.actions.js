import { USER_TRACKS_LOADING, USER_TRACKS_LOADED } from "../constants/tracks.constants";

export const userTracksLoading = userId => {
  return {
    type: USER_TRACKS_LOADING,
    userId
  };
};

export const userTracksLoaded = (userId, tracks) => {
  return {
    type: USER_TRACKS_LOADED,
    userId,
    tracks
  };
};