import React, { Component } from "react";
import { ToggleButton } from "../toggle-button/toggle.button.react.jsx";

class Modal extends Component {

	constructor(props) {
		super(props);
		this.state = {
			open: false
		}
	}
  
	onOpen() {
		this.setState({
			open: true
		});
	}
	
	onClose() {
		this.setState({
			open: false
		});
	}

	render() {
		let { props, state } = this;
		return (
			<div className={"modal-container" + ( state.open ? " open" : "" )}>
				<button className="modal-button open-button" onClick={() => this.onOpen()}>
					<span className="assistive">Open Modal</span>
					{
						props.icon ? 
						(<span className={"icon__" + props.icon}></span>)
						: null
					}
				</button>
				<div className="model-overlay"></div>
				{
					state.open ? (
						<div className="modal">
							<div className="modal-title">
								<h3>{props.title}</h3>
								<button className="modal-button close-button" onClick={() => this.onClose()}>
									<span className="assistive">Close Modal</span>
									<span className="icon__close"></span>
								</button>
							</div>
							<div className="modal-body">
								{ props.children }
							</div>
						</div>
					) : null
				}
			</div>
		);
	}
}

class ChannelHead extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		var { name, onSelectClick, onSoloClick, onMuteClick, selected, solo, muted } = this.props;
		var title = name ? (
			<div className="channel-item">
				<div className="item-title">
					<h3 ref="name">
						{ name }
					</h3>
					<Modal {...this.props} title="Change Sound" icon="folder">
						Some modal
					</Modal>
				</div>
			</div>
		) : null;

		return (
			<div className="channel-head">
				{title}
				<ToggleButton ref="toggleButton" classes="channel-item select-button" selected={selected} name="Select" onClick={onSelectClick} />
				<div className="channel-tray">
					<ToggleButton ref="soloButton" classes="channel-item green" selected={solo} name="Solo" onClick={onSoloClick} />
					<ToggleButton ref="muteButton" classes="channel-item red" selected={muted} name="Mute" onClick={onMuteClick} />
				</div>
			</div>
		);
	}

}

export { ChannelHead };