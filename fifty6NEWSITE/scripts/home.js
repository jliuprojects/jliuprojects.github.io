var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 1000);
var mouse_pixels = {x:0,y:0};
var renderer = new THREE.WebGLRenderer({alpha:true});
renderer.setSize(window.innerWidth - 1, window.innerHeight - 1);
renderer.setClearColor( 0x000000, 0 );	
camera.position.z = 10;

window.addEventListener( 'mousemove', onMouseMove, false );

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

function onMouseMove( event ) {
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
	mouse_pixels.x = event.clientX;
	mouse_pixels.y = event.clientY;
}

var infoOpen = false;
var workOpen = false;
function changeTheme(theme){
	$('html body').css({'background-color': theme.bg_colour});
	$('p, title').css({'color' : theme.text_colour});
	$('#svglogo')[0].style.fill = theme.logo_colour;
	$('.btn').css({'background-color': theme.bg_colour});
	$('.btn').css({'color': theme.text_colour});
	$('.right-nav, .left-nav').css({'background-color': theme.text_colour});
	$('.info-text, .work-text').css({'color': theme.bg_colour});
	$('.btn').css({'border': 'solid ' + theme.text_colour + ' 2px'});
	if (infoOpen){
		$('.info').css("border-bottom", "solid 2px " + theme.text_colour);
	}
	$('.info').hover(
		function (){
			$(this).css("border-bottom", "solid 2px " + theme.text_colour);
		}, function() {
			$(this).css("border-bottom", "solid 2px transparent");
	});
	if (workOpen){
		$('.work').css("border-bottom", "solid 2px " + theme.text_colour);
	}
	$('.work').hover(
		function (){
			$(this).css("border-bottom", "solid 2px " + theme.text_colour);
		}, function() {
			$(this).css("border-bottom", "solid 2px transparent");
	});
	$('.btn').hover(
		function (){
			$(this).css("background-color", theme.text_colour);
			$('.btn').css({'color': theme.bg_colour});
		}, function() {
			$(this).css("background-color", theme.bg_colour);
			$('.btn').css({'color': theme.text_colour});
	});
}

$(document).ready(function(){
	document.getElementById('featured').appendChild(renderer.domElement);
	document.body.scrollTop = document.documentElement.scrollTop = 0;
});

/*	dimensions is an {width:##, height:##} array with length = length of size
	positions is an {x:##, y:## , y:##} array with length = length of size	
*/
function Set(scene, size, dimensions, positions, urls, rotations, info, theme, extras){
	this.features = [];
	this.size = size;
	this.rotations = rotations;
	this.text = $('<div class="project-info"></div>');
	this.text.html('<p class="project-title">' + info.title + '</p>' + '<p class="project-description">' + info.description + '</p>' + '<p class="project-tags">' + info.tags + '</p>' + '<div class="btn">Launch Site</div>');
	$('body').append(this.text);
	this.text.fadeOut(0);
	this.transitioningfwd = []; // counter for frames for transitioning positive x
	this.transitioningbk = []; // counter for frames for transitioning negative x
	this.accl = []; // accleration of x transitions
	this.frames = []; // number of frames
	this.theme = theme;
	this.extras = extras || [];
	this.extras.push(urls[1]);

	this.rotYBeforeAnimate = 0;

	for (var i = 0; i < size; i++){
		this.frames[i] = 250;
		this.transitioningfwd[i] = this.frames[i];
		this.transitioningbk[i] = 0;
		this.accl[i] = this.rotations[i].x / (this.frames[i]/2);

		this.features[i] = new THREE.Mesh(new THREE.BoxGeometry(dimensions[i].width, dimensions[i].height, 0), 
																new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture(urls[i]), 
																	transparent: true, 
																	opacity: 1, 
																	color: 0xffffff}));
		this.features[i].material.needsUpdate = true;
		this.features[i].userData.mouseover = false;
		this.features[i].userData.mouseoverVector = {x:0,y:0};
		this.features[i].userData.mouseoverEnterPos = {x:0,y:0};
		this.features[i].userData.index = i;

		this.features[i].material.needsUpdate = true;

		this.features[i].position.x = positions[i].x;
		this.features[i].position.y = positions[i].y;
		this.features[i].position.z = positions[i].z;
	}
}

/*
	rotations is {x:##, y:## , y:##} list where each property is the increase in rotation in that axis
*/
Set.prototype.animate = function (){

	this.rotYBeforeAnimate = this.features[1].rotation.y;

	for (var i = 0; i < this.size; i++){

		if (this.transitioningfwd[i]){
			this.features[i].rotation.x += this.accl[i] * (this.transitioningfwd[i] - this.frames[i]/2);
			this.transitioningfwd[i]--;
			if (this.transitioningfwd[i] == 0){
				this.transitioningbk[i] = this.frames[i];
			}
		}else if (this.transitioningbk[i]){
			this.features[i].rotation.x -= this.accl[i] * (this.transitioningbk[i] - this.frames[i]/2);
			this.transitioningbk[i]--;
			if (this.transitioningbk[i] == 0){
				this.transitioningfwd[i] = this.frames[i];
			}
		}

		if (this.features[i].userData.mouseover){
			if (this.features[i].userData.mouseoverVector.x > 0){
				this.features[i].rotation.y += Math.abs(this.rotations[i].y * this.features[i].userData.mouseoverVector.x/window.innerWidth*this.features[i].userData.mouseover);
			}else if (this.features[i].userData.mouseoverVector.x <= 0){
				this.features[i].rotation.y += -Math.abs(this.rotations[i].y * this.features[i].userData.mouseoverVector.x/window.innerWidth*this.features[i].userData.mouseover);
			}

			// if (this.features[i].userData.mouseoverVector.y > 0){
			// 	this.features[i].rotation.x += Math.abs(this.rotations[i].x * this.features[i].userData.mouseoverVector.y/window.innerHeight*this.features[i].userData.mouseover);
			// }else if (this.features[i].userData.mouseoverVector.y <= 0){
			// 	this.features[i].rotation.x += -Math.abs(this.rotations[i].x * this.features[i].userData.mouseoverVector.y/window.innerHeight*this.features[i].userData.mouseover);
			// }

			this.features[i].userData.mouseover--;
			if (this.rotYBeforeAnimate < 0 && this.features[1].rotation.y > 0){
				return;
			}

			if (this.rotYBeforeAnimate > 0 && this.features[1].rotation.y < 0){
				return;
			}

			if (this.rotYBeforeAnimate < (Math.PI/2 - Math.PI/12) && this.features[1].rotation.y > (Math.PI/2 - Math.PI/12)){
				this.changeDesktopImg();
			}else if (this.rotYBeforeAnimate < (Math.PI*3/2 - Math.PI/12) && this.features[1].rotation.y > (Math.PI*3/2 - Math.PI/12)){
				this.changeDesktopImg();
			}else if (this.rotYBeforeAnimate > (Math.PI*3/2 - Math.PI/12) && this.features[1].rotation.y < (Math.PI*3/2 - Math.PI/12)){
				this.changeDesktopImg();
			}else if (this.rotYBeforeAnimate > (Math.PI/2 - Math.PI/12) && this.features[1].rotation.y < (Math.PI/2 - Math.PI/12)){
				this.changeDesktopImg();


			} else if (this.rotYBeforeAnimate < -(Math.PI/2 - Math.PI/12) && this.features[1].rotation.y > -(Math.PI/2 - Math.PI/12)){
				this.changeDesktopImg();
			}else if (this.rotYBeforeAnimate < -(Math.PI*3/2 - Math.PI/12) && this.features[1].rotation.y > -(Math.PI*3/2 - Math.PI/12)){
				this.changeDesktopImg();
			}else if (this.rotYBeforeAnimate > -(Math.PI*3/2 - Math.PI/12) && this.features[1].rotation.y < -(Math.PI*3/2 - Math.PI/12)){
				this.changeDesktopImg();
			}else if (this.rotYBeforeAnimate > -(Math.PI/2 - Math.PI/12) && this.features[1].rotation.y < -(Math.PI/2 - Math.PI/12)){
				this.changeDesktopImg();
			}
		}

		this.features[i].rotation.y += this.rotations[i].y;
		if (Math.abs(this.features[i].rotation.y) > 2*Math.PI){
			this.features[i].rotation.y = this.features[i].rotation.y % (2*Math.PI);
			return;
		}
	}
}

Set.prototype.changeDesktopImg = function () {
	var textureLoader = new THREE.TextureLoader();
	var next_extra = this.extras.shift();
	this.extras.push(next_extra);
	var self = this;
	textureLoader.load(next_extra, function (t){
		self.features[1].material.map = t;
	});
};

var sets = [];
									//phone							site							logo
sets[0] = new Set(scene, 3, [		{width:4,height:8},				{width:9,height:6},				{width:3,height:3}],
								   [{x:5,y:0,z:0},					{x:-3,y:2.5,z:0},				{x:-3,y:-3,z:0}], 
								   ['assets/carousels/elie.png',	'assets/carousels/elie2.png',	'assets/carousels/elie3.png'],
								   [{x:0.005,y:0.005,z:0},			{x:-0.005,y:-0.005,z:0},		{x:0.005,y:0.005,z:0}],
								   {title:'Visionelie', tags:'Web Development, Interactive Design, Responsive Design, Creative Direction', description:'Mobile website built for photographer Visionelie. Used accelerometer technology to create a spatially interactive landing page feature.'},
								   {text_colour: '#000000', bg_colour: '#ffffff', logo_colour: '#000000'},
								   ['assets/carousels/kid.png',	'assets/carousels/knp.png',	'assets/carousels/mr.png']);

sets[1] = new Set(scene, 3, [		{width:5,height:4},				{width:9,height:6},				{width:4,height:2}],
								   [{x:5,y:0,z:0},					{x:-3,y:2.5,z:0},				{x:-3,y:-3,z:0}], 
								   ['assets/carousels/drew2.png',	'assets/carousels/drew.png',	'assets/carousels/drew3.png'],
								   [{x:0.005,y:0.005,z:0},			{x:-0.005,y:-0.005,z:0},		{x:0.005,y:0.005,z:0}],
								   {title:'Drew Howard', tags:'Web Development, Interactive Design, Creative Direction, Content Creation, Branding & Identity', description:'Interactive responsive website made for rapper Drew Howard featuring pseudo-3D influenced gameplay. Produced through the assistance of MuchFact'},
								   {text_colour: '#fc457a', bg_colour: '#122f6a', logo_colour: '#fc457a'},
								   ['assets/carousels/kid.png',	'assets/carousels/knp.png',	'assets/carousels/mr.png']);

sets[2] = new Set(scene, 3, [		{width:5,height:5},				{width:9,height:6},				{width:4,height:2}],
								   [{x:5,y:0,z:0},					{x:-3,y:2.5,z:0},				{x:-3,y:-3,z:0}], 
								   ['assets/carousels/kid2.png',	'assets/carousels/kid.png',	'assets/carousels/kid3.png'],
								   [{x:0.005,y:0.005,z:0},			{x:-0.005,y:-0.005,z:0},		{x:0.005,y:0.005,z:0}],
								   {title:'Kid. Studio', tags:'Web Development, Interactive Design, Creative Direction, Content Creation', description:'Responsive website made for film & design studio, Kid. Interactive 3D carousel feature with custom Kirby backend.'},
								   {text_colour: '#656565', bg_colour: '#dddddd', logo_colour: '#656565'},
								   ['assets/carousels/kid.png',	'assets/carousels/knp.png',	'assets/carousels/mr.png']);

sets[3] = new Set(scene, 3, [		{width:5,height:5},				{width:9,height:6},				{width:4,height:2}],
								   [{x:5,y:0,z:0},					{x:-3,y:2.5,z:0},				{x:-3,y:-3,z:0}], 
								   ['assets/carousels/knp2.png',	'assets/carousels/knp.png',	'assets/carousels/knp3.png'],
								   [{x:0.005,y:0.005,z:0},			{x:-0.005,y:-0.005,z:0},		{x:0.005,y:0.005,z:0}],
								   {title:'Kastor & Pollux', tags:'Web Development, Interactive Design, Creative Direction', description:'Responsive interactive wordpress theme built for full-service creative collective Kastor & Pollux.'},
								   {text_colour: '#0f99e9', bg_colour: '#ebd413', logo_colour: '#0f99e9'},
								   ['assets/carousels/kid.png',	'assets/carousels/knp.png',	'assets/carousels/mr.png']);	

sets[4] = new Set(scene, 3, [		{width:5,height:4},				{width:9,height:6},				{width:4,height:4}],
								   [{x:5,y:0,z:0},					{x:-3,y:2.5,z:0},				{x:-3,y:-3,z:0}], 
								   ['assets/carousels/mr2.png',	'assets/carousels/mr.png',	'assets/carousels/mr3.png'],
								   [{x:0.005,y:0.005,z:0},			{x:-0.005,y:-0.005,z:0},		{x:0.005,y:0.005,z:0}],
								   {title:'Maison Raksha', tags:'Web Development, Interactive Design, Creative Direction, Ecommerce', description:'Interactive website made for goldsmith & jeweller Maison Raksha. Featuring an interactive gallery and custom stripe payment system.'},
								   {text_colour: '#ff4d49', bg_colour: '#000000', logo_colour: '#ff4d49'},
								   ['assets/carousels/kid.png',	'assets/carousels/knp.png',	'assets/carousels/mr.png']);	

shuffle(sets);
sets[0].text.fadeIn(0);
changeTheme(sets[0].theme);
for (var i = 0; i < sets[0].features.length; i++){
	scene.add(sets[0].features[i]);
}

var currentFocusedSet = 0;
var initBuffer = 30;
var change_set = 0;
var prev_scroll = 0;
var up_scroll, down_scroll = 0;



function openInfo(){
	$('.logo').animate({'left':'25%'},'slow');

	$('#featured').animate({'left':'10%'},'slow');
	$('.work').animate({'right':'5%'},'slow');
	$('.info').animate({'left':'25%'},'slow');
	$('.project-info').animate({'left':'20%'},'slow');
	$('.left-nav').animate({'left':'0%'},'slow');

    $('.description1').animate({'right':'15%'},'slow');
	$('.description2').animate({'right':'5%'},'slow');

	$('.info').css("border-bottom", "solid 2px " + sets[currentFocusedSet].theme.text_colour);
	$('.info').hover(
	function (){
			$('.info').css("border-bottom", "solid 2px " + sets[currentFocusedSet].theme.text_colour);
		}, function() {
			$('.info').css("border-bottom", "solid 2px " + sets[currentFocusedSet].theme.text_colour);
	});
}

function closeInfo(){
	$('.logo').animate({'left':'8%'},'slow');

	$('#featured').animate({'left':'0%'},'slow');
	$('.work').animate({'right':'10%'},'slow');
	$('.info').animate({'left':'10%'},'slow');
	$('.project-info').animate({'left':'0%'},'slow');
	$('.left-nav').animate({'left':'-20%'},'slow');
    $('.description1').animate({'right':'25%'},'slow');
	$('.description2').animate({'right':'10%'},'slow');

	$('.info').css("border-bottom", "solid 2px transparent");
	$('.info').hover(
	function (){
			$('.info').css("border-bottom", "solid 2px " + sets[currentFocusedSet].theme.text_colour);
		}, function() {
			$('.info').css("border-bottom", "solid 2px transparent");
	});
}

function openWork (){
	$('.logo').animate({'left':'5%'},'slow');

	$('#featured').animate({'left':'-10%'},'slow');
	$('.work').animate({'right':'25%'},'slow');
	$('.info').animate({'left':'5%'},'slow');
	$('.project-info').animate({'left':'-20%'},'slow');
	$('.right-nav').animate({'right':'0%'},'slow');
    $('.description1').animate({'right':'40%'},'slow');
	$('.description2').animate({'right':'25%'},'slow');

	$('.work').css("border-bottom", "solid 2px " + sets[currentFocusedSet].theme.text_colour);
	$('.work').hover(
	function (){
			$('.work').css("border-bottom", "solid 2px " + sets[currentFocusedSet].theme.text_colour);
		}, function() {
			$('.work').css("border-bottom", "solid 2px " + sets[currentFocusedSet].theme.text_colour);
	});
}

function closeWork(){
	$('.logo').animate({'left':'8%'},'slow');

	$('#featured').animate({'left':'0%'},'slow');
	$('.work').animate({'right':'10%'},'slow');
	$('.info').animate({'left':'10%'},'slow');
	$('.project-info').animate({'left':'0%'},'slow');
	$('.right-nav').animate({'right':'-20%'},'slow');
    $('.description1').animate({'right':'25%'},'slow');
	$('.description2').animate({'right':'10%'},'slow');

	$('.work').css("border-bottom", "solid 2px transparent");
	$('.work').hover(
	function (){
			$('.work').css("border-bottom", "solid 2px " + sets[currentFocusedSet].theme.text_colour);
		}, function() {
			$('.work').css("border-bottom", "solid 2px transparent");
	});
}

$('.info').click(function(){
	console.log('infoclick');
	if (!infoOpen){
		if (workOpen){
			closeWork();
			workOpen = false;
			setTimeout(function(){openInfo(); }, 1000);
		}else{
			openInfo();
		}
		infoOpen = true;
	}else {
		closeInfo();
		infoOpen = false;
	}
	event.stopPropagation();
});

$('.work').click(function(){
	console.log('workclick');
	if (!workOpen){
		if (infoOpen){
			closeInfo();
			infoOpen = false;
			setTimeout(function(){openWork(); }, 1000);
		}else{
			openWork();
		}
		workOpen = true;
	}else {
		closeWork();
		workOpen = false;
	}
	event.stopPropagation();
	// $('.right-nav').animate({'right':'0%'},'slow');
});

$('body').click(function(){
	change_set = 120;
});

$('.work-text-container').click(function(){
	var index = 0;
	for (var i = 0; i < sets.length; i++){
		if (sets[i].text.children('.project-title').text() == $(this).children('h1').text()){
			index = i;
			break;
		}
	}

	var distance = 0;
	for (var i = currentFocusedSet; i < sets.length; i++){
		if (i == index){
			break;
		}else{
			distance++;
		}
		if (i == sets.legnth - 1){
			i = -1;
		}
	}

	for (var i = 0; i < distance; i++){
		setTimeout(function(){ change_set=120; }, 2000*i);
	}
	event.stopPropagation();
});

$('.right-nav, .left-nav').click(function(){
	event.stopPropagation();
});

$(window).scroll(function(){
	if (prev_scroll > $(document).scrollTop()){
		console.log("scroll up");
		up_scroll = 1;
	}else if (prev_scroll < $(document).scrollTop()){
		console.log("scroll down");
		down_scroll = 1;
	}
	if ($(window).height() - $(document).scrollTop() - window.innerHeight < 50){
		document.body.scrollTop = document.documentElement.scrollTop = 60;
	}else if ($(document).scrollTop() <= 50){
		document.body.scrollTop = document.documentElement.scrollTop = $(window).height();
	}

	prev_scroll = $(document).scrollTop();
});

var rate = 0.2;
// var opacityRate = 0.0167;
function changeSet(){
	if (change_set == 120){
		sets[currentFocusedSet].text.fadeOut(500);
		opacityRate = 0.0167;
	}

	for(var i = 0; i < sets[currentFocusedSet].features.length; i++){
		sets[currentFocusedSet].features[i].position.z += rate;
		// sets[currentFocusedSet].features[i].material.opacity -= opacityRate;
	}
	if (change_set == 60){
		// opacityRate = -opacityRate;
		for(var i = 0; i < sets[currentFocusedSet].features.length; i++){
			scene.remove(sets[currentFocusedSet].features[i]);
		}

		if (currentFocusedSet == sets.length - 1){
			currentFocusedSet = 0;
		}else{
			currentFocusedSet++;
		}

		sets[currentFocusedSet].text.fadeIn(1000);
		changeTheme(sets[currentFocusedSet].theme);
		for(var i = 0; i < sets[currentFocusedSet].features.length; i++){
			scene.add(sets[currentFocusedSet].features[i]);
			sets[currentFocusedSet].features[i].position.z = -12;
			// sets[currentFocusedSet].features[i].material.opacity = 0;
		}
	}
	
	change_set--;
}

// var main_focus_delay_up = 50;
// var main_focus_delay_down = 50;

function upScroll(){
	// if (sets[currentFocusedSet].features[0].position.z == 0){
	// 	if(main_focus_delay_up){
	// 		main_focus_delay_up--;
	// 		sets[currentFocusedSet].animate();
	// 		return;
	// 	}else{
	// 		main_focus_delay_up = 50;
	// 	}
	// }
	for(var i = 0; i < sets[currentFocusedSet].features.length; i++){
		sets[currentFocusedSet].features[i].position.z -= 0.5;
		// if (sets[currentFocusedSet].features[i].position.z < 0){
		// 	sets[currentFocusedSet].features[i].material.opacity -= 0.083;
		// }else {
		// 	sets[currentFocusedSet].features[i].material.opacity += 0.083;
		// }

		if (sets[currentFocusedSet].features[i].position.z <= -12){
			sets[currentFocusedSet].text.fadeOut(0);
			for(var i = 0; i < sets[currentFocusedSet].features.length; i++){
				scene.remove(sets[currentFocusedSet].features[i]);
			}

			if (currentFocusedSet == 0){
				currentFocusedSet = sets.length - 1;
			}else{
				currentFocusedSet--;
			}

			sets[currentFocusedSet].text.fadeIn(1000);
			changeTheme(sets[currentFocusedSet].theme);
			for(var i = 0; i < sets[currentFocusedSet].features.length; i++){
				scene.add(sets[currentFocusedSet].features[i]);
				sets[currentFocusedSet].features[i].position.z = 12;
				// sets[currentFocusedSet].features[i].material.opacity = 0;
			}
		}
	}

	up_scroll--;
}

function downScroll(){
	// if (sets[currentFocusedSet].features[0].position.z == 0){
	// 	if(main_focus_delay_down){
	// 		main_focus_delay_down--;
	// 		sets[currentFocusedSet].animate();
	// 		return;
	// 	}else{
	// 		main_focus_delay_down = 50;
	// 	}
	// }
	for(var i = 0; i < sets[currentFocusedSet].features.length; i++){
		sets[currentFocusedSet].features[i].position.z += 1;
		// if (sets[currentFocusedSet].features[i].position.z > 0){
		// 	sets[currentFocusedSet].features[i].material.opacity -= 0.04167;
		// }else {
		// 	sets[currentFocusedSet].features[i].material.opacity += 0.04167;
		// }

		if (sets[currentFocusedSet].features[i].position.z >= 12){
			sets[currentFocusedSet].text.fadeOut(0);
			for(var i = 0; i < sets[currentFocusedSet].features.length; i++){
				scene.remove(sets[currentFocusedSet].features[i]);
			}

			if (currentFocusedSet == sets.length - 1){
				currentFocusedSet = 0;
			}else{
				currentFocusedSet++;
			}

			sets[currentFocusedSet].text.fadeIn(1000);
			changeTheme(sets[currentFocusedSet].theme);
			for(var i = 0; i < sets[currentFocusedSet].features.length; i++){
				scene.add(sets[currentFocusedSet].features[i]);
				sets[currentFocusedSet].features[i].position.z = -12;
				// sets[currentFocusedSet].features[i].material.opacity = 0;
			}
		}
	}
	down_scroll--;
}

function render() {
	requestAnimationFrame(render);

	// update the picking ray with the camera and mouse position	
	raycaster.setFromCamera( mouse, camera );	

	// calculate objects intersecting the picking ray
	var intersects = raycaster.intersectObjects( scene.children );
	if (!initBuffer){
		for ( var i = 0; i < intersects.length; i++ ) {
			intersects[i].object.userData.mouseoverEnterPos.x = mouse_pixels.x;
			intersects[i].object.userData.mouseoverEnterPos.y = mouse_pixels.y; 
			setTimeout(function(){ 
				for ( var i = 0; i < intersects.length; i++ ) {
					intersects[i].object.userData.mouseoverVector.x = mouse_pixels.x - intersects[i].object.userData.mouseoverEnterPos.x;
					intersects[i].object.userData.mouseoverVector.y = mouse_pixels.y - intersects[i].object.userData.mouseoverEnterPos.y;
					intersects[i].object.userData.mouseover = 60;
				}
			}, 100);
		}
	}else{
		initBuffer--;
	}

	if (change_set){
		changeSet();
	}else if (up_scroll){
		upScroll();
	}else if (down_scroll){
		downScroll();
	}else{
		sets[currentFocusedSet].animate();
	}

	console.log(sets[currentFocusedSet].features[1].rotation.y);
	renderer.render(scene, camera);
};
render();