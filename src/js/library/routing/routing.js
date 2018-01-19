import { matchPath } from "react-router";

export let matchesNewPath = (oldPath, newPath) => {
  return oldPath !== newPath;
};

export let exactMatchPath = (path, pattern) => {
  let match = matchPath(path, pattern);
  let pathsItems = path.split("/").filter(item => !!item);
  let patternItems = pattern.split("/").filter(item => !!item);
  if(!!match && pathsItems.length === patternItems.length) {
    return match;
  }
};

export let matchesUserSamplesRoute = path => matchPath(path, "/users/:userId/samples/");

export let matchesUserTrackRoute = path => matchPath(path, "/users/:userId/tracks/:trackId");

export let matchesUserTracksRoute = path => !matchesUserTrackRoute(path) ? matchPath(path, "/users/:userId/tracks/") : false;

export let matchesDefaultTrackRoute = path => matchPath(path, "/");

export let matchesNewTrack = (oldId, newId) => newId !== oldId;

export let matchesTrackRoute = path => matchesUserTrackRoute(path) || matchesDefaultTrackRoute(path);

export let buildTrackRoute = (userId, trackId) => `/users/${userId}/tracks/${trackId}`;