class Scheduler {
	constructor(context, tempo) {
		this.context = context;
		this.tempo = tempo;
		this.sounds = [];
		this.isPlaying = false;
		this.interval = 100;
	}
	schedule(buffer, patterns){
		var id = this.sounds.push({buffer, patterns});
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
		this.sounds.forEach(({buffer, patterns}) => {
			patterns[0].forEach((segment, i) => {
				if(!segment) {
					return;
				}
				this.context.playSound(buffer, (i * this.tempo.getSegmentTimeInSeconds()) + this.context.getCurrentTime());
			});
		});
	}
}

export { Scheduler };