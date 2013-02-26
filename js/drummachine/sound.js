define([], function() {
	var Sound = function( obj )
	{
		var name = obj.name,
			urls = obj.urls;

		var getName = function()
		{
			return name;
		};

		var getUrl = function( index )
		{
			switch( index )
			{
				case 0:
					return;
				case 1:
					return urls.hard;
				case 2:
					return urls.soft;
			}
		};

		return {
			getName: getName,
			getUrl: getUrl
		}
	};

	return Sound;
});