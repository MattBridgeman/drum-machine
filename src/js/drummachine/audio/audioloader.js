define(['js/drummachine/audio/bufferloader.js'], function( BufferLoader ) {

	var AudioLoader = function( track )
	{
		var context;
		var bufferLoader;
		var sources;
		var setUpEvents;
		var track;

        var setTrack = function( newTrack )
        {
            track = newTrack;
        };

		var finishedLoading = function ( bufferList )
		{
			// Create two sources and play them both together.
			sources.push( bufferList[0] );
			sources.push( bufferList[1] );
		}

		// var playSound = function( buffer, time )
		// {
		// 	if( buffer.prevTime ) {
		// 		buffer.stop( buffer.prevTime );
		// 	}
		// 	buffer.prevTime = context.currentTime;
		// 	buffer.start( context.currentTime );
		// }

		var playSound = function( buffer ) {
			var source = context.createBufferSource(); // creates a sound source
			source.buffer = buffer;                    // tell the source which sound to play
			source.connect(context.destination);       // connect the source to the context's destination (the speakers)
			source.noteOn(context.currentTime);        // play the source now
		}

		var setUpEvents = function ()
		{
			$(window).on( 'model:segment:change', function( e, data )
			{
				handleSegmentChange();
				// playSound( sources[0] );
			} );
		};

		var handleSegmentChange = function()
		{
			var pattern = track.getSelectedPattern();
	    	var btIdx = track.getSelectedBeatType();
	    	var segmentIdx = track.getSegment();
	    	pattern.getBeatTypes().forEach( function( beatType, i )
    		{
    			var hit = beatType.getSegment( segmentIdx );
    			//play hard
    			if( hit === 1 )
    			{
    				playSound( sources[1] );
    			}
    			//play soft
    			else if( hit === 2 )
    			{

    			}
    		} );
		};

		var init = function() {
			setTrack( track );
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
		};

		init();
	};

	return AudioLoader;

});