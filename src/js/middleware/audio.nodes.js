import { NEW_AUDIO_CONTEXT } from "../constants/audio.context.constants";
import { newSourceNodes } from "../actions/audio.context.actions";
import rootReducer from "../reducers/drum.machine.root.reducer";
import { zip } from "../library/natives/array";
import { panPercentageToValue } from "../library/audio-api/pan";
import SimpleReverb from "../library/audio-api/simple.reverb";

export const supplyAudioNodes = store => next => {
    
	let context;
    let init;
    let sourceNodes;
    let master;
    let reverb;

	return action => {
        let prevState = store.getState();
		let state = rootReducer(prevState, action);
        
		let { channels, patterns } = state;
		let { currentBarIndex } = state.playState;
        
        if(action.type === NEW_AUDIO_CONTEXT){
			context = action.value;
			return next(action);
		}
        
        if(!init) {
            init = true;
            master = context.createGain();
            master.connect(context.destination);
            
		    sourceNodes = channels
                .map(channel => ({
                    volume: context.createGain(),
                    master: context.createGain(),
                    pan: context.createStereoPanner(),
                    reverb: context.createGain(),
                    reverbNode: new SimpleReverb(context, {
                        seconds: 3,
                        decay: 2,
                        reverse: 0
                    })
                }));
            
            sourceNodes
                .forEach(sourceNode => {
                    sourceNode.master.connect(sourceNode.volume);
                    sourceNode.volume.connect(sourceNode.pan);
                    sourceNode.pan.connect(master);
                    sourceNode.reverb.connect(master);
                    sourceNode.reverbNode.connect(sourceNode.reverb);
                });
            
            next(newSourceNodes(sourceNodes))
            
            return next(action);
        }
		
        let atLeastOneChannelSolod = channels.reduce(((prev, channel) => prev || channel.solo), false);
        
        zip([channels, sourceNodes])
            .forEach(([channel, sourceNode]) => {
                sourceNode.master.gain.value = channel.mute ? 0: channel.solo ? 1: atLeastOneChannelSolod ? 0 : 1;
                sourceNode.volume.gain.value = channel.volume * 0.01;
                sourceNode.pan.pan.value = panPercentageToValue(channel.pan);
                sourceNode.reverb.gain.value = channel.reverb * 0.01;
            });
            
		return next(action);
    }
};