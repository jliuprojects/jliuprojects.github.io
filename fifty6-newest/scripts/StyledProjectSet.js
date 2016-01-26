function StyledProjectSet(title, description, metadata, link, imageSrc) {
	this.title = title;
	this.description = description;
	this.metadata = metadata;
	this.link = link;
	this.imageSrc = imageSrc || "assets/defaultImage.png";

	this.html = [];
	this.html["container"] = $("<div class='project_container'></div>");
	this.html["link"] = $("<h3 class='project_link'>" + this.link + "</h3>");
	this.html["title"] = $("<div class='project_title_container'><h1 class='project_title'>"  + this.title + "</h1></div>");
	this.html["description"] = $("<h3 class='project_description'>" + this.description + "</h3>");
	this.html["metadata"] = $("<h3 class='project_metadata'>" + this.metadata + "</h3>");
	this.html["images"] = [];
	
	this.html["container"].append(this.html["link"]);
	this.html["container"].append(this.html["metadata"]);
	this.html["container"].append(this.html["description"]);
	for (var i = 0; i < 5; i++){
		this.html["images"].push($("<img class='project_image' src='assets/defaultImage.png'>"));
	 	this.html["container"].append(this.html["images"][i]);
	}
	
	this.html["container"].append(this.html["title"]);
	$("body").append(this.html["container"]);
}

// fix title position on screen
StyledProjectSet.prototype.fixTitle = function() {
	this.html["title"].css({"top" : 0, 
							"position" : "fixed"});
};

StyledProjectSet.prototype.unfixTitle = function() {
	this.html["title"].css({"top" : this.html["title"].offset().top - this.html["container"].offset().top, 
							"position" : "absolute"});
};

StyledProjectSet.prototype.alignTitle = function() {
	this.html["title"].css({"height" : window.innerHeight - window.innerHeight*0.1});
	this.html["title"].find("h1").css({"top" : window.innerHeight/2 - this.html["title"].find("h1").height()/2});
};