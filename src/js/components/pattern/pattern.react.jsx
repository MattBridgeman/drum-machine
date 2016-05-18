import * as React from "react";

class Pattern extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="pattern">
				<div className="time-signature">
					<div className="time-signature-4-4">
						<span className="signature-item">1</span>
						<span className="signature-item">2</span>
						<span className="signature-item">3</span>
						<span className="signature-item">4</span>
					</div>
					<div className="time-signature-4-4">
						<span className="signature-item">5</span>
						<span className="signature-item">6</span>
						<span className="signature-item">7</span>
						<span className="signature-item">8</span>
					</div>
					<div className="time-signature-4-4">
						<span className="signature-item">9</span>
						<span className="signature-item">10</span>
						<span className="signature-item">11</span>
						<span className="signature-item">12</span>
					</div>
					<div className="time-signature-4-4">
						<span className="signature-item">13</span>
						<span className="signature-item">14</span>
						<span className="signature-item">15</span>
						<span className="signature-item">16</span>
					</div>
				</div>
				<div className="pattern-tray">
					{this.props.children}
				</div>
			</div>
		);
	}

}

Pattern.propTypes = {
};

export { Pattern };