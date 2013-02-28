define(['js/drummachine/audio/bufferloader.js'], function( BufferLoader ) {

	var AudioLoader = function()
	{
		var context;
		var bufferLoader;
		var sources;
		var setUpEvents;

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
			setUpEvents();
		}

		var finishedLoading = function ( bufferList )
		{
			// Create two sources and play them both together.
			sources.push( bufferList[0] );
			sources.push( bufferList[1] );
		}

		var playSound = function( buffer, time )
		{
			if( buffer.prevTime ) {
				buffer.stop( buffer.prevTime );
			}
			buffer.prevTime = context.currentTime;
			buffer.start( context.currentTime );
		}

		var playSound = function( buffer ) {
			var source = context.createBufferSource(); // creates a sound source
			source.buffer = buffer;                    // tell the source which sound to play
			source.connect(context.destination);       // connect the source to the context's destination (the speakers)
			source.noteOn(0);                          // play the source now
		}

		var setUpEvents = function ()
		{
			$(window).on( 'audio', function( e, data )
			{
				playSound( sources[0] );
			} );
		};

		init();
	};

	return AudioLoader;

});