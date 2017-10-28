import { NEW_TRACK_LOADING } from "../constants/track.constants";
import { timeout } from "../library/audio-api/interval";
import { loadDefaultTrack } from "../actions/track.actions";

export const track = store => next => {
  let onNewTrackLoading = (action) => {
    let shouldLoadDefault = !action.userId;
    if(shouldLoadDefault) {
      timeout.get().then(_ => {
        next(loadDefaultTrack());
      });
    } else {
      //load track from db
    }
  };

	return action => {
    switch(action.type) {
      case NEW_TRACK_LOADING:
        onNewTrackLoading(action);
        return next(action);
      default:
        return next(action);
    }
  }
};