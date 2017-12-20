import { init } from "./firebase";

let getNewTrackKey = (userId) => {
  return init()
    .then(() =>{
      var database = firebase.database();
      return database.ref(`users/${userId}`).child("tracks").push().key      
    });
};

let saveTrack = (userId, trackId, json) => {
  return init()
    .then(() => {
      var database = firebase.database();
      return database.ref(`users/${userId}/tracks/` + trackId)
        .set(json);
    });
};

let loadTrack = (userId, trackId) => {
  return init()
    .then(() => {
      var database = firebase.database();
      return database.ref(`users/${userId}/tracks/` + trackId)
        .once("value")
        .then(snapshot => snapshot.val());
    });
};

let loadUserTracks = userId => {
  return init()
    .then(() => {
      firebase.database().ref(`users/${userId}/tracks/`).orderByChild("meta/updatedDate").once("value")
      .then(function(snapshot) {
        let tracks = [];
        snapshot.forEach(shot => tracks.push(shot.val()));
        tracks.reverse();
        return tracks;
      });
    });
};

export { getNewTrackKey, saveTrack, loadTrack, loadUserTracks };