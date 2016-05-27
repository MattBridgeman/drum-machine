import { NEW_AUDIO_CONTEXT } from "../constants/audio.context.constants";
import { newSourceNodes } from "../actions/audio.context.actions";
import rootReducer from "../reducers/drum.machine.root.reducer";
import SimpleReverb from "../library/audio-api/simple.reverb";

export const supplyAudioNodes = store => next => {
    
	let context;
    let init;
    let sourceNodes;
    let master;

	return action => {
        let prevState = store.getState();
		let state = rootReducer(prevState, action);
        
		let { channels } = state;
        
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

		return next(action);
    }
};