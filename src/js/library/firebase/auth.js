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