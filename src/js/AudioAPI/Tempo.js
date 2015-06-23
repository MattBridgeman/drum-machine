class Tempo {
	constructor() {
		this.beatsPerMinute = 120;
		this.beatsPerBar = 4;
		this.segmentsPerBeat = 4;

		this.secondsInMinute = 60;
	}
	getBeatsPerSecond() {
		return this.secondsInMinute / this.beatsPerMinute;
	}
	getSegmentTimeInSeconds(){
		return this.getBeatsPerSecond() / this.segmentsPerBeat;
	}
}

export { Tempo };