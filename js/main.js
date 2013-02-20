require.config({
    paths : {
        jquery : 'libs/jquery/jquery-min',
        text : 'libs/require/text',
        json2 : 'libs/json2/json2'
    }
});

require([ 'require', 'js/drummachine/track.js' ], function( require, Track ) {
    //init app here
    (function()
    {
        var __trackDir    = 'drummachine/tracks/';
        var defaultTrack  = 'default.json';
        var track;
        var init;

        var loadTrack = function( trackName )
        {
            var trackDir = 'text!' + __trackDir + trackName;
            require( [ trackDir ], function( trackJson )
            {
                track = new Track();
                track.load( trackJson );
            });
        };

        var init = function()
        {
            loadTrack( defaultTrack );
        };

        init();
    })();
});