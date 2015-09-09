var heightSoFar = 0;
function Set(index, imgs, title, description, last){
	var imgshtml = '';
	var sign = 1;
	var classname = 'left';
	if (index%2){
		sign = -1;
		classname = 'right';
	}
	for (var i = 0; i < imgs.length; i++){
		imgshtml += "<img class='project-img' src=" + imgs[i] + ">";
	}

	this.text = $("<div class='project-container-" + classname + "'>" + 
					"<div class='project-metadata'><div class='project-title'>" + 
					title + 
					"</div><div class='project-description'>" + 
					description + 
					"</div><div class='project-launch'>Launch Site</div></div>" +
					imgshtml + "</div>");

	$('#work-container').append(this.text);

	if (window.innerHeight < 870){
		this.text.width(this.text.width() + 490 + 870 + (window.innerWidth * 0.4));
	}else{
		this.text.width(this.text.width() + 490 + window.innerHeight + (window.innerWidth * 0.4));
	}
	

	if (index%2){
		this.text.children('.project-metadata').css('right',(window.innerWidth * 0.10));
		this.text.children('.project-img').css('right',(window.innerWidth * 0.4 + 32));
	}

	this.text.attr( "data-" + heightSoFar, "transform: translate(0px, 0px)");
	if (index){
		this.text.attr( "data-" + (heightSoFar + window.innerHeight), "transform: translate(0px, -" + window.innerHeight + "px)");
		this.text.attr( "data-" + (heightSoFar + this.text.width() - window.innerWidth), "transform: translate(" + sign * (-1*(this.text.width() - window.innerWidth -  window.innerHeight)) + "px" + ", -" + window.innerHeight + "px)");
		if (!last){
			this.text.attr( "data-" + (heightSoFar + this.text.width() - window.innerWidth + window.innerHeight), "transform: translate(" + sign * (-1*(this.text.width() - window.innerWidth -  window.innerHeight)) + "px" + ", -" + window.innerHeight*2 + "px)");
		}
		heightSoFar += this.text.width() - window.innerWidth;
	}else{
		this.text.attr( "data-" + (heightSoFar + this.text.width() - window.innerWidth -  window.innerHeight), "transform: translate(" + (-1*(this.text.width() - window.innerWidth -  window.innerHeight)) + "px" + ", 0px)");
		this.text.attr( "data-" + (heightSoFar + this.text.width() - window.innerWidth), "transform: translate(" + (-1*(this.text.width() - window.innerWidth -  window.innerHeight)) + "px" + ", -" + window.innerHeight + "px)");
		heightSoFar += this.text.width() - window.innerWidth - window.innerHeight;
	}
}