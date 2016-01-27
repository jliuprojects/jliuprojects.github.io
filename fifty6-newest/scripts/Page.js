var projects = [];
var focusedProject = 0;
var focusedTitleFixed = true;

function init () {
    $.getJSON("assets/projects.json", function(json) {
	    
	    for (var i = 0; i < json.projects.length; i++){
    		projects.push(new StyledProjectSet(
    							json.projects[i].title, 
    							json.projects[i].description, 
    							json.projects[i].metadata, 
    							json.projects[i].link));
    	}

    	// FIX THIS AFTER, need to load shit but set timeout for now
    	window.setTimeout(run, 500);
	});
}

function run() {
	for (var i = 0; i < projects.length; i++){
		projects[i].alignTitle();
	}

	projects[focusedProject].fixTitle();

	render();
}
	
function render() {

	var topOfFocused = projects[focusedProject].getTopPosition();
	var bottomOfFocused = projects[focusedProject].getBottomPosition();
	
	if (focusedProject == projects.length - 1) {
		var topOfNext = Infinity;
		var bottomOfNext = -Infinity;
	} else {
		var topOfNext = projects[focusedProject + 1].getTopPosition();
		var bottomOfNext = projects[focusedProject + 1].getBottomPosition();
	}

	if (focusedProject == 0) {
		var topOfPrev = Infinity;
		var bottomOfPrev = -Infinity;
	} else {
		var topOfPrev = projects[focusedProject - 1].getTopPosition();
		var bottomOfPrev = projects[focusedProject - 1].getBottomPosition();
	}
	
	// debugger;

	if (focusedTitleFixed) {
		if (topOfNext < window.pageYOffset + window.innerHeight) {
		// the next project title hit the bottom of the focused fixed title
			projects[focusedProject].unfixTitle("lower");
			direction = "next";
			focusedTitleFixed = false;
		} else if (bottomOfPrev > window.pageYOffset) {
			// the prev project title hit the top of the focused fixed title
			direction = "prev";
			projects[focusedProject].unfixTitle("upper");
			focusedTitleFixed = false;
		}
	} else {
		switch (direction) {
			case "next":
				if (bottomOfFocused > window.pageYOffset + window.innerHeight) {
					projects[focusedProject].fixTitle();
					focusedTitleFixed = true;
				} else if (topOfNext < window.pageYOffset) {
					focusedProject++;
					projects[focusedProject].fixTitle();
					focusedTitleFixed = true;
				}
				break;
			case "prev":
				if (topOfFocused < window.pageYOffset) {
					projects[focusedProject].fixTitle();
					focusedTitleFixed = true;
				} else if (bottomOfPrev > window.pageYOffset + window.innerHeight) {
					focusedProject--;
					projects[focusedProject].fixTitle();
					focusedTitleFixed = true;
				}
				break;
		}
	}
 
	console.log(focusedProject);
	window.requestAnimationFrame(render);
}

$( document ).ready(function() {
	init();
});