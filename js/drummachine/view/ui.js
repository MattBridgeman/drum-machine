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
            $(window).on( 'model:segment:change', renderSegment );
        };

        var renderSegment = function( e, data )
        {
            var pattern = track.getSelectedPattern();
            var btIdx = track.getSelectedBeatType();
            var segments = pattern.getBeatTypes()[btIdx].getSegements();
            var segmentIdx = track.getSegment();
            segments.forEach( function( segment, i )
            {
                var segmentUI = ctx.find('.beat').eq( i );
                var className = segment === 1 ? 'hard' : segment === 2 ? 'soft' : '';
                var selectedClass = 'on';
                segmentUI.removeClass( 'soft' ).removeClass( 'hard' );

                segmentUI.addClass( className );

                if( segmentIdx === i )
                {
                    segmentUI.addClass( selectedClass );
                }
                else
                {
                    segmentUI.removeClass( selectedClass );
                }
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