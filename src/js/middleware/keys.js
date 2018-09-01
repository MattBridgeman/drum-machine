import React from "react";
import { keymap } from "../library/keyboard";
import { onKeyDown, onKeyUp } from "../actions/keys.actions";

export const keys = store => next => {
  let addEventListener = () => {
    document.addEventListener("keydown", (event) => {
      let { keyCode } = event;
      let keyName = keymap[keyCode];
      let time = new Date().getTime();
      next(onKeyDown(keyCode, keyName, time));
    });
    document.addEventListener("keyup", (event) => {
      let { keyCode } = event;
      let keyName = keymap[keyCode];
      let time = new Date().getTime();
      next(onKeyUp(keyCode, keyName, time));
    });
  };

  addEventListener();

  return action => {
    return next(action);
  }
};