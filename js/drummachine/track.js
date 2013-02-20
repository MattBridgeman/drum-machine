define([], function() {
  
	var Track = function( obj )
	{   
	    var config,
	        sequenceModel,
	        selectedSequence,
	        patterns;
	    
	    //object of available beats
	    var beats =
	    {
	       kd:
	       {
	          url: 'kd.wav'
	       }
	    };
	    
	    var createPattern = function()
	    {
	         patterns.push( new Pattern() );  
	    };
	    
	    var init = function()
	    {
	         //global app settings
	        config = obj.config || 
	        {
	           tempo: 120,
	           beatsPerBar: 4,
	           segments: 16
	        };
	        
	        //array of pattern indexes
	        sequenceModel = [];
	        selectedSequence = 0;
	        
	        //array of available patterns
	        patterns = [];
	    };

	    var load = function( jsonString )
	    {
	    	var json = jsonString.toJSON();
	    };
	    
	    return {
	        load: load
	    }
	};

	return Track;
});