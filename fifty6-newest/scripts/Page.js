var projects = [];
var focusedProject = 0;
var focusedTitleFixed = true;
var direction = null;

function init () {
    $.getJSON("assets/projects.json", function(json) {
	    
	    for (var i = 0; i < json.projects.length; i++){
    		projects.push(new StyledProjectSet(
    							json.projects[i].title, 
    							json.projects[i].description, 
    							json.projects[i].metadata, 
    							json.projects[i].link));

    		projects[i].alignTitle();
    		projects[i].populateLinks();
    		projects[i].html["title"].hover(
				function() {
					$(".hidden").css({"display" : "block"});
					$(this).find("h1").css({"display" : "none"});
				}, function() {
					$(".hidden").css({"display" : "none"});
					$(this).find("h1").css({"display" : "inline-block"});
				}
			);
    	}

    	projects[focusedProject].html["title"].css({"top" : projects[focusedProject].html["title"].offset().top - $(window).scrollTop(), 
							"position" : "fixed"});

    	// FIX THIS AFTER, need to load shit but set timeout for now
    	window.setTimeout(render, 500);
	});
}
	
function render() {

	var topOfFocused = projects[focusedProject].html["title"].offset().top;
	var bottomOfFocused = projects[focusedProject].html["title"].offset().top + projects[focusedProject].html["title"].height();
	
	if (focusedProject == projects.length - 1) {
		var topOfNext = Infinity;
		var bottomOfNext = -Infinity;
	} else {
		var topOfNext = projects[focusedProject + 1].html["title"].offset().top;
		var bottomOfNext = projects[focusedProject + 1].html["title"].offset().top + projects[focusedProject + 1].html["title"].height();
	}

	if (focusedProject == 0) {
		var topOfPrev = Infinity;
		var bottomOfPrev = -Infinity;
	} else {
		var topOfPrev = projects[focusedProject - 1].html["title"].offset().top;
		var bottomOfPrev = projects[focusedProject - 1].html["title"].offset().top + projects[focusedProject - 1].html["title"].height();
	}
	
	// debugger;

	if (focusedTitleFixed) {
		if (topOfNext < bottomOfFocused) {
		// the next project title hit the bottom of the focused fixed title
			var top = projects[focusedProject].html["title"].offset().top - projects[focusedProject].html["container"].offset().top;
			projects[focusedProject].unfixTitle(top);
			direction = "next";
			focusedTitleFixed = false;
		} else if (bottomOfPrev > topOfFocused) {
			// the prev project title hit the top of the focused fixed title
			var top = projects[focusedProject].html["title"].offset().top - projects[focusedProject].html["container"].offset().top;
			direction = "prev";
			projects[focusedProject].unfixTitle(top);
			focusedTitleFixed = false;
		}
	} else {
		switch (direction) {
			case "next":
				if (bottomOfFocused > $(window).scrollTop() + window.innerHeight) {
					var top = projects[focusedProject].html["title"].offset().top - $(window).scrollTop();
					projects[focusedProject].fixTitle(top);
					focusedTitleFixed = true;
				} else if (topOfNext < $(window).scrollTop() + window.innerHeight*0.1) {
					focusedProject++;
					var top = projects[focusedProject].html["title"].offset().top - $(window).scrollTop();
					projects[focusedProject].fixTitle(top);
					focusedTitleFixed = true;
				}
				break;
			case "prev":
				if (topOfFocused < $(window).scrollTop() + window.innerHeight*0.1) {
					var top = projects[focusedProject].html["title"].offset().top - $(window).scrollTop();
					projects[focusedProject].fixTitle(top);
					focusedTitleFixed = true;
				} else if (bottomOfPrev > $(window).scrollTop() + window.innerHeight) {
					focusedProject--;
					var top = projects[focusedProject].html["title"].offset().top - $(window).scrollTop();
					projects[focusedProject].fixTitle(top);
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