var sets = [];

sets.push(new Set(sets.length,["assets/starz.png","assets/starz2.png","assets/starz3.png"], 
								(800+200)*3 + 300,
								// "<div class='project-launch'>Launch In Appstore</div>",
								"",
								"STARZ Play", 
								"<div class='tags'>Digiflare Inc.<div class='date'>05.15 - 09.15</div></div> <div class='tags'>AngularJS, Samsung Smart TV SDK, jQuery, HTML, SASS </div> A video streaming, multi-screen TV Everywhere application for American premium cable and satellite television network provider, Starz."));
sets.push(new Set(sets.length,["assets/zynga.png","assets/zynga2.png"], 
								(780+200)*2 + 300,
								"",
								"Universal Portal", 
								"<div class='tags'>Zynga Inc. <div class='date'>08.14 - 12.14</div></div> <div class='tags'>AngularJS, NodeJS, ExpressJS, MongoDB, jQuery, Haml, SASS </div> An internal Zynga MEAN.JS portal to unite and centralize all internal services within the organization."));
sets.push(new Set(sets.length,["assets/elie.png","assets/elie2.png","assets/elie3.png","assets/elie4.png"], 
								(240+200)*4 + 300,
								"<div class='project-launch'><a href='http://visionelie.co/'>Launch Mobile Site</a></div>",
								"Visionelie", 
								"<div class='tags'>Fifty6<div class='date'>05.15 - Present</div></div> <div class='tags'>Javascript, Shopify, jQuery, HTML, CSS </div>Mobile website built for photographer Visionelie. Used accelerometer technology to create a spatially interactive landing page feature."));
sets.push(new Set(sets.length, ["assets/kid.png","assets/kid2.png","assets/kid3.png","assets/kid4.png","assets/kid5.png","assets/kid6.png"], 
								(710+200)*6 + 300,
								"<div class='project-launch'><a href='http://new.kidstudio.co/'>Launch Site</a></div>",
								"Kid Studio", 
								"<div class='tags'>Fifty6<div class='date'>05.15 - Present</div></div> <div class='tags'>ThreeJS, Javascript, KirbyCMS, PHP, jQuery, HTML, CSS </div>Responsive website made for film & design studio, Kid. Interactive 3D carousel feature with custom Kirby backend."));
sets.push(new Set(sets.length,["assets/fifty6.png","assets/fifty62.png","assets/fifty63.png","assets/fifty64.png"], 
								(710+200)*4 + 300,
								"<div class='project-launch'><a href='http://jliuprojects.github.io/fifty6/'>Launch Site</a></div>",
								"Portfolio Website", 
								"<div class='tags'>Fifty6<div class='date'>05.15 - Present</div></div> <div class='tags'>ThreeJS, Javascript, jQuery, HTML, CSS </div> Ineractive portfolio website made for creative design studio Fifty6."));
sets.push(new Set(sets.length,["assets/zyngasdk1.png","assets/zyngasdk2.png" ,"assets/zyngasdk3.png","assets/zyngasdk4.png","assets/zyngasdk5.png"], 
								(600+200)*5 + 300,
								"",
								"Mobile Economy SDK", 
								"<div class='tags'>Zynga Inc. <div class='date'>01.14 - 4.14</div></div><div class='tags'>Objective C, Java, Ruby, Ruby On Rails, Unity Engine</div> An internal Zynga Economy SDK used in all 'With Friends' games. SDK platforms include Android, iOS and Unity clients.", true));



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

// $('#contact').click(function(){
// 	$('body,html').css('overflow','hidden');
// 	$('.containers').fadeOut();
// 	$('#contact-container').fadeIn();
// 	$('.bottom-nav-btn').css('border-bottom','solid 3px transparent');
// 	$('#contact').css('border-bottom','solid 3px #cccccc');
// });

$('.project-launch').hover(function(){
	$('.project-launch').css('color', 'white');
	$('.project-launch a').css('color', 'white');
	$('.project-launch').css('background-color', 'black');
},function(){
	$('.project-launch').css('color', 'black');
	$('.project-launch a').css('color', 'black');
	$('.project-launch').css('background-color', 'white');
});

$('#about').click();