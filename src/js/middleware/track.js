import { NEW_TRACK_LOADING } from "../constants/track.constants";

export const track = store => next => {
  let onNewTrackLoading = (action) => {
    let shouldLoadDefault = !action.userId;
    if(shouldLoadDefault) {
      //dispatch "load default track action"
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