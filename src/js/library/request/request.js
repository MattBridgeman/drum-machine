var request = function(url, requestType, responseType) {
	// Return a new promise.
	return new Promise(function(resolve, reject) {
		var xhrRequest = new window.XMLHttpRequest();
		xhrRequest.open(requestType, url, true);
		xhrRequest.responseType = responseType;
		var resolveCalled = false;
		xhrRequest.onload = function() {
			resolveCalled = true;
			resolve(xhrRequest.response);
		};
		xhrRequest.onerror = function() {
			debugger;
			reject(Error(xhrRequest.statusText));
		};

		xhrRequest.send();
	});
};

export { request };