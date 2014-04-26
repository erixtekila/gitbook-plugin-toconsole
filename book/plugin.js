require
(
	["gitbook", "jquery"]
	, function ( gitbook, $ )
	{
		var buttontext = "Evaluate in console";

		/**
			Config time
		*/
		gitbook.events.on
		(
			"start", function( e, config )
			{
				if( config.buttontext ) buttontext = config.buttontext;
			}
		);

		/**
			Fired after each new page enhancment
		*/
		gitbook.events.on
		(
			"page.change", function ()
			{
				$( ".lang-js" ).each
				(
					function()
					{
						var $this = $( this )
							,$pre = $this.closest( "pre" )
						;

						$pre.after
						(
							'<div class="js-toconsole clearfix" ><button class="btn pull-right">'+ buttontext +'</button></div>'
						);

						$pre.siblings( ".js-toconsole" )
							.last()
							.on
							(
								"click", function()
								{
									eval( $this.text() );
								}
							);

					}
				);
			}
		);
	}
);