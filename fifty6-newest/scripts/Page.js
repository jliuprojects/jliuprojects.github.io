var projects = [];
var focusedProject = 0;

function init () {
    $.getJSON("assets/projects.json", function(json) {
	    
	    for (var i = 0; i < json.projects.length; i++){
    		projects.push(new StyledProjectSet(
    							json.projects[i].title, 
    							json.projects[i].description, 
    							json.projects[i].metadata, 
    							json.projects[i].link));

    		projects[i].alignTitle();
    	}

    	projects[focusedProject].fixTitle();

    	// FIX THIS AFTER, need to load shit but set timeout for now
    	window.setTimeout(render, 500);
	});
}
	
function render() {

	var bottomOfFocused = projects[focusedProject].html["title"].offset().top + projects[focusedProject].html["title"].height();
	var topOfNext = projects[focusedProject + 1].html["title"].offset().top;
	// debugger;
	if (topOfNext < bottomOfFocused) {
		console.log (topOfNext + "," + bottomOfFocused);
		projects[focusedProject].unfixTitle();
	}
	
	window.requestAnimationFrame(render);
}

$( document ).ready(function() {
	init();
});