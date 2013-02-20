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
    
    var Sound = function( obj )
    {
       var name = obj.name,
           settings = obj.settings;
    
       var getName = function()
       {
          return name;
       };
    
       var getUrl = function()
       {
          return settings.url;
       };
    
       return {
          getName: getName,
          getUrl: getUrl
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
    
    return {
        
    }
};

var UI = function()
{
    var ctx,
        data;
    var setCtx = function( newCtx )
    {
          ctx = newCtx;
    };
    var setData = function( newData )
    {
          data = newData;
    };
    var render = function( ctx, data )
    {
        setCtx( ctx );
        setData( data );
    };
    
    return {
        render: render   
    }
};

(function()
{
   
    
   
})();