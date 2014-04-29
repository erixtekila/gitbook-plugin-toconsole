var cheerio = require( "cheerio" )
	,$
	,buttontext = "Evaluate in console"
	;

module.exports =
{
	book:
	{
		assets: "./book"
	}
	,hooks:
	{
		// This is called for each page of the book
		// It can be used for modifing page content
		// It should return the new page
		page: function ( page )
		{
			var section
			;
			for ( var i in page.sections )
			{
				section = page.sections[i];
				if ( section.type == "normal" )
				{
					$ = cheerio.load( section.content );
					$( ".lang-js" ).each
					(
						function()
						{
							var $this = $( this )
								,$pre = $this.parent( "pre" )
								;
							$pre.after
							(
								'<div class="js-toconsole clearfix" ><button class="btn pull-right" onclick="eval('+ $this.text().replace( /\r?\n|\r|\t/g, "" ).replace( /'/g, "\\\'" ) +')">'+ buttontext +'</button></div>'
							);

							//FIXME Monkey patch cheerio escaping strings
							// Replace by transform
							section.content = $.html().replace(/(eval\()(.*)(\))/g, "$1'$2'$3" );
						}
					);
				}
			}
			return page;
		}
	}
};