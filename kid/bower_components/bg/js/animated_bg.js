;(function($, window, document, undefined) {

	$.fn.animatedBG = function(options){
		var defaults = {
				colorSet: ['#f0f0f0', '#e2e1f5', '#f0f0f0', '#e2e1f5'],
				speed: 1000
			},
			settings = $.extend({}, defaults, options);

		return this.each(function(){
			var $this = $(this);

			$this.each(function(){
				var $el = $(this),
					colors = settings.colorSet;
				
				function shiftColor() {
					var color = colors.shift();
					colors.push(color);
					return color;
				}

				// initial color
				var initColor = shiftColor();
				$el.css('backgroundColor', initColor);
				setInterval(function(){
					var color = shiftColor();
					$el.animate({backgroundColor: color}, 3000);
				}, settings.speed);
			});
		});
	};

	// Initialize
	$(function(){
		$('.animated-bg').animatedBG();
	});

}(jQuery, window, document));