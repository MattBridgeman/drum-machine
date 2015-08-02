class Scheduler {
	constructor(context, tempo) {
		this.context = context;
		this.tempo = tempo;
		this.sounds = [];
		this.currentPatternIndex = 0;
		this.isPlaying = false;
		this.interval = 100;
		this.bufferInSeconds = 1;
		this.startTime = -1;
		this.previousBufferSegmentIndex = 0;
		this.timer = null;
	}
	schedule(buffer, patterns){
		var id = this.sounds.push({buffer, patterns});
		return id;
	}
	start(){
		this.isPlaying = true;
		this.startTime = this.context.getCurrentTime();
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
	getSegmentsPerBuffer(){
		var segmentTimeInSeconds = this.tempo.getSegmentTimeInSeconds();
		var segmentsPerBuffer = this.bufferInSeconds / segmentTimeInSeconds;
		return Math.floor(segmentsPerBuffer);
	}
	getCurrentSegmentIndex(){
		var segmentTimeInSeconds = this.tempo.getSegmentTimeInSeconds();
		var elapsedTime = this.getElapsedTime();
		return Math.floor(elapsedTime / segmentTimeInSeconds);
	}
	getBufferEndSegmentIndex(){
		return this.getCurrentSegmentIndex() + this.getSegmentsPerBuffer() - 1;
	}
	getElapsedTime(){
		var currentTime = this.context.getCurrentTime();
		return currentTime - this.startTime;
	}
	scheduleSegmentsInBuffer(){
		if(!this.withinNewBufferRange()) return;
		var nextSegmentIndex = this.previousBufferSegmentIndex + 1;
		var bufferEndSegmentIndex = this.getBufferEndSegmentIndex();
		var currentTime = this.context.getCurrentTime();
		this.sounds.forEach(({buffer, patterns}) => {
			var segments = patterns[0]
			.filter((segment) => segment >= nextSegmentIndex)
			.filter((segment) => segment <= bufferEndSegmentIndex);
			
			segments.forEach((segment) => {
				this.context.playSound(buffer, (segment * this.tempo.getSegmentTimeInSeconds()) + currentTime);
			});
		});
		this.previousBufferSegmentIndex = bufferEndSegmentIndex;
	}
	withinNewBufferRange(){
		return this.previousBufferSegmentIndex - this.getCurrentSegmentIndex() <= 0;
	}
}

export { Scheduler };