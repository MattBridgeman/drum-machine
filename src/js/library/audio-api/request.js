import { arrayBuffer } from "../request/arraybuffer";
import { decodeAudioData } from "./context";

export let requestAndDecodeSound = (context, path) =>
  arrayBuffer(path).then(data => decodeAudioData(context, data));

export let requestAndDecodeSoundArray = (context, paths) => 
  Promise.all(paths.map(path => requestAndDecodeSound(context, path)));