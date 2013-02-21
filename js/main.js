require.config({
    paths : {
        jquery : 'libs/jquery/jquery-min',
        text : 'libs/require/text',
        json2 : 'libs/json2/json2'
    }
});

require([ 'require', 'js/drummachine/track.js', 'js/drummachine/view/ui.js', 'js/drummachine/controller/track.js' ], function( require, Track, UI, Controller ) {
    //init app here
    (function()
    {
        var __trackDir    = 'drummachine/tracks/';
        var defaultTrack  = 'default.json';
        var ctx           = '#canvas';
        var track;
        var init;
        var ui;
        var controller;

        var loadTrack = function( trackName )
        {
            var trackDir = 'text!' + __trackDir + trackName;
            require( [ trackDir ], function( trackJson )
            {
                track = new Track();
                track.load( trackJson );
            });
        };

        var initUI = function()
        {
            ui = new UI();
            ui.setTrack( track );
            ui.setCtx( ctx )
        };

        var initController = function()
        {
            controller = new Controller( track, ui );
        };

        var init = function()
        {
            loadTrack( defaultTrack );
            initUI();
            initController();
        };

        init();
    })();
});