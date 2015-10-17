export const sequencer = store => next => action => {
	console.log("dispatching", action);
	let result = next(action);
	console.log("next state", store.getState());
	return result;
};

// export function sequencer(store){
// 	// let unsubscribe = store.subscribe(() =>
// 	// 	console.log(store.getState())
// 	// );
	
// 	function update(){
// 		var state = store.getState();
// 		if(!state.isPlaying) return;
// 		setTimeout(update, 30);
// 	}
// }

// class Sequencer {
// 	constructor(store) {
// 		this.store = store;
// 		this.setUpEvents();
// 	}
// 	setUpEvents(){
// 		this.store.subscribe(() => this.tick());
// 	}
// 	tick() {
// 		let state = this.store.getState();
// 		setTimeout(() => this.tick(), 30);
// 		if(!state.isPlaying) return;
// 		this.update();
// 	}
// 	update(){
		
// 	}
// }