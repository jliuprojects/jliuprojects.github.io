var heightSoFar = 0;
function Set(index, imgs, widths, launch, title, description, last){
	this.imgshtml = '';
	this.sign = -1;
	this.classname = 'left';
	this.widths = widths; //first spacing margin
	if (index%2){
		this.sign = 1;
		this.classname = 'right';
	}
	for (var i = 0; i < imgs.length; i++){
		this.imgshtml += "<img class='project-img' src=" + imgs[i] + ">";
	}

	this.text = $("<div class='project-container-" + this.classname + "'>" + 
					"<div class='project-metadata'><div class='project-title'>" + 
					title + 
					"</div><div class='project-description'>" + 
					description + 
					"</div>" + launch + "</div>" +
					this.imgshtml + "</div>");

	$('#work-container').append(this.text);
	var self = this;

	for (var i = 0; i < imgs.length; i++){
		self.imgshtml += "<img class='project-img' src=" + imgs[i] + ">";
		// self.widths += 870 + 200;
	}

	self.text.width(self.widths + 500);

	var endVertScroll1 = heightSoFar;
	var endSideScroll = endVertScroll1 + self.text.width() - window.innerWidth;
	var endVertScroll2 = endSideScroll + window.innerHeight;

	if (index){
		self.text.attr( "data-" + (heightSoFar - window.innerHeight), "transform: translate(0px, 0px)");
		self.text.attr( "data-" + endVertScroll1, "transform: translate(0px, -" + window.innerHeight + "px)");
		self.text.attr( "data-" + endSideScroll, "transform: translate(" + self.sign * (self.text.width() - window.innerWidth) + "px" + ", -" + window.innerHeight + "px)");
		if (!last){
			self.text.attr( "data-" + endVertScroll2, "transform: translate(" + self.sign * (self.text.width() - window.innerWidth) + "px" + ", -" + window.innerHeight*2 + "px)");
		}
	}else{
		self.text.attr( "data-0", "transform: translate(0px, 0px)");
		self.text.attr( "data-" + (heightSoFar + self.text.width() - window.innerWidth), "transform: translate(" + (-1*(self.text.width() - window.innerWidth)) + "px" + ", 0px)");
		self.text.attr( "data-" + endVertScroll2, "transform: translate(" + (-1*(self.text.width() - window.innerWidth)) + "px" + ", -" + window.innerHeight + "px)");
	}
	heightSoFar = endVertScroll2;
}