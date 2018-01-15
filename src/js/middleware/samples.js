import rootReducer from "../reducers/root.reducer";
import { matchesUserSamplesRoute } from "../library/routing/routing";
import { isNewTrack } from "./track";
import { UPLOAD_SAMPLE } from "../constants/samples.constants";
import { getValueFromPath } from "../library/natives/object";
import { getDateToISOString } from "../library/natives/date";
import { uploadUserSample } from "../library/firebase/db";

export const samples = store => next => {
  
  let isSamplesRoute = action => {
    let prevState = store.getState();
    let nextState = rootReducer(prevState, action);
  
    if(!prevState.router.location) return;
  
    let userRoute = matchesUserSamplesRoute(nextState.router.location.pathname);
    let isUserRoute = !!userRoute;

    if(!isUserRoute) return;

    let { userId } = userRoute.params;
    return {
      userId
    }
  };

  let checkLoadUserSamples = action => {
    let newUserTrack = isNewTrack(store)(action);
    let samplesRoute = isSamplesRoute(action);
    return newUserTrack || samplesRoute;
  };

  let loadUserSamples = action => {
    let shouldLoadUserSamples = checkLoadUserSamples(action);
    if(shouldLoadUserSamples) {
      console.log("Should load user samples");
    }
  };
  
  let uploadSample = action => {
    let { name, shortName, file, auth } = action;
    let state = store.getState();
    let uploadState = getValueFromPath(state.samples, "upload/state");
    let userId = getValueFromPath(auth, "user/uid");
    if(uploadState !== "idle") return;
    let createdDate = getDateToISOString();
    uploadUserSample(userId, file, createdDate)
      .then(snapshot => console.log(snapshot));
  };

  return action => {
    switch(action.type){
      case UPLOAD_SAMPLE:
        uploadSample(action);
      default:
        loadUserSamples(action);
    }
    return next(action);
  }
};