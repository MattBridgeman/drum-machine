import { NEW_TRACK_LOADING } from "../constants/track.constants";
import { timeout } from "../library/audio-api/interval";
import { loadDefaultTrack, newTrackLoading, newTrackSave } from "../actions/track.actions";
import { newNotification } from "../actions/notifications.actions";
import { matchesTrackRoute, matchesNewPath } from "../library/routing/routing";
import { saveTrack, getNewTrackKey } from "../library/firebase/db";
import rootReducer from "../reducers/root.reducer";

export const stateToSave = [
  "connections",
  "drumMachine",
  "instruments",
  "reverb",
  "sounds",
  "tempo",
  "track"
];

export const track = store => next => {

  let matchesNewTrack = (oldId, newId) => newId !== oldId;

  let checkNewTrack = action => {
    let prevState = store.getState();
    let nextState = rootReducer(prevState, action);
    if(!prevState.router.location) return;
    let trackRoute = matchesTrackRoute(nextState.router.location.pathname);
    let isTrackRoute = !!trackRoute;
    let newUserId = isTrackRoute ? trackRoute.params.userId : undefined;
    let newTrackId = isTrackRoute ? trackRoute.params.trackId || "default" : undefined;
    let noTrackLoaded = !prevState.track.trackId;
    let isNewTrack = matchesNewTrack(prevState.track.trackId, newTrackId);
    let isLoadingTrack = nextState.track.state === "loading";
    if(isTrackRoute && (noTrackLoaded || isNewTrack) && !isLoadingTrack){
      onNewTrackLoading(newUserId, newTrackId);
    }
  };

  let onNewTrackLoading = (userId, trackId) => {
    let shouldLoadDefault = !userId;
    timeout.get().then(_ => {
      next(newTrackLoading(userId, trackId));
    })
    .then(_ => {
      if(shouldLoadDefault) {
        timeout.get().then(_ => {
          next(loadDefaultTrack());
          timeout.get().then()
        });
      } else {
        //load track from db
      }
    })
  };

  var onSaveTrack = action => {
    let prevState = store.getState();
    let nextState = rootReducer(prevState, action);
    let { userId, trackId } = nextState.track;
    if(!trackId || trackId === "default") {
      userId = nextState.auth.user.uid;
      getNewTrackKey(userId)
        .then(key => {
          trackId = key;
          return saveTrack(userId, key, { foo: "new track" });
        })
        .then(() => {
          timeout.get().then(_ => {
            next(newTrackSave(userId, trackId));
            next(newNotification("Track saved!"));
          });
        })
        .catch(error => {
          next(newNotification("Error saving track"));
        });
    } else {
      saveTrack(userId, trackId, { foo: "bazz" })
        .then(() => {
          next(newNotification("Track saved!"));
        })
        .catch(error => {
          next(newNotification("Error saving track"));
        });
    }
  };

	return action => {
    switch(action.type){
      case "TRACK_SAVE":
        onSaveTrack(action);
        return next(action);
      default:
        checkNewTrack(action);
        return next(action);
    }
  }
};