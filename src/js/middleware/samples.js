import rootReducer from "../reducers/root.reducer";
import { matchesUserSamplesRoute } from "../library/routing/routing";
import { isNewTrack } from "./track";
import { UPLOAD_SAMPLE, DELETE_SAMPLE } from "../constants/samples.constants";
import { getValueFromPath } from "../library/natives/object";
import { getDateToISOString } from "../library/natives/date";
import { timeout } from "../library/audio-api/interval";
import { uploadUserSample, loadUserSamples, deleteUserSample } from "../library/firebase/db";
import { newSampleUploaded, samplesLoaded, samplesUploadError, sampleUploading, sampleDeleted } from "../actions/samples.actions";
import { newNotification } from "../actions/notifications.actions";

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
        })
        .catch(error => {
          next(newNotification("There was an error loading the samples."));
        });;
    }
  };
  
  let onUploadSample = action => {
    let { name, shortName, file } = action;
    let { samples, auth } = store.getState();
    let uploadState = getValueFromPath(samples, "upload/state");
    let userId = getValueFromPath(auth, "user/uid");
    if(uploadState !== "idle") return;
    let createdDate = getDateToISOString();
    timeout.get().then(_ => {
      next(sampleUploading());
    });
    uploadUserSample(userId, file, name, shortName, createdDate)
      .then(sample => {
        next(newSampleUploaded(sample));
      })
      .catch(error => {
        next(samplesUploadError());
        next(newNotification("There was an error uploading the sample."));
      });
  };

  let onDeleteSample = action => {
    let { id, userId } = action;
    let { samples, auth } = store.getState();
    let sampleUrl = getValueFromPath(samples, `samples/${userId}/${id}/path`);
    deleteUserSample(userId, id, sampleUrl)
      .then(_ => {
        next(sampleDeleted(userId, id));
        next(newNotification("Sample deleted."));
      })
      .catch(error => {
        //TODO: fire sample delete error action
        next(newNotification("There was an error deleting the sample."));
      });
  };

  return action => {
    switch(action.type){
      case UPLOAD_SAMPLE:
        onUploadSample(action);
      case DELETE_SAMPLE:
        onDeleteSample(action);
      default:
        onLoadUserSamples(action);
    }
    return next(action);
  }
};