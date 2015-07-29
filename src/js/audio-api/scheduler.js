class Scheduler {
	constructor(context, tempo) {
		this.context = context;
		this.tempo = tempo;
	}
	schedule(buffer, pattern){
		pattern.forEach((segment, i) => {
			if(!segment) {
				return;
			}
			this.context.playSound(buffer, (i * this.tempo.getSegmentTimeInSeconds()) + this.context.getCurrentTime());
		});
	}
}

export { Scheduler };