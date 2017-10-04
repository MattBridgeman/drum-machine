import { config } from "./config";
import { script } from "../request/script";
import { css } from "../request/css";

let auth = (() => {
  let load = () => {
    return Promise.all([
      script("./js/firebase.js"),
      script("./js/firebaseui.js"),
      css("./css/firebaseui.css")
    ]);
  };
  let init = () => {
    return load()
      .then(() => firebase.initializeApp(config));
  };
  let onAuthStateChanged = (cb) => {
    return load()
      .then(() =>
        firebase.auth().onAuthStateChanged(cb)
      );
  };
  return {
    load,
    init,
    onAuthStateChanged
  };
})();

export { auth };