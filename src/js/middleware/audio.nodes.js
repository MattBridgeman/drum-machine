import { NEW_AUDIO_CONTEXT } from "../constants/audio.context.constants";
import { newSourceNodes } from "../actions/audio.context.actions";
import rootReducer from "../reducers/drum.machine.root.reducer";
import { zip } from "../library/natives/array";

export const supplyAudioNodes = store => next => {
    
	let context;
    let init;
    let sourceNodes;

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
            
		    sourceNodes = channels
                .map(channel => ({
                    volume: context.createGain(),
                    master: context.createGain(),
                    pan: context.createStereoPanner()
                }))
            
            sourceNodes
                .forEach(sourceNode => {
                    sourceNode.master.connect(sourceNode.volume);
                    sourceNode.volume.connect(sourceNode.pan);
                    sourceNode.pan.connect(context.destination);
                });
            
            next(newSourceNodes(sourceNodes))
            
            return next(action);
        }
		
        let atLeastOneChannelSolod = channels.reduce(((prev, channel) => prev || channel.solo), false);
        
        zip([channels, sourceNodes])
            .forEach(([channel, sourceNode]) => {
                sourceNode.master.gain.value = channel.mute ? 0: channel.solo ? 1: atLeastOneChannelSolod ? 0 : 1;
                sourceNode.volume.gain.value = channel.volume * 0.01;
                sourceNode.pan.pan.value = channel.pan || 0;
            });
            
		return next(action);
    }
};