define(['jquery'], function( $ ) {
    var UI = function()
    {
        var ctx,
            track,
            setUpEvents,
            renderSegment;

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

        var setUpEvents = function()
        {
            $(window).on( 'model:segment:update', renderSegment );
        };

        var renderSegment = function( e, data )
        {
            var pattern = getSelectedPattern();
            var btIdx = getSelectedBeatType();
            var segements = pattern.getBeatTypes()[btIdx].setSegments();
        };

        var render = function( ctx, data )
        {
            setCtx( ctx );
            setData( data );
        };
        
        return {
            setCtx: setCtx,
            getCtx: getCtx,
            setTrack: setTrack  
        }
    };

    return UI;
});