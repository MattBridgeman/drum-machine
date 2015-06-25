var request = function(url, requestType, responseType) {
	// Return a new promise.
	return new Promise(function(resolve, reject) {
		var xhrRequest = new XMLHttpRequest();
		xhrRequest.open(requestType, url, true);
		xhrRequest.responseType = responseType;

		xhrRequest.onload = function() {
			resolve(xhrRequest.response);
		};
		xhrRequest.onerror = function() {
			reject(Error(xhrRequest.statusText));
		};

		xhrRequest.send();
	});
};

var getBuffer = function(url) {
	return request(url, "GET", "arraybuffer");
};

export { request, getBuffer };