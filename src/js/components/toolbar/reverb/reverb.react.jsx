import * as React from "react";
import { bindActionCreators } from "redux";
import { Rotator } from "../../rotator/rotator.react.jsx";
import DrumMachineActions from "../../../actions/drum.machine.actions";

class Reverb extends React.Component {

	constructor(props) {
		super(props);
	}
	
	render() {
		const { reverb, dispatch } = this.props;
		const reverbActions = bindActionCreators(DrumMachineActions.reverb, dispatch);
        
		return (
            <div className="effects-parameters">
                <h3 className="item-label">Reverb</h3>
                <div className="effects-tray">
                    <Rotator name="Length" classes="effect-item" value={reverb.seconds} onKnobRotate={ (amount) => reverbActions.changeReverbSecondsToAmount(amount) } onValueChange={ (value) => reverbActions.changeReverbSecondsToAmount(value) } />
                    <Rotator name="Decay" classes="effect-item" value={reverb.decay} onKnobRotate={ (amount) => reverbActions.changeReverbDecayToAmount(amount) } onValueChange={ (value) => reverbActions.changeReverbDecayToAmount(value) } />
                </div>
            </div>
        );
    }
}

Reverb.propTypes = {
};

export { Reverb };