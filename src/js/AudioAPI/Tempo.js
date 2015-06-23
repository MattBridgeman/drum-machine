var secondsInMinute = 60;

class Tempo {
	constructor(data) {
		this.beatsPerMinute = data.beatsPerMinute;
		this.beatsPerBar = data.beatsPerBar;
		this.segmentsPerBeat = data.segmentsPerBeat;
	}
	getBeatsPerSecond() {
		return secondsInMinute / this.beatsPerMinute;
	}
	getSegmentTimeInSeconds(){
		return this.getBeatsPerSecond() / this.segmentsPerBeat;
	}
}

export { Tempo };