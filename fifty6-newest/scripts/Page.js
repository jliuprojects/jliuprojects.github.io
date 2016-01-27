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
		projects[i].setPositions();
	}

	
	projects[focusedProject].fixTitle();
	render();
}

function start() {

}
	
function render() {

	animateTitles();
	picturesFadeUp();
 
	console.log(focusedProject);
	window.requestAnimationFrame(render);
}

function picturesFadeUp() {
	var scroll = window.pageYOffset;
	var middleOfScreen = scroll + window.innerHeight/2;
	var images = projects[focusedProject].getImagePositions();
	var opcs = projects[focusedProject].getImageOpacities();

	for (var i = 0; i < images.length; i++) {
		if (images[i] < middleOfScreen && opcs[i] != 1) {
			projects[focusedProject].fadeInUp(i);
		}
	}
}

function animateTitles() {
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

	if (focusedTitleFixed) { // check if the focused title is fixed, extra rc prevention
		if (topOfNext < window.pageYOffset + window.innerHeight) {
			// the top of the next project container hit the bottom of the screen
			projects[focusedProject].unfixTitle("lower");
			direction = "next";
			focusedTitleFixed = false;
		} else if (bottomOfPrev > window.pageYOffset) {
			// the bottom of the prev project container hit the top of the screen
			direction = "prev";
			projects[focusedProject].unfixTitle("upper");
			focusedTitleFixed = false;
		}
	} else {
		switch (direction) {
			case "next":
				if (bottomOfFocused > window.pageYOffset + window.innerHeight) {
					// the bottom of the focused project container hit the bottom of the screen
					projects[focusedProject].fixTitle();
					focusedTitleFixed = true;
				} else if (topOfNext < window.pageYOffset) {
					// the top of the next project container hit the top of the screen
					focusedProject++;
					projects[focusedProject].fixTitle();
					focusedTitleFixed = true;
				}
				break;
			case "prev":
				if (topOfFocused < window.pageYOffset) {
					// the top of the focused project container hit the top of the screen
					projects[focusedProject].fixTitle();
					focusedTitleFixed = true;
				} else if (bottomOfPrev > window.pageYOffset + window.innerHeight) {
					// the bottom of the prev project container hit the bottom of the screen
					focusedProject--;
					projects[focusedProject].fixTitle();
					focusedTitleFixed = true;
				}
				break;
		}
	}
}

$( document ).ready(function() {
	init();
});