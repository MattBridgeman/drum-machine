import { NEW_TRACK_LOADING } from "../constants/track.constants";
import { timeout } from "../library/audio-api/interval";
import { loadDefaultTrack } from "../actions/track.actions";
import { matchesTrackRoute, matchesNewPath } from "../library/routing/routing";
import rootReducer from "../reducers/root.reducer"


export const track = store => next => {

  let matchesNewTrack = (oldId, newId) => newId !== oldId;

  let checkNewTrack = action => {
    let prevState = store.getState();
    let nextState = rootReducer(prevState, action);
    if(!prevState.router.location) return;
    let isNewPath = matchesNewPath(prevState.router.location.pathname, nextState.router.location.pathname);
    let trackRoute = matchesTrackRoute(nextState.router.location.pathname);
    let isTrackRoute = !!trackRoute;
    let newUserId = isTrackRoute ? trackRoute.params.userId : undefined;
    let newTrackId = isTrackRoute ? trackRoute.params.trackId : undefined;
    let noTrackLoaded = !prevState.track.trackId;
    let isNewTrack = matchesNewTrack(prevState.track.trackId, newTrackId);
    if(isNewPath && isTrackRoute && (noTrackLoaded || isNewTrack)){
      onNewTrackLoading(newUserId, newTrackId);
    }
  };

  let onNewTrackLoading = (userId, trackId) => {
    let shouldLoadDefault = !userId;
    if(shouldLoadDefault) {
      timeout.get().then(_ => {
        next(loadDefaultTrack());
      });
    } else {
      //load track from db
    }
  };

	return action => {
    checkNewTrack(action);
    return next(action);
  }
};