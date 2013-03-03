require.config({
    paths : {
        jquery : 'libs/jquery/jquery-min',
        text : 'libs/require/text',
        json2 : 'libs/json2/json2'
    }
});

require([ 
    'require', 
    'js/drummachine/track.js', 
    'js/drummachine/view/ui.js', 
    'js/drummachine/controller/controller.js', 
    'js/drummachine/audio/audioloader.js',
    'js/drummachine/controller/rhythm.js' ], function( 
        require, 
        Track, 
        UI, 
        Controller, 
        AudioLoader,
        Rhythm ) {
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
        var rhythm;
        var audioloader;
        var setUpEvents;

        var loadTrack = function( trackName )
        {
            var trackDir = 'text!' + __trackDir + trackName;
            require( [ trackDir ], function( trackJson )
            {
                track = new Track();
                track.load( trackJson );
            });
        };

        var setUpEvents = function(){
            $(window).on( 'track:loaded', function()
            {
                initUI();
                initController();
                initLoader();
                initRhythm();
            });
        }

        var initUI = function()
        {
            ui = new UI( ctx, track );
        };

        var initController = function()
        {
            controller = new Controller( ui );
        };

        var initLoader = function()
        {
            audioLoader = new AudioLoader( track );
        };

        var initRhythm = function()
        {
            rhythm = new Rhythm( track );
        };

        var init = function()
        {
            loadTrack( defaultTrack );
        };

        init();
        setUpEvents();
    })();
});