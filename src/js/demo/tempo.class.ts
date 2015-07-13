var secondsInMinute = 60;

class Tempo {
	private beatsPerMinute: number;
	private beatsPerBar: number;
	private segmentsPerBeat: number;
	constructor(data) {
		this.beatsPerMinute = data.beatsPerMinute;
		this.beatsPerBar = data.beatsPerBar;
		this.segmentsPerBeat = data.segmentsPerBeat;
	}
	getBeatsPerSecond() {
		return this.beatsPerMinute / secondsInMinute;
	}
	getSecondsPerBeat(){
		return 1 / this.getBeatsPerSecond();
	}
	getSegmentTimeInSeconds(){
		return this.getSecondsPerBeat() / this.segmentsPerBeat;
	}
}

export { Tempo };