import { TOGGLE_PLAY_PAUSE, NEW_SEGMENT_INDEX } from "../constants/play.state.constants";
import { loadSounds } from "../library/audio-api/buffer";
import { WebAudioContext } from "../library/audio-api/context";

export const createBuffer = store => {
	let context = new WebAudioContext();
	let buffers = loadSounds(store);
	let sounds = Promise.all(buffers)
		.then((promises) => context.decodeAudioDataArray(promises));
		
	sounds.then(arrayBuffers => console.log(arrayBuffers));
	
	return next => action => {
		if (action.type !== TOGGLE_PLAY_PAUSE || action.type !== NEW_SEGMENT_INDEX) {
			return next(action);
		}
		let state = store.getState();
		let { channelsObj } = state;
		let channelKeys = Object.keys(channelsObj);
		let channelsArray =  channelKeys
			.map((key) => channelsObj[key]);
			
		let soundIds = channelsArray
			.map(channel => channel.sound);
		
		soundIds
			.map(id => sounds[id])
			.forEach(buffer => context.playSound(buffer, context.getCurrentTime()));
	};
};