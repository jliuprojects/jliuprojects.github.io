var HTMLProjects = [];
var projectsInited = 0;
var NUM_PROJECTS = 0;

function initHeights(){
	projectsInited++;

	if (projectsInited == NUM_PROJECTS){
		main();
	}
}

$( document ).ready(function() {
	$.getJSON("data/projects.json", function(json) {
		NUM_PROJECTS = json.projects.length;

		HTMLProjects.push(new HTMLProject(json.projects[NUM_PROJECTS - 1]));
	    for (var i = 0; i < json.projects.length; i++){
	    	HTMLProjects.push(new HTMLProject(json.projects[i]));
	    	HTMLProjects[i].load(initHeights);
	    }
	    HTMLProjects.push(new HTMLProject(json.projects[0]));

	});
});

//at this point we have all project data loaded
//and we know the height of each project
function main(){
	console.log('all loaded');

	$(window).scrollTop(HTMLProjects[0].getHeight());
}

function currentFocused (projects){
	for (var i = 0; i < projects.length; i++){
    	if (projects[i].isFocused()){
    		return i;
    	}
    }
    return 0;
}

function handleBackground(scroll){
	var heightSoFar = 0;
    var focused = currentFocused(HTMLProjects);
    for (var i = 0; i < HTMLProjects.length; i++){
    	if (!HTMLProjects[i].isFocused() && 
    		scroll >= heightSoFar &&
    		scroll < heightSoFar + HTMLProjects[i].getHeight()){
    			$("body").css('background-color' , HTMLProjects[i].getColour());
    			HTMLProjects[focused].setFocus(false);
    			HTMLProjects[i].setFocus(true);
    			break;
    	}

    	heightSoFar += HTMLProjects[i].getHeight();
    }
}

function handleInfScroll(scroll){
	var totalHeight = 0;
	for (var i = 0; i < HTMLProjects.length; i++){
    	totalHeight += HTMLProjects[i].getHeight();
    }

    var p2 = totalHeight - HTMLProjects[HTMLProjects.length - 1].getHeight();

    if (scroll > p2){
    	$(window).scrollTop(HTMLProjects[0].getHeight() + (scroll - p2));
    }

    if (scroll < HTMLProjects[0].getHeight()) {
    	$(window).scrollTop( totalHeight - HTMLProjects[HTMLProjects.length - 1].getHeight() - (HTMLProjects[0].getHeight() - scroll));
    }
}

var scroll;
var lastScroll = 0;
var scrollJack = 0;

$('body').on({
    'mousewheel': function(e) {
    	lastScroll = scroll;
    	scroll = $(window).scrollTop();

        if (e.target.id == 'el') return;

        if(scrollJack){
        	e.preventDefault();
        	e.stopPropagation();
    		return;
    	}

    	checkLock(e);
    	handleInfScroll(scroll);
	    handleBackground(scroll);	    
    }
});

function checkLock (e){
    var heightSoFar = HTMLProjects[0].getHeight();
    var scrollDist = 0;

    if (e.originalEvent.wheelDeltaY < 0){
    	scrollDist += Math.abs(e.originalEvent.wheelDeltaY);
    }

    for (var i = 1; i < HTMLProjects.length; i++){
    	if (!HTMLProjects[i].isLocked() && 
    		scroll + scrollDist >= heightSoFar){
    			// setTimeout(function(){ $(window).scrollTop(heightSoFar);}, 0);
    			HTMLProjects[i].setLock(true);
    			scrollJack = 1;
    			setTimeout(function(){ 
    				scrollJack = 0;
    			}, 500);
    			break;
    	}
    	heightSoFar += HTMLProjects[i].getHeight();
    }
}

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;  
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function disableScroll() {
  if (window.addEventListener) // older FF
      window.addEventListener('DOMMouseScroll', preventDefault, false);
  window.onwheel = preventDefault; // modern standard
  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
  window.ontouchmove  = preventDefault; // mobile
  document.onkeydown  = preventDefaultForScrollKeys;
}

function enableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null; 
    window.onwheel = null; 
    window.ontouchmove = null;  
    document.onkeydown = null;  
}