jest.dontMock('../context');
var WebAudioContext = require('../context').WebAudioContext;

describe('WebAudioContext', function() {
	beforeEach(function(){
		window.AudioContext = jest.genMockFunction();
	})
	it("AudioContext is called", function() {
		var context = new WebAudioContext();

		expect(window.AudioContext).toBeCalled();
		expect(window.AudioContext.mock.instances.length).toBe(1);
	});
});