define([], function() {
  	
	var Controller = function( newTrack, newUI )
	{ 
		var setUpEvents,
            handleSegment,
            track,
            ui;

        var setTrack = function( newTrack )
        {
            track = newTrack;
        };

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

        var init = function( newTrack, newUI )
        {
        	setTrack( newTrack );
        	setUI( newUI );
        	setUpEvents();
        };

        init( newTrack, newUI );
	};

	return Controller;
});