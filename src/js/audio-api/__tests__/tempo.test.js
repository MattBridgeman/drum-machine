jest.dontMock('../tempo');
var Tempo = require('../tempo').Tempo;

describe('Tempo', function() {
	var tempo,
		data;

	beforeEach(function() {
		data = {
			beatsPerMinute: 120,
			beatsPerBar: 4,
			segmentsPerBeat: 4
		};
		tempo = new Tempo(data);
	});

	it("beats per second should be 2", function() {
		expect(tempo.getBeatsPerSecond()).toBe(2);
	});
});