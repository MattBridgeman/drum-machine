require([], function() {
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
});