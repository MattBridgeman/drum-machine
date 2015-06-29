jest.dontMock("../request");
var request = require("../request").request,
	Promise = require("es6-promise").Promise;

describe("request", function() {
	var requestPromise;
	beforeEach(function(){
		window.XMLHttpRequest = jest.genMockFunction();
	});
	it("should create and return a promise", function() {
		requestPromise = request("dummy.html", "GET", "arraybuffer");
		expect(requestPromise instanceof Promise).toBe(true);
	});
});