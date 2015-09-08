function Set(imgs, title, description){
	var imgshtml = '';
	for (var i = 0; i < imgs.length; i++){
		imgshtml += "<img class='project-img' src=" + imgs[i] + ">";
	}
	this.text = $("<div class='project-container'>" + imgshtml + "<div class='project-metadata'><div class='project-title'>" + title + "</div><div class='project-description'>" + description + "</div><div class='project-launch'>Launch Site</div></div></div>");
	// this.text.html("<img class='project-img' src=" + img + "><div class='project-title'>" + title + "</div><div class='project-description'>" + description + "</div><div class='project-launch'>Launch Site</div>");
	this.text.width(imgs.length*900 + 900);
	$('body').append(this.text);
}

var sets = [];
sets.push(new Set(["assets/kid.png","assets/kid.png"], "Kid Studio", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. "));
sets.push(new Set(["assets/kid.png"], "Kid Studio", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. "));
sets.push(new Set(["assets/kid.png"], "Kid Studio", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. "));

