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
    let prereverbGain;
    let reverbNode;

	return action => {
        let prevState = store.getState();
		let state = rootReducer(prevState, action);
        
		let { drumMachine } = state;
        
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
            prereverbGain = context.createGain();
            reverbGain = context.createGain();
            
            prereverbGain.connect(reverbNode.input);
            reverbNode.connect(reverbGain);
            reverbGain.connect(master);
            master.connect(context.destination);
            
            //TODO: Make dynamic for however many drum machines there are
		    sourceNodes = drumMachine["0"]
                .map(channel => ({
                    volume: context.createGain(),
                    master: context.createGain(),
                    pan: context.createPanner(),
                    reverbNode: prereverbGain
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