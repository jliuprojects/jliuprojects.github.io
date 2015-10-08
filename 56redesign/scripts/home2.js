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
		console.log('imgloaded');
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
		console.log(i + ":" + projects[i].getHeight());
		HTMLProjects.push(new HTMLProject(projects[i]));
	}

	HTMLProjects.push(new HTMLProject(projects[0])); //push first project on back

	var data = [];
	var heightSoFar = 0;

	// for (var i = 0; i < HTMLProject.length; i++){
	// 	data.push({start: 0, end: heightSoFar + HTMLProjects[i].getHeight(), sTransform: "transform: translate(" + 0 + "px, " + 0+ "px)", eTransform: "transform: translate(" + 0 + "px, -" + HTMLProjects[i].getHeight() + "px)"});

	// 	HTMLProjects[i].setData(data);
	// }
	$(window).scrollTop(HTMLProjects[0].getHeight());

	console.log(content.height());
	
}

$(window).scroll(function (event) {
    var scroll = $(window).scrollTop();
    var totalHeight = 0;
    

    for (var i = 0; i < HTMLProjects.length; i++){
    	totalHeight += HTMLProjects[i].getHeight();
    }

    var p2 = totalHeight - HTMLProjects[HTMLProjects.length - 1].getHeight();
    console.log(totalHeight);

    if (scroll > p2){
    	$(window).scrollTop(HTMLProjects[0].getHeight() + (scroll - p2));
    }

    if (scroll < HTMLProjects[0].getHeight()) {
    	$(window).scrollTop( totalHeight - HTMLProjects[HTMLProjects.length - 1].getHeight() - (HTMLProjects[0].getHeight() - scroll));
    }
});