var projects = [];
var focusedProject = 0;
var focusedTitleFixed = false;
var direction = "prev";
var bgColour = null;
var textColour = null;
var numProjects = 0;
var numProjectsLoaded = 0;

function init () {
	$("#black_line").css({"width" : window.innerWidth - $("#logo").width() - 20 - $("#header_text").width() - window.innerWidth*0.05 - 60});
    $.getJSON("assets/projects.json", function(json) {
	    numProjects = json.projects.length;
	    for (var i = 0; i < json.projects.length; i++){
	    	json.projects[i].cb = loadedCb;
    		projects.push(new StyledProjectSet(json.projects[i]));
    	}
	});

	initThree();
}

function loadedCb() {
	numProjectsLoaded++;
	var perc = Math.round(numProjectsLoaded/numProjects*100) + "%";

	$("#loading_screen_text").html("LOADING(" + perc + ")");

	if (numProjectsLoaded == numProjects) {
		console.log("all projects loaded");
		window.scrollTo(0, 0);
		$("#loading_screen").remove();
		$(".project_title_container").css({"opacity" : 1});
		if (mobilecheck()){
			runMobile();
		} else {
			run();
		}
	}
}

function run() {
	for (var i = 0; i < projects.length; i++){
		projects[i].setPositions();
	}
	animateAbout();
	render();
}

function runMobile() {
	for (var i = 0; i < projects.length; i++){
		projects[i].setPositionsMobile();
	}
	animateAbout();
	render();
}

function render() {
	if (!mobilecheck()) {
		animateTitles();
		picturesFadeUp();
		animateInfo();
	}
	animateBackgrounds();
	lockBlackBar();
	renderThree();
	window.requestAnimationFrame(render);
}

function lockBlackBar() {
	// debugger;
	var scroll = window.pageYOffset;
	var bottomOfBar = window.innerHeight - window.innerHeight*0.15;

	if (mobilecheck()) {
		var dist = 58;
	} else {
		var dist = 37;
	}
	if (scroll + dist > bottomOfBar) {
		var fixAt = -(window.innerHeight - dist);
		$("#black_line").css({"position" : "fixed", "top" : fixAt + "px"});
	} else {
		$("#black_line").css({"position" : "relative", "top" : "auto"});
	}
}

function animateAbout() {
	var oldTop = $("#header_text").css("top");
	$("#header_text").css({"top" : "-=100px"});
	$("#header_text").animate({opacity : 1, top : oldTop}, 700);

	oldTop = $("#logo").css("top");
	$("#logo").css({"top" : "-=100px"});
	$("#logo").animate({opacity : 1, top : oldTop}, 700, function() {
		// window.setTimeout(function (){
		$("#main_title").css({"top" : "10%"});
		$("#main_title").animate({opacity : 1, top : 0}, 700);
		// }, 200);
		window.setTimeout(function (){
			// oldTop = $("#services")[0].style.top;
			$("#services").css({"top" : "65%"});
			$("#services").animate({opacity : 1, top : "55%"}, 700);
		}, 200);
		window.setTimeout(function (){
			// oldTop = $("#clients")[0].style.top;
			$("#clients").css({"top" : "65%"});
			$("#clients").animate({opacity : 1, top : "55%"}, 700);
		}, 400);
		window.setTimeout(function (){
			// oldTop = $("#contact")[0].style.top;
			$("#contact").css({"top" : "80%"});
			$("#contact").animate({opacity : 1, top : "70%"}, 700);
		}, 600);
		window.setTimeout(function (){
			oldTop = $("#black_line").css("bottom");
			$("#black_line").css({"bottom" : "-=100px"});
			$("#black_line").animate({opacity : 1, bottom : oldTop}, 700);
		}, 800);
	});
}

function animateBackgrounds() {
	var scroll = window.pageYOffset;
	var middleOfScreen = scroll + window.innerHeight/2;

	if (scroll < window.innerHeight/2) {
		$('body').css({"background-color" : "#ffffff", "color" : "#000000"});
		$('#black_line').css({"border-bottom" : "1px solid " + "#000000"});
		$('#logo').css({"fill" : "#000000"});
		bgColour = "#ffffff";
		textColour = "#000000";
	}

	for (var i = 0; i < projects.length; i++) {
		var topOfFocused = projects[i].getTopPosition();
		var bottomOfFocused = projects[i].getBottomPosition();

		if (i + 1 == projects.length) {
			var topOfNext = Infinity;
		} else {
			var topOfNext = projects[i + 1].getTopPosition();
		}

		if (bgColour == projects[i].getBgColour() &&
			textColour == projects[i].getTextColour()) {
				continue;
		}

		if (topOfFocused < middleOfScreen 
			&& topOfNext > middleOfScreen) {

			projects[i].setTheme();
			bgColour = projects[i].getBgColour();
			textColour = projects[i].getTextColour();
		}
	}
}

function picturesFadeUp() {
	var scroll = window.pageYOffset;
	var middleOfScreen = scroll + window.innerHeight*0.7;

	var images = projects[focusedProject].getImagePositions();
	var opcs = projects[focusedProject].getImageOpacities();

	for (var i = 0; i < images.length; i++) {
		if (images[i] < middleOfScreen && opcs[i] != 1) {
			projects[focusedProject].fadeInUp(i);
		}
	}

	if (focusedProject + 1 != projects.length) {
		images = projects[focusedProject + 1].getImagePositions();
		opcs = projects[focusedProject + 1].getImageOpacities();

		if (images[0] < middleOfScreen && opcs[0] != 1) {
			projects[focusedProject + 1].fadeInUp(0);
		}
	}
}

function animateInfo() {
	var scroll = window.pageYOffset;
	var middleOfScreen = scroll + window.innerHeight*0.7;

	for (var i = 0; i < projects.length; i++) {
		var topOfFocused = projects[i].getTopPosition();
		var bottomOfFocused = projects[i].getBottomPosition();

		if ((topOfFocused < middleOfScreen) && (projects[i].getInfoOpacity() == 0)) {
			projects[i].fadeInUpInfo();
		}
	}
	
}

function animateTitles() {
	var topOfFocused = projects[focusedProject].getTopPosition();
	var bottomOfFocused = projects[focusedProject].getBottomPosition();

	// if (window.pageYOffset < )

	if (window.pageYOffset < window.innerHeight) {
		projects[0].unfixTitle("upper");
		focusedTitleFixed = false;
		direction = "prev";
	}

	if (focusedProject == projects.length - 1) {
		var topOfNext = Infinity;
		var bottomOfNext = -Infinity;
	} else {
		var topOfNext = projects[focusedProject + 1].getTopPosition();
		var bottomOfNext = projects[focusedProject + 1].getBottomPosition();
	}

	if (focusedProject == 0) {
		var topOfPrev = Infinity;
		var bottomOfPrev = -Infinity;
	} else {
		var topOfPrev = projects[focusedProject - 1].getTopPosition();
		var bottomOfPrev = projects[focusedProject - 1].getBottomPosition();
	}

	if (focusedTitleFixed) { // check if the focused title is fixed, extra rc prevention
		if (topOfNext < window.pageYOffset + window.innerHeight) {
			// the top of the next project container hit the bottom of the screen
			projects[focusedProject].unfixTitle("lower");
			direction = "next";
			focusedTitleFixed = false;
		} else if (bottomOfPrev > window.pageYOffset) {
			// the bottom of the prev project container hit the top of the screen
			direction = "prev";
			projects[focusedProject].unfixTitle("upper");
			focusedTitleFixed = false;
		}
	} else {
		switch (direction) {
			case "next":
				if (bottomOfFocused > window.pageYOffset + window.innerHeight) {
					// the bottom of the focused project container hit the bottom of the screen
					projects[focusedProject].fixTitle();
					focusedTitleFixed = true;
				} else if (topOfNext < window.pageYOffset) {
					// the top of the next project container hit the top of the screen
					focusedProject++;
					projects[focusedProject].fixTitle();
					focusedTitleFixed = true;
				}
				break;
			case "prev":
				if (topOfFocused < window.pageYOffset) {
					// the top of the focused project container hit the top of the screen
					projects[focusedProject].fixTitle();
					focusedTitleFixed = true;
				} else if (bottomOfPrev > window.pageYOffset + window.innerHeight) {
					// the bottom of the prev project container hit the bottom of the screen
					focusedProject--;
					projects[focusedProject].fixTitle();
					focusedTitleFixed = true;
				}
				break;
		}
	}
}

// THREEJS
var SEPARATION = 200, AMOUNTX = 25, AMOUNTY = 25;
var container;
var camera, scene, renderer;
var particles, particle, count = 0;
var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

function initThree() {
	container = $("#about")[0];
	document.body.appendChild( container );

	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.z = 1000;

	scene = new THREE.Scene();
	particles = new Array();

	var PI2 = Math.PI * 2;
	var material = new THREE.SpriteCanvasMaterial( {
		color: 0x000000,
		program: function ( context ) {
			context.beginPath();
			context.arc( 0, 0, 0.5, 0, PI2, true );
			context.fill();
		}
	});

	var i = 0;
	for ( var ix = 0; ix < AMOUNTX; ix ++ ) {
		for ( var iy = 0; iy < AMOUNTY; iy ++ ) {
			particle = particles[ i ++ ] = new THREE.Sprite( material );
			particle.position.x = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 );
			particle.position.z = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) / 2 );
			scene.add( particle );
		}
	}

	renderer = new THREE.CanvasRenderer({ alpha: true });
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setClearColor( 0x000000, 0 );
	container.appendChild( renderer.domElement );

	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	document.addEventListener( 'touchstart', onDocumentTouchStart, false );
	document.addEventListener( 'touchmove', onDocumentTouchMove, false );

	//

	window.addEventListener( 'resize', onWindowResize, false );

}



function onWindowResize() {
	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}

function onDocumentMouseMove( event ) {

	mouseX = event.clientX - windowHalfX;
	mouseY = event.clientY - windowHalfY;

}

function onDocumentTouchStart( event ) {
	if ( event.touches.length === 1 ) {
		event.preventDefault();
		mouseX = event.touches[ 0 ].pageX - windowHalfX;
		mouseY = event.touches[ 0 ].pageY - windowHalfY;
	}
}

function onDocumentTouchMove( event ) {
	if ( event.touches.length === 1 ) {
		event.preventDefault();
		mouseX = event.touches[ 0 ].pageX - windowHalfX;
		mouseY = event.touches[ 0 ].pageY - windowHalfY;
	}
}

function renderThree() {
	camera.position.x += ( mouseX - camera.position.x ) * .05;
	camera.position.y += ( - (mouseY + window.pageYOffset) - camera.position.y ) * .05;
	camera.lookAt( scene.position );

	var i = 0;
	for ( var ix = 0; ix < AMOUNTX; ix ++ ) {
		for ( var iy = 0; iy < AMOUNTY; iy ++ ) {
			particle = particles[ i++ ];
			particle.position.y = ( Math.sin( ( ix + count ) * 0.3 ) * 50 ) +
				( Math.sin( ( iy + count ) * 0.5 ) * 50 );
			particle.scale.x = particle.scale.y = ( Math.sin( ( ix + count ) * 0.3 ) + 1 ) * 4 +
				( Math.sin( ( iy + count ) * 0.5 ) + 1 ) * 4;
		}
	}
	renderer.render( scene, camera );
	count += 0.1;
}

//threejs end

$( document ).ready(function() {
	if (!mobilecheck()) {
		$( window ).resize(function() {
			console.log("reize");
			for (var i = 0; i < projects.length; i++){
				projects[i].setPositions();
			}
			$("#black_line").css({"width" : window.innerWidth - $("#logo").width() - 20 - $("#header_text").width() - window.innerWidth*0.05 - 60});
		});
	}
	init();
});

function mobilecheck() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
}