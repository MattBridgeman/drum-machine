class Scheduler {
	constructor(context, tempo) {
		this.context = context;
		this.tempo = tempo;
		this.patterns = [];
		this.isPlaying = false;
		this.interval = 100;
	}
	schedule(buffer, pattern){
		var id = this.patterns.push({buffer, pattern});
		return id;
	}
	start(){
		this.isPlaying = true;
		this.tick();
	}
	stop(){
		this.isPlaying = false;
	}
	tick(){
		this.patterns.forEach(({buffer, pattern}) => {
			pattern.forEach((segment, i) => {
				if(!segment) {
					return;
				}
				this.context.playSound(buffer, (i * this.tempo.getSegmentTimeInSeconds()) + this.context.getCurrentTime());
			});
		});
	}
}

export { Scheduler };