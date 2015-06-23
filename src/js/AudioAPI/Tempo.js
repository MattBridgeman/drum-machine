var secondsInMinute = 60;

class Tempo {
	constructor(data) {
		this.beatsPerMinute = data.beatsPerMinute || 120;
		this.beatsPerBar = 4;
		this.segmentsPerBeat = 4;
	}
	getBeatsPerSecond() {
		return secondsInMinute / this.beatsPerMinute;
	}
	getSegmentTimeInSeconds(){
		return this.getBeatsPerSecond() / this.segmentsPerBeat;
	}
}

export { Tempo };