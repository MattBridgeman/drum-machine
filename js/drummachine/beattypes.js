define(["text!drummachine/meta/beattypes.json","js/drummachine/sound.js"], function( jsonString, Sound ) {

	var BeatTypes = function()
	{
		var beatTypes;

		var setBeatTypes = function()
		{
			var json = JSON.parse(jsonString);
			
			for( var i = 0; i < json.beatTypes.length; i++ )
			{
				var bt = json.beatTypes[i];

				beatTypes.push(
					new Sound( bt )
				)
			}
		};

		var init = function()
		{
			beatTypes = [];
		};

		var load = function()
		{
			setBeatTypes();
		};

		init();
		load();
	};

	return BeatTypes;

});