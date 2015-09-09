var sets = [];
sets.push(new Set(sets.length, ["assets/kid.png","assets/kid.png","assets/kid.png"], "Kid Studio", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. "));
sets.push(new Set(sets.length,["assets/kid.png"], "Kid Studio", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. "));
sets.push(new Set(sets.length,["assets/kid.png","assets/kid.png","assets/kid.png"], "Kid Studio", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. "));
sets.push(new Set(sets.length,["assets/kid.png","assets/kid.png"], "Kid Studio", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ", true));

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

$('.project-launch').hover(function(){
	$('.project-launch').css('color', 'white');
	$('.project-launch').css('background-color', 'black');
},function(){
	$('.project-launch').css('color', 'black');
	$('.project-launch').css('background-color', 'white');
});

$('#about').click();