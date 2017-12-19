import { matchesUserTracksRoute } from "../library/routing/routing";
import rootReducer from "../reducers/root.reducer";

export const tracks = store => next => {

  let isNewUserTracksRoute = action => {
    let prevState = store.getState();
    let nextState = rootReducer(prevState, action);
  
    if(!prevState.router.location) return;
  
    let userTracksRoute = matchesUserTracksRoute(nextState.router.location.pathname);
    let isLoadingTracks = nextState.tracks.state === "loading";
    let isUserTracksRoute = !!userTracksRoute;
  
    if(isLoadingTracks || !isUserTracksRoute) return;
  
    let { userId } = userTracksRoute.params;

    return {
      userId
    }
  };

  let checkLoadUserTracks = action => {
    let userTracksRoute = isNewUserTracksRoute(action);
    if(!!userTracksRoute) {
      //load tracks from db
      console.log("load tracks");
    }
  };

  return action => {
    checkLoadUserTracks(action);
    return next(action);
  };
};