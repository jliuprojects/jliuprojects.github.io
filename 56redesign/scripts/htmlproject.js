function HTMLProject (project) {
	this.colour = project.colour;
	this.html = []
	this.html["container"] = $("<div class='project-container slide'></div>");
	this.html["title"] = $("<div class='project-title'>" + project.title + "</div>");
	this.html["client"] = $("<div class='project-client'>" + project.client + "</div>");
	this.html["date"] = $("<div class='project-date'>" + project.date + "</div>");
	this.focused = false;

	this.images = [];

	// this.images.push($("<img class='feature-img' src=" + project.images[0].url + ">"));
	for (var i = 0; i < project.images.length; i++){
		this.images.push($("<img class='project-img slide' src=" + project.images[i].url + ">"));
	}

	for (var key in this.html) {
	 	this.html["container"].append(this.html[key]);
	}

	this.html["container"].append(this.images);

	$('.full').append(this.html["container"]);

	this.getHeight = function(){
		return this.html["container"].height();
	}

	this.getColour = function(){
		return this.colour;
	}

	this.isFocused = function(){
		return this.Focus;
	}

	this.setFocus = function(focus){
		this.Focus = focus;
	}

	var self = this;
	this.load = function load (callback){

		var count = 0;
		for (var i = 0; i < self.images.length; i++){
			this.images[i].load(function(){
				count++;

				if (count == self.images.length){
					callback();
				}
			});
		}
	}
}