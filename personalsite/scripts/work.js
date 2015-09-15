var sets = [];

sets.push(new Set(sets.length,["assets/starz.png","assets/starz2.png","assets/starz3.png"], 
								(870+200)*3 + 200,
								"<div class='project-launch'>Launch In Appstore</div>",
								"STARZ Play", 
								"<div class='tags'>Digiflare Inc.<div class='date'>05.16 - 09.16</div></div> <div class='tags'>AngularJS, Samsung Smart TV SDK, jQuery, HTML, CSS, SASS </div> A video streaming, multi-screen TV Everywhere application for American premium cable and satellite television network provider, Starz."));
sets.push(new Set(sets.length,["assets/zynga.png","assets/zynga2.png"], 
								(870+200)*2 + 200,
								"",
								"Universal Portal", 
								"<div class='tags'>Zynga Inc. <div class='date'>08.16 - 12.16</div></div> <div class='tags'>AngularJS, NodeJS, ExpressJS, MongoDB, jQuery, HTML, CSS, SASS </div> An internal Zynga MEAN.JS portal to unite and centralize all internal services within the organization."));
sets.push(new Set(sets.length,["assets/elie.png","assets/elie2.png","assets/elie3.png","assets/elie4.png"], 
								(370+200)*4 + 200,
								"<div class='project-launch'>Launch Mobile Site</div>",
								"Visionelie", 
								"<div class='tags'>Fifty6<div class='date'>05.16 - Present</div></div> <div class='tags'>Javascript, jQuery, HTML, CSS </div>Mobile website built for photographer Visionelie. Used accelerometer technology to create a spatially interactive landing page feature."));
sets.push(new Set(sets.length, ["assets/kid.png","assets/kid2.png","assets/kid3.png","assets/kid4.png","assets/kid5.png","assets/kid6.png"], 
								(870+200)*6 + 200,
								"<div class='project-launch'>Launch Site</div>",
								"Kid Studio", 
								"<div class='tags'>Fifty6<div class='date'>05.16 - Present</div></div> <div class='tags'>ThreeJS, Javascript, KirbyCMS, jQuery, HTML, CSS </div>Responsive website made for film & design studio, Kid. Interactive 3D carousel feature with custom Kirby backend."));
sets.push(new Set(sets.length,["assets/fifty6.png","assets/fifty62.png","assets/fifty63.png","assets/fifty64.png"], 
								(870+200)*4 + 200,
								"<div class='project-launch'>Launch Site</div>",
								"Portfolio Website", 
								"<div class='tags'>Fifty6<div class='date'>05.16 - Present</div></div> <div class='tags'>ThreeJS, Javascript, jQuery, HTML, CSS </div> Ineractive portfolio website made for creative design studio Fifty6."));
sets.push(new Set(sets.length,["assets/zynga.png","assets/zynga2.png"], 
								(870+200)*2 + 200,
								"",
								"Mobile Economy SDK", 
								"<div class='tags'>Zynga Inc. <div class='date'>08.16 - 12.16</div></div><div class='tags'>AngularJS, NodeJS, ExpressJS, MongoDB, jQuery, HTML, CSS, SASS </div> An internal Zynga MEAN.JS portal to unite and centralize all internal services within the organization.", true));



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