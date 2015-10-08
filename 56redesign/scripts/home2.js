var projects = [];
var HTMLProjects = [];
var projectsInited = 0;

function load (project, callback){
	var imgHTML = "";

	for (var i = 0; i < project.images.length; i++){
		imgHTML += "<img class='project-img' src=" + project.images[i] + ">";
	}
	var div = $("<div class='project-container'>" +
					"<div class='project-title'>" + "<p>" + project.title + "</p></div>" +
					"<div class='project-client'>" + "<p>" + project.client + "</p></div>" + 
					"<div class='project-date'>" + "<p>" + project.date + "</p></div>" +
					imgHTML +
				"</div>").css('display','none').appendTo('.content');

	var count = 0;
	div.children('img').load(function(){
		count++;

		if (count == project.images.length){
			div.remove();
			callback();
		}
	});
}

function initHeights(){
	projectsInited++;

	if (projectsInited == projects.length){
		main();
	}
}

$( document ).ready(function() {
	$.getJSON("data/projects.json", function(json) {
	    for (var i = 0; i < json.projects.length; i++){
	    	projects.push(new Project(json.projects[i]));
	    	load(projects[i], initHeights);
	    }
	});
});

//at this point we have all project data loaded
//and we know the height of each project
function main(){
	console.log('all loaded');
	var content = $('.content');

	HTMLProjects.push(new HTMLProject(projects[projects.length - 1])); //push last to front

	for (var i = 0; i < projects.length; i++){
		HTMLProjects.push(new HTMLProject(projects[i]));
	}

	HTMLProjects.push(new HTMLProject(projects[0])); //push first project on back

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
$(window).scroll(function (event) {
	lastScroll = scroll;
    scroll = $(window).scrollTop();
    
    handleInfScroll(scroll);
    handleBackground(scroll);
    
    scrolljack();
});


function scrolljack() {
	var heightSoFar = 0;
	var firstScroll = scroll;
    for (var i = 0; i < HTMLProjects.length; i++){
    	if (lastScroll < heightSoFar && 
    		firstScroll >= heightSoFar &&
    		firstScroll < heightSoFar + HTMLProjects[i].getHeight()){
    			$(window).scrollTop(heightSoFar); //force it to go to top of project

    			lockScroll();
    			setTimeout(function(){ 
    				unlockScroll(); 
    			}, 1000);
    			break;
    	}
    	heightSoFar += HTMLProjects[i].getHeight();
    }
}

function lockScroll(){
	// lock scroll position, but retain settings for later
	var html = jQuery('html');
	html.data('previous-overflow', html.css('overflow'));
	html.css('overflow', 'hidden');
}

function unlockScroll(){
	// un-lock scroll position
	var html = jQuery('html');
	html.css('overflow', html.data('previous-overflow'));
}