jest.dontMock('../webaudio');
jest.dontMock('../../audio-api/context');
var featureTest = require('../webaudio');

describe('browserSupportsWebAudio', function() {
	beforeEach(function(){
		window.AudioContext = undefined;
	})
	it("web audio should be supported", function() {
		window.AudioContext = jest.genMockFunction();
		var supported = featureTest.browserSupportsWebAudio();

		expect(window.AudioContext).toBeCalled();
		expect(window.AudioContext.mock.instances.length).toBe(1);
		expect(supported).toBe(true);
	});
	it("web audio should be unsupported", function() {
		var supported = featureTest.browserSupportsWebAudio();
		expect(supported).toBe(false);
	});
});