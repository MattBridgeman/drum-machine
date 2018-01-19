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

export let matchesUserSamplesRoute = path => exactMatchPath(path, "/users/:userId/samples/");

export let matchesUserTrackRoute = path => exactMatchPath(path, "/users/:userId/tracks/:trackId");

export let matchesUserTracksRoute = path => exactMatchPath(path, "/users/:userId/tracks/");

export let matchesDefaultTrackRoute = path => exactMatchPath(path, "/");

export let matchesNewTrack = (oldId, newId) => newId !== oldId;

export let matchesTrackRoute = path => matchesUserTrackRoute(path) || matchesDefaultTrackRoute(path);

export let buildTrackRoute = (userId, trackId) => `/users/${userId}/tracks/${trackId}`;