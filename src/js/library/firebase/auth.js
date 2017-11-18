import { init } from "./firebase";

let onAuthStateChanged = (cb) => {
  return init()
    .then(() =>
      firebase.auth().onAuthStateChanged(cb)
    );
};

export { onAuthStateChanged };