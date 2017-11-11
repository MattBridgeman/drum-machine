import { matchPath } from "react-router";

export let matchesNewPath = (oldPath, newPath) => {
  return oldPath !== newPath;
};

export let matchesUserTrackRoute = path => matchPath(path, "/users/:userId/tracks/:trackId");

export let matchesDefaultTrackRoute = path => matchPath(path, "/");

export let matchesTrackRoute = path => matchesUserTrackRoute(path) || matchesDefaultTrackRoute(path);

export let buildTrackRoute = (userId, trackId) => `/users/${userId}/tracks/${trackId}`;