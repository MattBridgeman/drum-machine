define([], function() {
    var UI = function()
    {
        var ctx,
            track;

        var setCtx = function( newCtx )
        {
            ctx = document.querySelectorAll(newCtx);
        };

        var setTrack = function( newTrack )
        {
            track = newTrack;
        };

        var render = function( ctx, data )
        {
            setCtx( ctx );
            setData( data );
        };
        
        return {
            render: render,
            setCtx: setCtx,
            setTrack: setTrack  
        }
    };

    return UI;
});