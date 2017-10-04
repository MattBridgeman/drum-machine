import { NEW_AUDIO_CONTEXT } from "../constants/audio.context.constants";
import { newSourceNodes } from "../actions/audio.context.actions";
import rootReducer from "../reducers/root.reducer";
import { SimpleReverb } from "../library/web-audio-components/simple.reverb";

export const supplyAudioNodes = store => next => {
    
	let context;
    let init;
    let sourceNodes;
    let master;
    let reverbGain;
    let reverbNode;

	return action => {
        let prevState = store.getState();
		let state = rootReducer(prevState, action);
        
		let { channels } = state;
        
        if(action.type === NEW_AUDIO_CONTEXT){
			context = action.value;
		}
        
        if(!init) {
            init = true;
            
            reverbNode = new SimpleReverb(context, {
                seconds: 2,
                decay: 2,
                reverse: 0
            });
            
            master = context.createGain();
            reverbGain = context.createGain();
            
            reverbNode.connect(reverbGain);
            reverbGain.connect(master);
            master.connect(context.destination);
            
		    sourceNodes = channels
                .map(channel => ({
                    volume: context.createGain(),
                    master: context.createGain(),
                    pan: context.createPanner(),
                    reverbNode
                }));
            
            sourceNodes
                .forEach(sourceNode => {
                    sourceNode.master.connect(sourceNode.volume);
                    sourceNode.volume.connect(sourceNode.pan);
                    sourceNode.pan.connect(master);
                    sourceNode.pan.panningModel = 'equalpower';
                });
            
            next(newSourceNodes(sourceNodes))
            
            return next(action);
        }

		return next(action);
    }
};