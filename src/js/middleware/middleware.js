import { applyMiddleware } from "redux";
import { playState } from "./play.state";
import { buffer } from "./buffer";
import { startNoise } from "./start.noise";
import { supplyAuth } from "./auth";
import { instruments } from "./instruments";

export default applyMiddleware(
  supplyAuth,
  buffer,
  playState,
  startNoise,
  instruments
);