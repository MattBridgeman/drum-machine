import firebase from "firebase";
import { config } from "./config";

let auth = (() => {
  return {
    init: () => {
      firebase.initializeApp(config);
    }
  }
})();

export { auth };

// Initialize the FirebaseUI Widget using Firebase.
// var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
// ui.start("#firebaseui-auth-container", uiConfig);