import { push } from "react-router-redux";
import { NEW_TRACK_LOADING } from "../constants/track.constants";
import { timeout } from "../library/audio-api/interval";
import { loadDefaultTrack, newTrackLoading, newTrackSave, newTrackLoaded } from "../actions/track.actions";
import { newNotification } from "../actions/notifications.actions";
import { matchesTrackRoute, matchesNewPath, matchesNewTrack, buildTrackRoute } from "../library/routing/routing";
import { saveTrack, getNewTrackKey, loadTrack } from "../library/firebase/db";
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

export const isNewTrack = store => next => action => {
  let prevState = store.getState();
  let nextState = rootReducer(prevState, action);
  if(!prevState.router.location) return;
  let trackRoute = matchesTrackRoute(nextState.router.location.pathname);
  let isTrackRoute = !!trackRoute;
  let newUserId = isTrackRoute ? trackRoute.params.userId : undefined;
  let newTrackId = isTrackRoute ? trackRoute.params.trackId || "default" : undefined;
  let noTrackLoaded = !prevState.track.trackId;
  let newTrack = matchesNewTrack(prevState.track.trackId, newTrackId);
  let isLoadingTrack = nextState.track.state === "loading";
  if(isTrackRoute && (noTrackLoaded || newTrack) && !isLoadingTrack){
    return {
      newUserId, newTrackId
    }
  };
};

export const track = store => next => {

  let checkNewTrack = isNewTrack(store)(next);

  let shouldLoadNewTrack = action => {
    let newTrack = checkNewTrack(action);
    if(!!newTrack){
      let { newUserId, newTrackId } = newTrack;
      loadNewTrack(newUserId, newTrackId);
    }
  };

  let loadNewTrack = (userId, trackId) => {
    let shouldLoadDefault = !userId;
    timeout.get().then(_ => {
      next(newTrackLoading(userId, trackId));
    })
    .then(_ => {
      if(shouldLoadDefault) {
        timeout.get().then(_ => {
          next(loadDefaultTrack());
        });
      } else {
        loadTrack(userId, trackId)
          .then(state => {
            next(newTrackLoaded(state));
            next(newNotification("Track loaded!"));
          })
          .catch(error => {
            next(newNotification("Error loading track"));
          });
      }
    })
  };

  let getStateToSave = state => stateToSave
    .reduce((prev, key) => {
      prev[key] = state[key]
      return prev
    }, {});

  let onSaveTrack = action => {
    let prevState = store.getState();
    let nextState = rootReducer(prevState, action);
    let { userId, trackId } = nextState.track;
    if(!trackId || trackId === "default") {
      userId = nextState.auth.user.uid;
      getNewTrackKey(userId)
        .then(key => {
          trackId = key;
          //TODO: Tidy this logic so it doesn't have to be done in this order
          nextState = rootReducer(nextState, newTrackSave(userId, trackId));
          return saveTrack(userId, key, getStateToSave(nextState));
        })
        .then(() => {
          return timeout.get().then(_ => {
            next(newTrackSave(userId, trackId));
            next(push(buildTrackRoute(userId, trackId)));
            next(newNotification("Track saved!"));
          });
        })
        .catch(error => {
          next(newNotification("Error saving track"));
        });
    } else {
      saveTrack(userId, trackId, getStateToSave(nextState))
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
        shouldLoadNewTrack(action);
        return next(action);
    }
  }
};