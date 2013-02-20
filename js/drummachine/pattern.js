define([], function() {
    //pattern constructor
    var Pattern = function()
    {
       //contains objects of 
       var sequence = [];
    
       var setSequence = function()
       {
         	for( var i = 0; i < config.segments; i++ )
        	{
	            var segment = new Segment();
	            sequence.push( segment );
        	};
       };
       var getSequence = function()
       {
          return sequence;
       };
       setSequence();
       return {
          getSequence: getSequence
       }
    };

    return Pattern;
});