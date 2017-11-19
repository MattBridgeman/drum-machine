

export const meta = store => next => {

  let onSaveTrack = action => {

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