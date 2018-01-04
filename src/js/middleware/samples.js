import rootReducer from "../reducers/root.reducer";
import { matchesUserSamplesRoute } from "../library/routing/routing";
import { isNewTrack } from "./track";

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

  return action => {
    loadUserSamples(action);
    return next(action);
  }
};