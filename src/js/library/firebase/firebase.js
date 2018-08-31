import { config } from "./config";
import firebase from "firebase";
import firebaseui from "firebaseui";

let initialised = false;

let init = () => {
  return Promise.resolve()
    .then(() => {
      if(!initialised) {
        firebase.initializeApp(config);
        initialised = true
      }
    });
};

export { init };