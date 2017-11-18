import { applyMiddleware } from "redux";
import { playState } from "./play.state";
import { buffer } from "./buffer";
import { startNoise } from "./start.noise";
import { supplyAuth } from "./auth";
import { instruments } from "./instruments";
import { track } from "./track";
import { historyMiddleware } from "./history";

export default applyMiddleware(
  supplyAuth,
  buffer,
  playState,
  startNoise,
  instruments,
  track,
  historyMiddleware
);