define([ 'json2', 'js/drummachine/pattern.js', "js/drummachine/beattypes.js" ], function( JSON2, Pattern, BeatTypes ) {
  
	var Track = function()
	{   
	    var meta,
	        sequences,
	        selectedSequence,
	        patterns,
	        beatTypes,
	        selectedBeatType,
	        segementIndex,
			songMode,
			isPlaying,
	        setUpEvents,
	        publish;
	    
	    var createPattern = function( pattern )
	    {
	        patterns.push( new Pattern( pattern ) ); 
	    };

	    var setPatterns = function( newPatterns )
	    {
	    	for( var i = 0; i < newPatterns.length; i++ )
	    	{
	    		var pattern = newPatterns[i];
	    		createPattern( pattern ); 
	    	}
	    };

	    var getPatterns = function()
	    {
	    	return patterns;
	    };

	    var setSequences = function( newSequences )
	    {
	    	sequences = newSequences;
	    };

	    var getSequences = function()
	    {
	    	return sequences;
	    };

	    var setMeta = function( newMeta )
	    {
	    	meta = newMeta;
	    };
	    
	    var getMeta = function()
	    {
	    	return meta;
	    };

	    var setSegement = function( newSegment )
	    {
	    	segementIndex = newSegment;
	    };

	    var getSegment = function()
	    {
	    	return segementIndex;
	    };

	    var setSelectedSequenceIdx = function( index )
	    {
	    	selectedSequence = index;
	    };

	    var getSelectedSequenceIdx = function()
	    {
	    	return selectedSequence;
	    };

	    var getSelectedSequence = function()
	    {
	    	return sequences[selectedSequence];
	    };

	    var getSelectedPattern = function()
	    {
	    	return patterns[getSelectedSequence()];
	    };

	    var getSelectedBeatType = function()
	    {
	    	return selectedBeatType;
	    };

	    var handleSegment = function( e, data )
	    {
	    	var segmentIdx = data.index;
	    	var pattern = getSelectedPattern();
	    	var btIdx = getSelectedBeatType();

	    	pattern.getBeatTypes()[btIdx].incrementSegment(segmentIdx);

	    	publish( 'model:segment:update' );
	    };

	    var handlePlayPause = function( e, data )
	    {
	    	setPlaying( !getPlaying() );
	    };

	    var handleSegmentChange = function( e, data )
	    {
	    	var currentSegment = getSegment();

	    	if( ( currentSegment + 1 ) > ( getMeta().segments - 1 ) )
	    	{
	    		//increment sequence or loop
	    		setSegement( 0 );

	    		if( getSongMode().indexOf( 'song' === 0 ) )
	    		{
	    			var index = getSelectedSequenceIdx();
	    			var nextIndex = index + 1;

	    			if( !data || ( data && data.increment === true ) )
	    			{
						if( nextIndex > ( getSequences().length - 1 ) )
						{
							setSelectedSequenceIdx( 0 );

							if( getSongMode() === 'song:loop' )
							{

							}
							else if( getSongMode() === 'song:noloop' )
							{
								setPlaying( false );
							}
						}
						else
						{
							setSelectedSequenceIdx( nextIndex );
						}
	    			}
	    		}
	    	}
	    	else
	    	{
	    		if( !data || ( data && data.increment === true ) )
	    		{
	    			setSegement( getSegment() + 1 );
	    		}
	    	}

	    	publish( 'model:segment:change' );
	    };

		var setSongMode = function( mode )
		{
			songMode = mode;
		};

		var getSongMode = function( mode )
		{
			return songMode;
		};

		var setPlaying = function( bool )
		{
			isPlaying = bool;
			publish( 'track:' + ( isPlaying ? 'start' : 'stop' ) )
		};

		var getPlaying = function()
		{
			return isPlaying;
		};

	    var publish = function( string )
	    {
	    	$( window ).trigger( string );
	    };

	    var setUpEvents = function()
	    {
	    	$( window ).on( 'ui:button:segment', handleSegment );
	    	$( window ).on( 'ui:button:playPause', handlePlayPause );
	    	$( window ).on( 'rhythm:segment:change', handleSegmentChange );
	    };

	    var init = function()
	    {
	    	meta = {};
	        //array of pattern indexes
	        sequences = [];
	        selectedSequence = 0;
	        
	        //array of available patterns
	        patterns = [];

	        //beat types e.g. KD
	        beatTypes = new BeatTypes();
	        selectedBeatType = 0;

	        setSegement( 0 );

	        setSongMode( 'loop' );
	        setPlaying( false );
	    };

	    var load = function( jsonString )
	    {
	    	var json = JSON.parse(jsonString);

	    	setMeta( json.meta );
	    	setPatterns( json.patterns );
	    	setSequences( json.sequences );
	    	setUpEvents();
	    	$(window).trigger('track:loaded');
	    };

	    init();
	    
	    return {
	        load: load,
	        getMeta: getMeta,
	        getPatterns: getPatterns,
	        getPlaying: getPlaying,
	        getSegment: getSegment,
	        getSelectedSequence: getSelectedSequence,
	        getSelectedPattern: getSelectedPattern,
	        getSelectedBeatType: getSelectedBeatType
	    }
	};

	return Track;
});