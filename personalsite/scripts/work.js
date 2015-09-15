var sets = [];

sets.push(new Set(sets.length,["assets/starz.png","assets/starz2.png","assets/starz3.png"], 
								(870+200)*3 + 200,
								"<div class='project-launch'>Launch In Appstore</div>",
								"STARZ Play <div class='date'>05.16 - 09.16</div>", 
								"<div class='tags'>Digiflare Inc.</div> <div class='tags'>AngularJS, Samsung Smart TV SDK, jQuery, HTML, CSS, SASS </div> A video streaming, multi-screen TV Everywhere application for American premium cable and satellite television network provider, Starz."));
sets.push(new Set(sets.length,["assets/zynga.png","assets/zynga2.png"], 
								(870+200)*2 + 200,
								"",
								"Universal Portal <div class='date'>08.16 - 12.16</div>", 
								"<i>Zynga Inc.</i><br><br> Assisted in the creation and frontend development of an internal MEAN.JS application to unite and centralize all internal services within the organization."));
sets.push(new Set(sets.length,["assets/elie.png","assets/elie2.png","assets/elie3.png","assets/elie4.png"], 
								(370+200)*4 + 200,
								"<div class='project-launch'>Launch Mobile Site</div>",
								"Visionelie", 
								"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. "));
sets.push(new Set(sets.length, ["assets/kid.png","assets/kid2.png","assets/kid3.png","assets/kid4.png","assets/kid5.png","assets/kid6.png"], 
								(870+200)*6 + 200,
								"<div class='project-launch'>Launch Site</div>",
								"Kid Studio", 
								"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. "));
sets.push(new Set(sets.length,["assets/fifty6.png","assets/fifty62.png","assets/fifty63.png","assets/fifty64.png"], 
								(870+200)*4 + 200,
								"<div class='project-launch'>Launch Site</div>",
								"Fifty6", 
								"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ", true));




sets[0].text.css({'top' : '0%'});
$('.containers').fadeOut(0);

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