var Promise = require('es6-promise').Promise;

var request = function(url, requestType, responseType) {
	// Return a new promise.
	return new Promise(function(resolve, reject) {
		var request = new XMLHttpRequest();
		request.open(requestType, url, true);
		request.responseType = responseType;

		request.onload = function() {
			resolve(request.response);
		};
		request.onerror = function() {
			reject(Error(request.statusText));
		};

		request.send();
	});
};

var getBuffer = function(url) {
	return request('GET', url, 'arraybuffer');
};

module.exports = {
	request: request,
	getBuffer: getBuffer
};