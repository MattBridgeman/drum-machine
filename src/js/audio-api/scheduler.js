class Scheduler {
	constructor(context, tempo) {
		this.context = context;
		this.tempo = tempo;
		this.sounds = [];
		this.reset();
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
		this.reset();
	}
	toggleStart(){
		if(!this.isPlaying) {
			this.start();
		} else {
			this.stop();
		}
	}
	reset(){
		this.currentPatternIndex = 0;
		this.isPlaying = false;
		this.interval = 100;
		this.bufferInSeconds = 1;
		this.startTime = -1;
		this.previousBufferSegmentIndex = -1;
		this.timer = null;
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
	segmentTimeByIndex(index){
		return index * this.tempo.getSegmentTimeInSeconds() + this.startTime;
	}
	scheduleSegmentsInBuffer(){
		if(!this.withinNewBufferRange()) return;
		var nextSegmentIndex = this.previousBufferSegmentIndex + 1;
		var bufferEndSegmentIndex = nextSegmentIndex + this.getSegmentsPerBuffer();
		this.sounds.forEach(({buffer, patterns}) => {
			var segments = patterns[0]
			.filter((segment) => segment >= nextSegmentIndex)
			.filter((segment) => segment <= bufferEndSegmentIndex);
			
			segments.forEach((segment) => {
				this.context.playSound(buffer, this.segmentTimeByIndex(segment));
			});
		});
		this.previousBufferSegmentIndex = bufferEndSegmentIndex;
	}
	withinNewBufferRange(){
		return this.previousBufferSegmentIndex - this.getCurrentSegmentIndex() <= 0;
	}
}

export { Scheduler };