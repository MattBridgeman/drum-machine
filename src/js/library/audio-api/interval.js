export let intervalGenerator = function*(shouldContinue, timeout){
	while(shouldContinue()){
		yield timeout();
	}
};

export let timeout = {
	get: () => new Promise(window.requestAnimationFrame)
};