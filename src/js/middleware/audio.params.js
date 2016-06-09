import { NEW_SOURCE_NODES } from "../constants/audio.context.constants";
import rootReducer from "../reducers/drum.machine.root.reducer";
import { zip } from "../library/natives/array";
import { panPercentageToValue } from "../library/audio-api/pan";
import { reverbSecondsPercentageToValue, reverbDecayPercentageToValue } from "../library/audio-api/reverb";

export const updateAudioParams = store => next => {
    
    let sourceNodes;

	return action => {
        let prevState = store.getState();
		let state = rootReducer(prevState, action);
        
		let { channels, reverb } = state;
        
        if(action.type === NEW_SOURCE_NODES){
            sourceNodes = action.value;
            return next(action);
        }

        if(!sourceNodes) return next(action);
		
        let atLeastOneChannelSolod = channels.reduce(((prev, channel) => prev || channel.solo), false);
        
        zip([channels, sourceNodes])
            .forEach(([channel, sourceNode], index) => {
                sourceNode.master.gain.value = channel.mute ? 0: channel.solo ? 1: atLeastOneChannelSolod ? 0 : 1;
                sourceNode.volume.gain.value = channel.volume * 0.01;
                sourceNode.pan.pan.value = panPercentageToValue(channel.pan);
            });
        
        sourceNodes
            .filter((sourceNode, i) => i === 0)
            .forEach(sourceNode => {
                let reverbSeconds = reverbSecondsPercentageToValue(reverb.seconds);
                let reverbDecay = reverbDecayPercentageToValue(reverb.decay);
                if(sourceNode.reverbNode.seconds !== reverbSeconds) {
                    sourceNode.reverbNode.seconds = reverbSeconds;
                }
                if(sourceNode.reverbNode.decay !== reverbDecay) {
                    sourceNode.reverbNode.decay = reverbDecay;
                }
            });

		return next(action);
    }
};