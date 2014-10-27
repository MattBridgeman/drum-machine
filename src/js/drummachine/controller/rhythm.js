define(['jquery'], function( $ ) {

	var Rhythm = function( track )
	{
		//this object should:
		//fire segment event
		////seg no, pattern no
		//listen to commands
		////start, stop, loop, song mode

		var setUpEvents,
			track,
			start,
			stop,
			fire,
			nextTimeout;

		//initially, just set up a loop
		var setUpEvents = function()
		{
			$( window ).on( 'track:start', function()
			{
				start();
			} );

			$( window ).on( 'track:stop', function()
			{
				stop();
			} );
		};

        var setTrack = function( newTrack )
        {
            track = newTrack;
        };

		var start = function()
		{
			fire( { increment: false } );
		};

		var stop = function()
		{
			clearTimeout( nextTimeout );
		};

		var getInterval = function()
		{
			var meta = track.getMeta();

			return ( ( 60 / ( meta.tempo / meta.beatsPerBar ) ) / meta.segments ) * 1000;
		};

		var fire = function( params )
		{
			if( track.getPlaying() )
			{
				publish( 'rhythm:segment:change', params );
				nextTimeout = setTimeout( fire, getInterval() );
			}
		};

		var publish = function( string, params )
		{
			$( window ).trigger( string, params );
		};

		var init = function()
		{
			setTrack( track );
			setUpEvents();
		};

		init();

		return {};
	};

	return Rhythm;

});