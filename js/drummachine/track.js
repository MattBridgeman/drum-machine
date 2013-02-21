define([ 'json2', 'js/drummachine/pattern.js' ], function( JSON2, Pattern ) {
  
	var Track = function()
	{   
	    var meta,
	        sequences,
	        selectedSequence,
	        patterns,
	        selectedPattern;
	    
	    //object of available beats
	    var beats =
	    {
	       kd:
	       {
	          url: 'kd.wav'
	       }
	    };
	    
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
	    
	    var init = function()
	    {
	    	meta = {};
	        //array of pattern indexes
	        sequences = [];
	        selectedSequence = 0;
	        
	        //array of available patterns
	        patterns = [];
	        selectedPattern = 0;
	    };

	    var load = function( jsonString )
	    {
	    	var json = JSON.parse(jsonString);

	    	setMeta( json.meta );
	    	setPatterns( json.patterns );
	    	setSequences( json.sequences );

	    	debugger;
	    };

	    init();
	    
	    return {
	        load: load,
	        getMeta: getMeta
	    }
	};

	return Track;
});