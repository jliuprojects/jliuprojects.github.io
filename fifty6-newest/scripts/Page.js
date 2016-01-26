var projects = [];
var focusedProject = 0;
var inbetweenProjects = false;

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
	
	if (focusedProject == projects.length - 1) {
		var topOfNext = Infinity;
	} else {
		var topOfNext = projects[focusedProject + 1].html["title"].offset().top;
	}
	
	// debugger;
	if (topOfNext < bottomOfFocused && !inbetweenProjects) {
		console.log (topOfNext + "," + bottomOfFocused);
		projects[focusedProject].unfixTitle();
		inbetweenProjects = true;
	}
	
	if (inbetweenProjects && topOfNext < $(window).scrollTop() + window.innerHeight*0.1) {

		focusedProject++;
		projects[focusedProject].fixTitle();
		inbetweenProjects = false;
	}

	window.requestAnimationFrame(render);
}

$( document ).ready(function() {
	init();
});