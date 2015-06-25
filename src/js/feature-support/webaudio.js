import { WebAudioContext } from "../audio-api/context";

function browserSupportsWebAudio() {
	try {
		// Fix up for prefixing
		var AudioContext = new WebAudioContext();
		return true;
	}
	catch(e) {
		return false;
	}
}

export { browserSupportsWebAudio };