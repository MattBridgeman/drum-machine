define([], function() {
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

    return UI;
});