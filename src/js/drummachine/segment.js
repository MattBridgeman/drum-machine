define([], function()
{
  	var Segment = function()
    {
       var array = [];
       var setAvailableBeats = function( beats )
       {
          for( var beat in beats )
          {
             array.push( new Sound(
             {
                name: beat,
                settings: beats[beat]
             }) );
          }
       };
       var getBeatTypes = function()
       {
          return array;
       };
       setAvailableBeats( beats );
       return {
          getBeatTypes: getBeatTypes
       };
    };

    return Segment;
});