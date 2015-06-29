import { WebAudioContext } from "./audio-api/context";
import { Tempo } from "./audio-api/tempo";
import { arrayBuffer } from "./request/arraybuffer";
import * as React from "react";
import { HelloWorld } from "./components/helloworld.react";


React.render(
  <HelloWorld />,
  document.getElementById("drum-machine")
);