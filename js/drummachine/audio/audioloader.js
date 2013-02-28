define(['js/drummachine/audio/bufferloader.js'], function( BufferLoader ) {

	var AudioLoader = function()
	{
		var context;
		var bufferLoader;
		var sources;

		var init = function() {
			context = new webkitAudioContext();
			sources = [];
			bufferLoader = new BufferLoader(
				context,
				[
					'samples/808/01_KCK1.WAV',
					'samples/808/15_CLP2.WAV',
				],
				finishedLoading
			);

			bufferLoader.load();
		}

		var finishedLoading = function ( bufferList )
		{
			// Create two sources and play them both together.
			sources.push( context.createBufferSource() );
			sources.push( context.createBufferSource() );
			sources[0].buffer = bufferList[0];
			sources[1].buffer = bufferList[1];

			sources[0].connect(context.destination);
			sources[1].connect(context.destination);
			sources[0].noteOn(0);
			sources[1].noteOn(0);
		}

		init();
	};

	return AudioLoader;

});