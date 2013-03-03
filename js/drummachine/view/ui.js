define(['jquery'], function( $ ) {
    var UI = function( newCtx, newTrack )
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
            var pattern = track.getSelectedPattern();
            var btIdx = track.getSelectedBeatType();
            var segments = pattern.getBeatTypes()[btIdx].getSegements();

            segments.forEach( function( segment, i )
            {
               var segmentUI = ctx.find('.beat').eq( i );
               var className = segment === 1 ? 'hard' : segment === 2 ? 'soft' : '';
               
                segmentUI.removeClass( 'soft' ).removeClass( 'hard' );

                segmentUI.addClass( className );
            } );
        };

        var render = function( ctx, data )
        {
            renderSegment();
        };

        var init = function()
        {
            setUpEvents();
            setTrack( newTrack );
            setCtx( newCtx );
            render();
        };

        init();
        
        return {
            setCtx: setCtx,
            getCtx: getCtx,
            setTrack: setTrack  
        }
    };

    return UI;
});