import { matchesUserTracksRoute } from "../library/routing/routing";
import { loadUserTracks } from "../library/firebase/db";
import rootReducer from "../reducers/root.reducer";
import { userTracksLoading, userTracksLoaded } from "../actions/tracks.actions";
import { timeout } from "../library/audio-api/interval";

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
      let { userId } = userTracksRoute;
      //loading action
      timeout.get().then(_ => {
        next(userTracksLoading(userId));
      })
      .then(_ => {
        loadUserTracks(userId)
          .then(tracks => {
            userTracksLoaded(userId, tracks);
          });
      });
    }
  };

  return action => {
    checkLoadUserTracks(action);
    return next(action);
  };
};