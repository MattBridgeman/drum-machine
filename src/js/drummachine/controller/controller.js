define([], function() {
        
        var Controller = function( newUI )
        { 
            var setUpEvents,
                handleSegment,
                ui;

            var setUI = function( newUI )
            {
                ui = newUI;
            };

            var setUpEvents = function()
            {
                ui.getCtx().on( 'click', '.beat', handleSegment );
                ui.getCtx().on( 'click', '.playPause', handlePlayPause );
            };

            var handleSegment = function( e )
            {
                var index = $(this).index();
                $(window).trigger( 'ui:button:segment', { index: index } );
                $(window).trigger( 'audio', { index: index } );
            };

            var handlePlayPause = function( e )
            {
                $(window).trigger( 'ui:button:playPause' );
            };

            var init = function( newUI )
            {
                setUI( newUI );
                setUpEvents();
            };

            init( newUI );
        };

        return Controller;
});