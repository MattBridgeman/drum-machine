import rootReducer from "../reducers/root.reducer";
import { matchesUserSamplesRoute } from "../library/routing/routing";
import { isNewTrack } from "./track";
import { UPLOAD_SAMPLE } from "../constants/samples.constants";
import { getValueFromPath } from "../library/natives/object";
import { getDateToISOString } from "../library/natives/date";
import { uploadUserSample, loadUserSamples } from "../library/firebase/db";
import { newSampleUploaded, samplesLoaded } from "../actions/samples.actions";

export const samplesMiddleware = store => next => {
  
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

  let onLoadUserSamples = action => {
    let shouldLoadUserSamples = checkLoadUserSamples(action);
    if(shouldLoadUserSamples) {
      let { userId } = shouldLoadUserSamples;
      loadUserSamples(userId)
        .then(({ userId, samples }) => {
          next(samplesLoaded(userId, samples));
        });
    }
  };
  
  let onUploadSample = action => {
    let { name, shortName, file } = action;
    let { samples, auth } = store.getState();
    let uploadState = getValueFromPath(samples, "upload/state");
    let userId = getValueFromPath(auth, "user/uid");
    if(uploadState !== "idle") return;
    let createdDate = getDateToISOString();
    uploadUserSample(userId, file, name, shortName, createdDate)
      .then(sample => {
        next(newSampleUploaded(sample));
      });
  };

  return action => {
    switch(action.type){
      case UPLOAD_SAMPLE:
        onUploadSample(action);
      default:
        onLoadUserSamples(action);
    }
    return next(action);
  }
};