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
            };

            var handleSegment = function( e )
            {
                var index = $(this).index();
                $(window).trigger('ui:button:segment', { index: index } );
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