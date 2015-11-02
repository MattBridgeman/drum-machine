import { arrayBuffer } from "../request/arraybuffer";
import * as Rx from "Rx";

export function loadSounds(store){
	let state = store.getState();
	let soundKeys = Object.keys(state.sounds);
	let soundPaths = soundKeys.map(key => state.sounds[key].path);
	return soundPaths.map(arrayBuffer);
}