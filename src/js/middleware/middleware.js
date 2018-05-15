import { applyMiddleware } from "redux";
import { playState } from "./play.state";
import { buffer } from "./buffer";
import { startNoise } from "./start.noise";
import { supplyAuth } from "./auth";
import { instruments } from "./instruments";
import { track } from "./track";
import { tracks } from "./tracks";
import { historyMiddleware } from "./history";
import { meta } from "./meta";
import { samplesMiddleware } from "./samples";
import { preview } from "./preview";
import { keys } from "./keys";

export default applyMiddleware(
  supplyAuth,
  buffer,
  playState,
  startNoise,
  meta,
  track,
  keys,
  instruments,
  tracks,
  preview,
  samplesMiddleware,
  historyMiddleware
);