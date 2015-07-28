placeNotes();
var NUM_STICKIES = 3;
var filter1Open = 0;
var filter2Open = 0;
var filter3Open = 0;
var filter4Open = 0;

function counterSubOne (id){
	if (id == "filter1"){
		filter1Open--;
		if (filter1Open == 0){
			$('#filter1').css({'text-decoration': 'none'});
		}
	}else if (id == "filter2"){
		filter2Open--;
		if (filter2Open == 0){
			$('#filter2').css({'text-decoration': 'none'});
		}
	}else if (id == "filter3"){
		filter3Open--;
		if (filter3Open == 0){
			$('#filter3').css({'text-decoration': 'none'});
		}
	}else if (id == "filter4"){
		filter4Open--;
		if (filter4Open == 0){
			$('#filter4').css({'text-decoration': 'none'});
		}
	}
}

function counterOpenAll (id){
	if (id == "filter1"){
		filter1Open = NUM_STICKIES;
	}else if (id == "filter2"){
		filter2Open = NUM_STICKIES;
	}else if (id == "filter3"){
		filter3Open = NUM_STICKIES;
	}else if (id == "filter4"){
		filter4Open = NUM_STICKIES;
	}
}

$('.filters').click(function() {
  $('.' + $(this).attr('id')).show();
  $(this).css({'text-decoration': 'underline'});
  counterOpenAll($(this).attr('id'));
});

$('.close').click(function(){
	$(this).parent().hide();
	counterSubOne($(this).parent().attr('class').split(' ')[0]);
});