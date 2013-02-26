define([ 'json2', 'js/drummachine/pattern.js', "js/drummachine/beattypes.js" ], function( JSON2, Pattern, BeatTypes ) {
  
	var Track = function()
	{   
	    var meta,
	        sequences,
	        selectedSequence,
	        patterns,
	        selectedPattern,
	        beatTypes,
	        selectedBeatType,
	        setUpEvents;
	    
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

	    var setMeta = function( newMeta )
	    {
	    	meta = newMeta;
	    };
	    
	    var getMeta = function()
	    {
	    	return meta;
	    };

	    var getSelectedSequence = function()
	    {
	    	return sequences[selectedSequence];
	    };

	    var getSelectedPattern = function()
	    {
	    	return patterns[selectedPattern];
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

	    	$(window).trigger( 'model:segment:update' );
	    };

	    var setUpEvents = function()
	    {
	    	$(window).on( 'ui:button:segment', handleSegment );
	    };
	    
	    var init = function()
	    {
	    	meta = {};
	        //array of pattern indexes
	        sequences = [];
	        selectedSequence = 0;
	        
	        //array of available patterns
	        patterns = [];
	        selectedPattern = 0;

	        //beat types e.g. KD
	        beatTypes = new BeatTypes();
	        selectedBeatType = 0;
	    };

	    var load = function( jsonString )
	    {
	    	var json = JSON.parse(jsonString);

	    	setMeta( json.meta );
	    	setPatterns( json.patterns );
	    	setSequences( json.sequences );
	    	setUpEvents();
	    };

	    init();
	    
	    return {
	        load: load,
	        getMeta: getMeta,
	        getPatterns: getPatterns
	    }
	};

	return Track;
});