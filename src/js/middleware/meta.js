import { getDateToISOString } from "../library/natives/date";
import { changeTrackCreatedDate } from "../actions/meta.actions";

export const meta = store => next => {

  let onSaveTrack = action => {
    let state = store.getState();
    let { createdDate } = state.meta;
    if(!createdDate){
      createdDate = getDateToISOString();
      next(changeTrackCreatedDate(createdDate));
    }
  };

	return action => {
    switch(action.type){
      case "TRACK_SAVE":
        onSaveTrack(action);
        return next(action);
      default:
        return next(action);
    }
  }
};