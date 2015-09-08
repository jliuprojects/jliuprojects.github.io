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
	$('body').append(this.text);
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
sets.push(new Set(sets.length,["assets/kid.png","assets/kid.png"], "Kid Studio", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. "));
sets.push(new Set(sets.length,["assets/kid.png","assets/kid.png","assets/kid.png"], "Kid Studio", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ", true));

sets[0].text.css({'top' : '0%'});

// var currentFocusedSet = 0;

// $('body').on({
//     'mousewheel': function(e) {
//         if (e.target.id == 'el') return;

//         if (sets[currentFocusedSet].text.scrollLeft() >= sets[currentFocusedSet].text[0].scrollWidth - sets[currentFocusedSet].text[0].clientWidth && e.originalEvent.deltaY > 0){
// 			if (currentFocusedSet < sets.length){
// 				currentFocusedSet++;
// 			}
// 			return;
// 		}

// 		if (sets[currentFocusedSet].text.scrollLeft() == 0 && e.originalEvent.deltaY < 0){
// 			if (currentFocusedSet != 0){
// 				currentFocusedSet--;
// 			}
// 			return;
// 		}

//     	if (sets[currentFocusedSet].num_imgs > 1){

//     		if (e.originalEvent.deltaY > 0){
//     			if (sets[currentFocusedSet].scroll <= sets[currentFocusedSet].text[0].scrollWidth - sets[currentFocusedSet].text[0].clientWidth){
//     				sets[currentFocusedSet].scroll += 30;
//     			}
//     		}else{
//     			if (sets[currentFocusedSet].scroll){
//     				sets[currentFocusedSet].scroll -= 30;
//     			}
//     		}
// 			sets[currentFocusedSet].text.scrollLeft(sets[currentFocusedSet].scroll);

// 			e.preventDefault();
//         	e.stopPropagation();
// 		}
//     }
// });
