function HTMLProject (project) {
	this.colour = project.getColour();
	this.html = []
	this.html["container"] = $("<div class='project-container'></div>");
	this.html["title"] = $("<div class='project-title'>" + "<p>" + project.getTitle() + "</p></div>");
	this.html["client"] = $("<div class='project-client'>" + "<p>" + project.getClient() + "</p></div>");
	this.html["date"] = $("<div class='project-date'>" + "<p>" + project.getDate() + "</p></div>");
	this.height = project.getHeight();
	this.focused = false;

	this.images = [];

	for (var i = 0; i < project.getImages().length; i++){
		this.images.push($("<img class='project-img' src=" + project.getImages()[i] + ">"));
	}

	for (var key in this.html) {
	 	this.html["container"].append(this.html[key]);
	 	this.html[key].css('opacity', '0.5');
	}

	for (var i = 0; i < this.images.length; i++){
	 	this.html["container"].append(this.images[i]);
	 	this.images[i].css('opacity', '0.5');
	}

	$('.content').append(this.html["container"]);

	this.setData = function (data){
		for (var i = 0; i < data.length; i++){
			this.html["container"].attr("data-" + data[i].start, data[i].sTransform);
			this.html["container"].attr("data-" + data[i].end, data[i].eTransform);
		}
	}

	this.getHeight = function(){
		return this.html["container"].height();
	}

	this.getColour = function(){
		return this.colour;
	}

	this.setFocus = function(focus){
		this.focused = focus;
	}

	this.isFocused = function(){
		return this.focused;
	}
}