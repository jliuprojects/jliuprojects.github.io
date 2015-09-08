function Set(imgs, title, description){
	var imgshtml = '';
	for (var i = 0; i < imgs.length; i++){
		imgshtml += "<img class='project-img' src=" + imgs[i] + ">";
	}

	if (imgs.length > 1){
		imgshtml += "<div class='spacingdiv'></div>";
	}
	this.text = $("<div class='project-container'>" + imgshtml + "<div class='project-metadata'><div class='project-title'>" + title + "</div><div class='project-description'>" + description + "</div><div class='project-launch'>Launch Site</div></div></div>");
	// this.text.html("<img class='project-img' src=" + img + "><div class='project-title'>" + title + "</div><div class='project-description'>" + description + "</div><div class='project-launch'>Launch Site</div>");
	// this.text.width(imgs.length*900 + 1500);
	this.num_imgs = imgs.length;
	this.scroll = 0;
	$('body').append(this.text);
}

var sets = [];
sets.push(new Set(["assets/kid.png","assets/kid.png"], "Kid Studio", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. "));
sets.push(new Set(["assets/kid.png"], "Kid Studio", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. "));
sets.push(new Set(["assets/kid.png"], "Kid Studio", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. "));

var currentFocusedSet = 0;

$('body').on({
    'mousewheel': function(e) {
        if (e.target.id == 'el') return;

        if (sets[currentFocusedSet].text.scrollLeft() >= sets[currentFocusedSet].text[0].scrollWidth - sets[currentFocusedSet].text[0].clientWidth && e.originalEvent.deltaY > 0){
			if (currentFocusedSet < sets.length){
				currentFocusedSet++;
			}
			return;
		}

		if (sets[currentFocusedSet].text.scrollLeft() == 0 && e.originalEvent.deltaY < 0){
			if (currentFocusedSet != 0){
				currentFocusedSet--;
			}
			return;
		}

    	if (sets[currentFocusedSet].num_imgs > 1){

    		if (e.originalEvent.deltaY > 0){
    			if (sets[currentFocusedSet].scroll <= sets[currentFocusedSet].text[0].scrollWidth - sets[currentFocusedSet].text[0].clientWidth){
    				sets[currentFocusedSet].scroll += 30;
    			}
    		}else{
    			if (sets[currentFocusedSet].scroll){
    				sets[currentFocusedSet].scroll -= 30;
    			}
    		}
			sets[currentFocusedSet].text.scrollLeft(sets[currentFocusedSet].scroll);

			e.preventDefault();
        	e.stopPropagation();
		}
    }
});

// var currentFocusedSet = 0;

// $(window).scroll(function(e){
// 	// if (sets[currentFocusedSet].num_imgs > 1){
// 	// 		$('html,body').css({'overflow' : 'hidden'});
// 	// 		sets[currentFocusedSet].text.scrollLeft(30);
// 	// 		console.log("asdf");
// 	// 		if (sets[currentFocusedSet].text.scrollLeft() > (sets[currentFocusedSet].num_imgs - 1) * 900 + 670){
// 	// 			$('html,body').css({'overflow' : 'scroll'});
// 	// 		}
// 	// }

// 	// if (prev_scroll > $(document).scrollTop()){
// 	// 	console.log("scroll up");
// 	// 	up_scroll = 1;
// 	// }else if (prev_scroll < $(document).scrollTop()){
// 	// 	console.log("scroll down");
// 	// 	down_scroll = 1;
// 	// }
// 	// var winHeight = window.

// 	// this.scrollLeft -= (delta * 30);
// 	// prev_scroll = $(document).scrollTop();

// 	// if (sets[currentFocusedSet].)
// 	e.preventDefault();
// 	e.stopPropagation();
// });