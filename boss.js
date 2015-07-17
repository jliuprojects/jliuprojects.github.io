$(document).ready(function(){
	$('.project-entry').hover(function() {
		$( this ).append( $("<span> &larr;</span>"));
	}, function() {
		$( this ).find("span:last").remove();
	});
});
