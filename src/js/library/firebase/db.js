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
      return database.ref(`users/${userId}/tracks/${trackId}`)
        .set(json);
    });
};

let loadTrack = (userId, trackId) => {
  return init()
    .then(() => {
      var database = firebase.database();
      return database.ref(`users/${userId}/tracks/${trackId}`)
        .once("value")
        .then(snapshot => snapshot.val());
    });
};

let loadUserTracks = userId => {
  return init()
    .then(() => {
      return firebase.database().ref(`users/${userId}/tracks/`).orderByChild("meta/updatedDate").once("value")
      .then(function(snapshot) {
        let tracks = [];
        snapshot.forEach(shot => {
          tracks = [
            ...tracks,
            shot.val()
          ]
        });
        tracks.reverse();
        return tracks;
      });
    });
};

let loadUserSamples = userId => {
  return init()
    .then(() => {
      return firebase.database().ref(`users/${userId}/samples/`).orderByChild("createdDate").once("value")
      .then(function(snapshot) {
        let samples = [];
        snapshot.forEach(shot => {
          samples = [
            ...samples,
            shot.val()
          ]
        });
        samples.reverse();
        return samples;
      });
    });
};

let uploadUserSample = (userId, file, name, shortName, createdDate) => {
  return init()
    .then(() => {
      let storage = firebase.storage().ref();
      let filename = name + createdDate;
      return storage.child(`user/${userId}/samples/${filename}`) 
        .put(file)
        .then(snapshot => {
          let sampleId = firebase.database().ref(`users/${userId}/samples/`).push().key 
          return firebase.database().ref(`users/${userId}/samples/${sampleId}`).set({
            name,
            shortName,
            createdDate,
            path: snapshot.downloadURL
          });
        });
    });
};

export { getNewTrackKey, saveTrack, loadTrack, loadUserTracks, uploadUserSample };