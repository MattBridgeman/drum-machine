import { config } from "./config";
import { script } from "../request/script";
import { css } from "../request/css";

let initialised = false;

let load = () => {
  return Promise.all([
    script("./js/firebase.js"),
    script("./js/firebaseui.js"),
    css("./css/firebaseui.css")
  ]);
};

let init = () => {
  return load()
    .then(() => {
      if(!initialised) {
        firebase.initializeApp(config);
        initialised = true
      }
    });
};

export { load, init };