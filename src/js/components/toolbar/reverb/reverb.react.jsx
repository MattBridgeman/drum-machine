import React from "react";
import { bindActionCreators } from "redux";
import { Rotator } from "../../rotator/rotator.react.jsx";
import DrumMachineActions from "../../../actions/root.actions";

class Reverb extends React.Component {

	constructor(props) {
		super(props);
	}
	
	render() {
        const { machineId, reverb, dispatch } = this.props;
        const machine = reverb[machineId];
		const reverbActions = bindActionCreators(DrumMachineActions.reverb, dispatch);
        
		return (
            <div className="effects-parameters">
                <h3 className="item-label">Reverb</h3>
                <div className="effects-tray">
                    <Rotator name="Length" classes="effect-item" value={machine.seconds} onValueChange={ (value) => reverbActions.changeReverbSecondsToAmount(machineId, value) } />
                    <Rotator name="Decay" classes="effect-item" value={machine.decay} onValueChange={ (value) => reverbActions.changeReverbDecayToAmount(machineId, value) } />
                </div>
            </div>
        );
    }
}

export { Reverb };