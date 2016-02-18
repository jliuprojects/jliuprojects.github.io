var ARROWSVG = [
	"<?xml version='1.0' encoding='utf-8'?><svg version='1.1' class='link_arrow' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='-273 365 64 64' enable-background='new -273 365 64 64' xml:space='preserve'><path class='arrow' fill='none' stroke='", 
	"' stroke-width='2' stroke-linejoin='bevel' stroke-miterlimit='10' d='M-225,404 -218,397 -225,390 '/><path class='line' fill='none' stroke='", 
	"' stroke-width='2' stroke-miterlimit='10' d='M-218,397 -230,397 -264,397 '/></svg>"];

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
	this.titleFixed = true;

	/* Creating Project Container */
	this.html["container"] = document.createElement("div");
	this.html["container"].setAttribute("class", "project_container");
	/* Done Creating Project Container */

	/* Creating Project Title */
	var tempH1 = document.createElement("h1");
	tempH1.innerHTML = this.title;
	tempH1.setAttribute("class", "project_title");
	this.html["title"] = document.createElement("div");
	this.html["title"].appendChild(tempH1);
	this.html["title"].setAttribute("class", "project_title_container");
	this.html["title"].style.color = this.textColour;
	$(tempH1).bind('click tap',function(){
		$(self.html["link"]).find("a")[0].click();
	});
	/* Done Creating Project Title */

	/* Create Project Text Elements */
	var projectTextKeys = ["link", "metadata", "description"];
	projectTextKeys.forEach(function(key) {
		switch (key){
			case "link":
				self.html[key] = document.createElement("h3");
				self.html[key].innerHTML = self[key];
				self.html[key].innerHTML += ARROWSVG[0] + self.textColour + ARROWSVG[1] + self.textColour + ARROWSVG[2];
				self.html[key].setAttribute("class", "project_" + key);
				self.html[key].style.color = self.textColour;
				$(self.html[key]).find("svg").css({fill:this.textColour});
				break;
			default:
				self.html[key] = document.createElement("h3");
				self.html[key].innerHTML = self[key];
				self.html[key].setAttribute("class", "project_" + key);
				self.html[key].style.color = self.textColour;
		}
	});
	/* Done Creating Project Text Elements */

	/* Creating Project Images */
	this.html["images"] = [];
	for (var i = 0; i < json.images.length; i++){
		this.html["images"].push(document.createElement('img'));
		this.html["images"][i].setAttribute("class", "project_image");
		this.html["images"][i].onload = function() {
	 		json.cb();
	 	};
		this.html["images"][i].src = json.images[i].url;
		this.imageOpacities.push(0);
	 	
	}
	/* Done Creating Project Images */

	/* Add Elements To Container */
	this.html["container"].appendChild(this.html["link"]);
	this.html["container"].appendChild(this.html["description"]);
	this.html["container"].appendChild(this.html["metadata"]);
	for (var i = 0; i < json.images.length; i++){
		this.html["container"].appendChild(this.html["images"][i]);
	}
	this.html["container"].appendChild(this.html["title"]);
	/* Done Adding Elements To Container */
	
	/* Add Container To Body */
	$("body").append(this.html["container"]);
}

StyledProjectSet.prototype.fixTitle = function() {
	this.html["title"].style.top = 0 + "px";
	this.titleFixed = true;
};

StyledProjectSet.prototype.unfixTitle = function(side) {
	console.log("unfix");
	var scroll = window.pageYOffset;
	var top = [];
	top["upper"] = this.topPosition - scroll;
	top["lower"] = -(scroll + window.innerHeight - this.topPosition - this.containerHeight);

	this.html["title"].style.top = top[side] + "px";
	this.titleFixed = false;
};

StyledProjectSet.prototype.setPositions = function() {
	this.topPosition = $(this.html["container"]).offset().top;
	this.bottomPosition = $(this.html["container"]).offset().top + $(this.html["container"]).height();
	this.containerHeight = $(this.html["container"]).height();

	this.imagePositions = [];
	for (var i = 0; i < this.html["images"].length; i++) {
		this.imagePositions.push($(this.html["images"][i]).offset().top);
	}

	$(".project_link a").on({
	    mouseenter: function () {
	        $( this ).siblings().css({opacity : 1});
	    },
	    mouseleave: function () {
	        $( this ).siblings().css({opacity : 0});
	    }
	});
};

StyledProjectSet.prototype.fixTitleMobile = function () {
	this.html["link"].style.marginTop = $(this.html["title"]).find("h1").height() + 50;
}

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
	this.html["images"][index].className += " projectFadeInUpClass";
	this.imageOpacities[index] = 1;
};

StyledProjectSet.prototype.fadeInUpInfo = function() {
	this.html["link"].className += " projectFadeInUpClass";
	this.html["description"].className += " projectFadeInUpClass";
	this.html["metadata"].className += " projectFadeInUpClass";
	this.infoOpacity = 1;
};

StyledProjectSet.prototype.setTheme = function() {
	document.getElementById("background").style.backgroundColor = this.bgColour;
	document.getElementById("header_text").style.color = this.textColour;
	document.getElementById("logo").style.fill = this.textColour;
	document.getElementById("pointer").style.fill = this.textColour;
};

StyledProjectSet.prototype.getBgColour = function() {
	return this.bgColour;
};

StyledProjectSet.prototype.getTextColour = function() {
	return this.textColour;
};

StyledProjectSet.prototype.isTitleFixed = function() {
	return this.titleFixed;
};