function Set(project){
	this.html = []
	this.html["title"] = $("<div class='project-title'>" + project.title + "</div>");
	this.html["client"] = $("<div class='project-client'>" + project.client + "</div>");
	this.html["date"] = $("<div class='project-date'>" + project.date + "</div>");

	this.images = [];

	for (var i = 0; i < project.images.length; i++){
		this.images.push($("<img class='project-img' src=" + project.images[i].url + ">"));
	}
	
	this.attach = function (dom){
		for (var key in this.html) {
		 	dom.append(this.html[key]);
		}

		for (var i = 0; i < this.images.length; i++){
		 	dom.append(this.images[i]);
		}
	}

	this.prepend = function (dom){

		for (var i = this.images.length; i >= 0 ; i--){
		 	dom.prepend(this.images[i]);
		}

		var arr = [];
		  
		for (var key in this.html) {
			arr.push(key);
		 	dom.prepend(this.html[key]);
		}

		for (var i = arr.length-1; i >= 0; i--) {
		    dom.prepend(this.html[arr[i]]);
		}
	}
	this.remove = function (){
		for (var key in this.html) {
		 	this.html[key].remove();
		}

		for (var i = 0; i < this.images.length; i++){
		 	this.images[i].remove();
		}
	}
}