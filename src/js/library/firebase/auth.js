import firebase from "firebase";
import { config } from "./config";

let auth = (() => {
  return {
    init: () => {
      firebase.initializeApp(config);
    },
    onAuthStateChanged: (cb) => 
      firebase.auth().onAuthStateChanged(cb)
  }
})();

export { auth };