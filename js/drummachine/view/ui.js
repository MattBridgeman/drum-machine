define(['jquery'], function( $ ) {
    var UI = function()
    {
        var ctx,
            track;

        var getCtx = function()
        {
            return ctx;
        };

        var setCtx = function( newCtx )
        {
            ctx = $(newCtx);
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
            getCtx: getCtx,
            setTrack: setTrack  
        }
    };

    return UI;
});