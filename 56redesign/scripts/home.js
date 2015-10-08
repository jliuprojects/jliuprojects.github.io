var index = 0;
var sets = [];
var scrollLock = 3;

var lockPoint = 0;
var notScrolled = 1;

var p1 = 0;
var p2 = 0;
var p3 = 0;

function incrIndex (){
	// for (var i = 0; i < n; i++){
		if (index < sets.length - 1){
			index++;
		}else{
			index = 0;
		}
	// }
}

function decrIndex (){
	// for (var i = 0; i < n; i++){
		if (index == 0){
			index = sets.length - 1;
		}else{
			index--;
		}
	// }
}

$( document ).ready(function() {
	$.getJSON("data/projects.json", function(json) {
	    for (var i = 0; i < json.projects.length; i++){
	    	sets.push(new Set(json.projects[i]));
	    }

	    sets[index].attach($(".content"));
	    lockPoint = $(".content").height(); //old
	    setTimeout(function(){

	    	p1 = $(".content").height(); 
	    	incrIndex();
	    	sets[index].attach($(".content"));
	    	setTimeout(function(){ 
	    		p2 = $(".content").height(); 
	    		incrIndex();
	    		sets[index].attach($(".content"));
	    		setTimeout(function(){ 
	    			p3 = $(".content").height(); 
	    		}, 0);
	    	}, 0);
	    }, 0);
	});
});
var lastScrollTop = 0;
$(window).scroll(function (event) {
	console.log(p1);
	    console.log(p2);
	    console.log(p3);
    var scroll = $(window).scrollTop();

    if (scroll > lastScrollTop){
    	// downscroll code

       	//add/remove project
	    if (scroll + $(window).height() >= p3){
	    	decrIndex();
	    	decrIndex();

	    	
	    	sets[index].remove();

	    	incrIndex();
	    	incrIndex();
	    	incrIndex();
	    	sets[index].attach($(".content"));
	    	
	    	$(window).scrollTop(scroll - p1);
	    	lastScrollTop = $(window).scrollTop();
	    	scroll = $(window).scrollTop();
	    	event.stopPropagation();

	    	var tempp1 = p1;
	    	p1 = p2 - p1;
	    	p2 = p3 - tempp1;
	    	setTimeout(function(){ 
	    		p3 = $(".content").height(); 
	    	}, 0); 
	    }
   } else if (scroll < lastScrollTop){
    	// upscroll code
    	console.log("UPSCROLL");
    	//add/remove project
	    if (scroll + $(window).height() <= p2){
	    	sets[index].remove();
	    	decrIndex();
	    	decrIndex();
	    	decrIndex();
	    	sets[index].prepend($(".content"));
	    	$(window).scrollTop($(".content").height() - $(window).height());
	    	lastScrollTop = scroll;
	    	incrIndex();
	    	incrIndex();
	    	setTimeout(function(){ 
	    		$(window).scrollTop($(".content").height() - $(window).height());
	    		lastScrollTop = $(window).scrollTop();
	    		scroll = $(window).scrollTop();
	    		event.stopPropagation();

		    	var tempp1 = p1;
		    	p1 = $(".content").height() - p2;
		    	p2 = p1 + tempp1;
	    		p3 = $(".content").height(); 
	    	}, 0); 
	    }

   }
   lastScrollTop = scroll;


    // console.log(scroll);
    // if (scroll > 300){
    // 	notScrolled = 0;
    // }
    
    
    // //remove project
    // if (scroll > lockPoint){

    // 	$(window).scrollTop(scroll - $(".content").height());
    // 	notScrolled = 1;

    // 	if (index == 0){
    // 		sets[sets.length - 1].remove();
    // 	}else{
    // 		sets[index - 1].remove();
    // 	}

    // 	lockPoint = $(".content").height();
    // }

    // if (scroll == 0 && lastScroll == 0){
    // 	if (index < sets.length - 1){
    // 		index++;
    // 	}else{
    // 		index = 0;
    // 	}

    // 	sets[index].prepend($(".content"));
    // }
    // console.log("scroll height:" + (scroll + $(window).height()));
    console.log("scroll:" + scroll);
    console.log("lock point:" + p3);

});