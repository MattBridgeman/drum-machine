define([], function() {

	var BeatType = function( beatType )
	{
		var name,
			segments;

		var getName = function()
		{
			return name;
		};

		var setName = function( newName )
		{
			name = newName;
		};

		var getSegements = function()
		{
			return segments;
		};

		var setSegments = function( newSegements )
		{
			segments = newSegements;
		};

		var init = function()
		{
			name = "";
			segments = [];
		};

		var load = function( beatType )
		{
			setName( beatType.name );
			setSegments( beatType.segements );
		};

		init();

		load( beatType );

		return {
			getName: getName,
			getSegements: getSegements
		}
	};

	return BeatType;
});