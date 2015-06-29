jest.dontMock('../request');
var request = require('../request').request;

describe('request', function() {
	var requestPromise;
	beforeEach(function(){
		window.XMLHttpRequest = jest.genMockFunction();
		requestPromise = request('dummy.html', "GET", "arraybuffer");
	});
	it("should create and return a promise", function() {
		expect(window.Promise.mock.instances.length).toBe(1);
	});
	pit("should call an XMLHttpRequest with the correct parameters", function() {
		return requestPromise.then(function(stuff) {
			expect(window.XMLHttpRequest.mock.instances.length).toBe(1);
			expect(window.XMLHttpRequest.mock.instances[0].onload.calls[0]).toBe(1);
		});
	});
});