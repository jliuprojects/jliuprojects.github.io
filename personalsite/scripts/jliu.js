var heightSoFar = 0;
function Set(index, imgs, title, description, last){
	var imgshtml = '';
	for (var i = 0; i < imgs.length; i++){
		imgshtml += "<img class='project-img' src=" + imgs[i] + ">";
	}

	this.text = $("<div class='project-container'>" + 
					"<div class='project-metadata'><div class='project-title'>" + 
					title + 
					"</div><div class='project-description'>" + 
					description + 
					"</div><div class='project-launch'>Launch Site</div></div>" +
					imgshtml + "</div>");
	this.num_imgs = imgs.length;
	$('#work-container').append(this.text);
	this.text.width(this.text.width() + 490 + window.innerHeight + (window.innerWidth * 0.4));



	this.text.attr( "data-" + heightSoFar, "transform: translate(0px, 0px)");
	if (index){
		this.text.attr( "data-" + (heightSoFar + window.innerHeight), "transform: translate(0px, -" + window.innerHeight + "px)");
		this.text.attr( "data-" + (heightSoFar + this.text.width() - window.innerWidth), "transform: translate(" + (-1*(this.text.width() - window.innerWidth -  window.innerHeight)) + "px" + ", -" + window.innerHeight + "px)");
		if (!last){
			this.text.attr( "data-" + (heightSoFar + this.text.width() - window.innerWidth + window.innerHeight), "transform: translate(" + (-1*(this.text.width() - window.innerWidth -  window.innerHeight)) + "px" + ", -" + window.innerHeight*2 + "px)");
		}
		heightSoFar += this.text.width() - window.innerWidth;
	}else{
		this.text.attr( "data-" + (heightSoFar + this.text.width() - window.innerWidth -  window.innerHeight), "transform: translate(" + (-1*(this.text.width() - window.innerWidth -  window.innerHeight)) + "px" + ", 0px)");
		this.text.attr( "data-" + (heightSoFar + this.text.width() - window.innerWidth), "transform: translate(" + (-1*(this.text.width() - window.innerWidth -  window.innerHeight)) + "px" + ", -" + window.innerHeight + "px)");
		heightSoFar += this.text.width() - window.innerWidth - window.innerHeight;
	}
}

var sets = [];
sets.push(new Set(sets.length, ["assets/kid.png","assets/kid.png","assets/kid.png"], "Kid Studio", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. "));
sets.push(new Set(sets.length,["assets/kid.png"], "Kid Studio", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. "));
sets.push(new Set(sets.length,["assets/kid.png","assets/kid.png","assets/kid.png"], "Kid Studio", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ", true));

sets[0].text.css({'top' : '0%'});

$('.containers').fadeOut(0);
$('body,html').css('overflow','hidden');

$('#work').click(function(){
	$('body,html').css('overflow','auto');
	$('.containers').fadeOut();
	$('#work-container').fadeIn();
	$('.bottom-nav-btn').css('border-bottom','solid 3px transparent');
	$('#work').css('border-bottom','solid 3px #cccccc');
});

$('#about').click(function(){
	$('body,html').css('overflow','hidden');
	$('.containers').fadeOut();
	$('#about-container').fadeIn();
	$('.bottom-nav-btn').css('border-bottom','solid 3px transparent');
	$('#about').css('border-bottom','solid 3px #cccccc');
});

$('#contact').click(function(){
	$('body,html').css('overflow','hidden');
	$('.containers').fadeOut();
	$('#contact-container').fadeIn();
	$('.bottom-nav-btn').css('border-bottom','solid 3px transparent');
	$('#contact').css('border-bottom','solid 3px #cccccc');
});

$('#about').click();