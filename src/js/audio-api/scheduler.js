class Scheduler {
	constructor(context, tempo) {
		this.context = context;
		this.tempo = tempo;
		this.sounds = [];
		this.segmentsScheduled = [];
		this.currentPatternIndex = 0;
		this.isPlaying = false;
		this.interval = 100;
		this.bufferInSeconds = 1;
		this.startTime = -1;
		this.currentBufferTime = -1;
		this.timer = null;
	}
	schedule(buffer, patterns){
		var id = this.sounds.push({buffer, patterns});
		return id;
	}
	start(){
		this.isPlaying = true;
		this.startTime = this.context.getCurrentTime();
		this.currentBufferTime = this.startTime;
		this.tick();
	}
	stop(){
		this.isPlaying = false;
		if(this.timer) clearTimeout(this.timer);
	}
	tick(){
		this.scheduleSegmentsInBuffer();
		this.timer = setTimeout(() => {
			this.tick();
		}, this.interval);
	}
	segmentsInBuffer(){
		var segmentTimeInSeconds = this.tempo.getSegmentTimeInSeconds();
		var segmentsInBuffer = this.bufferInSeconds / segmentTimeInSeconds;
		return Math.ceil(segmentsInBuffer);
	}
	getCurrentSegment(){
		var segmentTimeInSeconds = this.tempo.getSegmentTimeInSeconds();
		var elapsedTime = this.getElapsedTime();
		return Math.floor(elapsedTime / segmentTimeInSeconds);
	}
	segmentsInCurrentBuffer(){
		return this.getCurrentSegment() + this.segmentsInBuffer();
	}
	getElapsedTime(){
		var currentTime = this.context.getCurrentTime();
		return currentTime - this.startTime;
	}
	scheduleSegmentsInBuffer(){
		var segmentsInBuffer = this.segmentsInBuffer();
		var currentTime = this.context.getCurrentTime();
		this.sounds.forEach(({buffer, patterns}) => {
			var segmentsToSchedule = patterns[0]
			.filter((segment) => this.segmentsInCurrentBuffer)
			.filter((segment) => segment <= segmentsInBuffer);
			
			segmentsToSchedule.forEach((segment) => {
				this.context.playSound(buffer, (segment * this.tempo.getSegmentTimeInSeconds()) + currentTime);
			});
		});
		this.currentBufferTime = currentTime + this.bufferInSeconds;
	}
}

export { Scheduler };