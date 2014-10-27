define([ 'drummachine/beattype' ], function( BeatType ) {
    //pattern constructor
    var Pattern = function( newBeatTypes )
    {
       //contains objects of 
       var beatTypes = [];
    
       var getBeatTypes = function()
       {
          return beatTypes;
       };

       var setBeatTypes = function( newBeatTypes )
       {
         	for( var i = 0; i < newBeatTypes.length; i++ )
        	{
              var bt = newBeatTypes[i];
	            var beatType = new BeatType( bt );
	            beatTypes.push( beatType );
        	};
       };

       setBeatTypes( newBeatTypes );
       
       return {
          getBeatTypes: getBeatTypes
       }
    };

    return Pattern;
});