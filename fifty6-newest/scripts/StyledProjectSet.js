function StyledProjectSet(json) {
	var self = this;
	this.title = json.title;
	this.description = json.description;
	this.metadata = json.metadata;
	this.link = json.link;
	this.textColour = json.textcolour;
	this.bgColour = json.bgcolour;
	this.topPosition = Infinity;
	this.bottomPosition = -Infinity;
	this.imagePositions = [];
	this.imageOpacities = [];
	this.infoOpacity = 0;
	this.numImagesLoaded = 0;
	this.numImages = json.images.length;
	this.containerHeight = 0;

	this.html = [];
	this.html["container"] = $("<div class='project_container'></div>");
	this.html["link"] = $("<h3 class='project_link'>" + this.link + "</h3>");
	this.html["title"] = $("<div class='project_title_container'><h1 class='project_title'>"  + this.title + "</h1></div>");
	this.html["description"] = $("<h3 class='project_description'>" + this.description + "</h3>");
	this.html["metadata"] = $("<h3 class='project_metadata'>" + this.metadata + "</h3>");
	this.html["images"] = [];
	
	this.html["container"].append(this.html["link"]);
	this.html["container"].append(this.html["description"]);
	this.html["container"].append(this.html["metadata"]);
	
	for (var i = 0; i < json.images.length; i++){
		this.html["images"].push($("<img class='project_image' src='" + json.images[i].url + "'>"));
	 	this.html["container"].append(this.html["images"][i]);
	 	this.html["images"][i].load(function() {
	 		self.numImagesLoaded++;
	 		// console.log(this.src + " loaded");
	 		if (self.numImagesLoaded == self.numImages) {
	 			json.cb();
	 		}
	 	});
	}
	for (var i = 0; i < json.images.length; i++){
		this.imageOpacities.push(0);
	}
	
	this.html["container"].append(this.html["title"]);
	this.html["title"][0].style.color = this.textColour;
	this.html["link"][0].style.color = this.textColour;
	this.html["description"][0].style.color = this.textColour;
	this.html["metadata"][0].style.color = this.textColour;

	$("body").append(this.html["container"]);
}

// fix title position on screen
StyledProjectSet.prototype.fixTitle = function() {
	this.html["title"][0].style.top = 0 + "px";
	// this.html["title"][0].style.position = "fixed";
};

StyledProjectSet.prototype.unfixTitle = function(side) {
	var scroll = window.pageYOffset;
	var top = [];
	top["upper"] = this.topPosition - scroll;
	top["lower"] = -(scroll + window.innerHeight - this.topPosition - this.containerHeight);
	// top["upper"] = 0;
	// top["lower"] = this.topPosition + this.containerHeight - window.innerHeight;

	// this.html["title"][0].style.position = "absolute";
	this.html["title"][0].style.top = top[side] + "px";
};

StyledProjectSet.prototype.setPositions = function() {
	// this.html["title"].find("h1")[0].style.left = this.html["title"].width()/2 - this.html["title"].find("h1").height()/2;
	this.topPosition = this.html["container"].offset().top;
	this.bottomPosition = this.html["container"].offset().top + this.html["container"].height();
	this.containerHeight = this.html["container"].height();

	this.imagePositions = [];
	for (var i = 0; i < this.html["images"].length; i++) {
		this.imagePositions.push(this.html["images"][i].offset().top);
	}
};

StyledProjectSet.prototype.setPositionsMobile = function() {
	this.topPosition = this.html["container"].offset().top;
	this.bottomPosition = this.html["container"].offset().top + this.html["container"].height();

	this.imagePositions = [];
	for (var i = 0; i < this.html["images"].length; i++) {
		this.imagePositions.push(this.html["images"][i].offset().top);
	}

	var titleHeight = this.html["title"].height();
	this.html["link"].css({"margin-top" : 60 + titleHeight + "px"});
};

StyledProjectSet.prototype.getImagePositions = function() {
	return this.imagePositions;
};

StyledProjectSet.prototype.getImageOpacities = function() {
	return this.imageOpacities;
};

StyledProjectSet.prototype.getInfoOpacity = function() {
	return this.infoOpacity;
};

StyledProjectSet.prototype.getTopPosition = function() {
	return this.topPosition;
};

StyledProjectSet.prototype.getBottomPosition = function() {
	return this.bottomPosition;
};

StyledProjectSet.prototype.fadeInUpPicture = function(index) {
	this.html["images"][index][0].className += " projectFadeInUpClass";
	this.imageOpacities[index] = 1;
};

StyledProjectSet.prototype.fadeInUpInfo = function() {
	this.html["link"][0].className += " projectFadeInUpClass";
	this.html["description"][0].className += " projectFadeInUpClass";
	this.html["metadata"][0].className += " projectFadeInUpClass";
	this.infoOpacity = 1;
};

StyledProjectSet.prototype.setTheme = function() {
	$('#background')[0].style.backgroundColor = this.bgColour;
	$("#header_text")[0].style.color = this.textColour;
	$('#logo')[0].style.fill = this.textColour;
	$('#pointer')[0].style.fill = this.textColour;
};

StyledProjectSet.prototype.getBgColour = function() {
	return this.bgColour;
};

StyledProjectSet.prototype.getTextColour = function() {
	return this.textColour;
};