var projects = [];
var focusedProject = 0;
var bgColour = null;
var textColour = null;
var numProjectImages = 0;
var numProjectImagesLoaded = 0;
var scroll = 0;
var isMobile = false;
var pointerDirection = "down";
var startDate = 0;
var loadingCheck;
var animateLoading;
var loading = false;
var projectImagesCounted = false;
var isMobileDesktop = false;
var MIN_MOBILE_DESKTOP_WIDTH = 700;
var TITLES = [" = 40 + 16"," = 20 + 36"," = 14 * 4"," = 2 * 28"," = 112 / 2"," = 224 / 4"," = 88 - 32"," = 66 - 10"," = 6 * 9&frac13;"," = 69 - 13"];

$( document ).ready(function() {
	loadingCheck = window.setInterval(function() {
		loading = true;
		window.clearInterval(loadingCheck);
		$("#loading_screen").fadeIn();
		animateLoading = window.setInterval(function() {
			var currentPerc = parseInt($("#loading_screen_text").html());
			var perc = currentPerc;

			if (projectImagesCounted) {
				perc = Math.floor(numProjectImagesLoaded/numProjectImages*56);
			}

			if (currentPerc < perc) {
				$("#loading_screen_text").html(currentPerc + 1);
			}

			if (currentPerc == 56) {
				window.clearInterval(animateLoading);
				window.setTimeout(function() {
					$("#loading_screen").fadeOut(1000);
					window.setTimeout(function() {
						$("#loading_screen").remove();
						$(".project_title_container").css({"opacity" : 1});
						$("body").css({"overflow" : "visible"});
						$(document).unbind('touchmove');
						loading = false;
						run();
					}, 1000);
				}, 800);
			}
		}, 50);
	}, 500);

	isMobile = mobilecheck();
	isMobileDesktop = mobileDesktopCheck();
	$(document).bind('touchmove', false);
	init();
});

function resizeAbout () {
	var leftover = $("#center_text").height() - $("#main_title").height() - $("#services").height();
	$("#services, #clients").css({"top" : Math.max(30, leftover) + "px"});
}

function resizeDesktopMobilePointer () {
	var top = $("#twittersvg").offset().top + $("#twittersvg").height() + 50;
	$("#pointer").css({"top" : top + "px"});
}

function init () {
	if (!isMobile) {
		$( window ).resize(function() {
			isMobileDesktop = mobileDesktopCheck();
			if (loading) {
				return;
			}
			for (var i = 0; i < projects.length; i++){
				projects[i].setPositions();
			}
			resizeAbout();

			if (!isMobile && !isMobileDesktop) {
				changeToDesktop();
			} else if (isMobileDesktop) {
				changeToMobileDesktop();
			}
		});
	}

    $.getJSON("assets/projects.json", function(json) {
    	if (isMobile) {
    		for (var i = 0; i < json.projects.length; i++){
    			json.projects[i].textcolour = "black";
    		}
    	}

	    numProjectImages = 0;
	    for (var i = 0; i < json.projects.length; i++){
	    	json.projects[i].cb = loadedCb;
    		projects.push(new StyledProjectSet(json.projects[i]));
    		numProjectImages += json.projects[i].images.length;
    	}
    	projectImagesCounted = true;
    	$("#header_text").html(json.headerTexts[getRandomInt(0,json.headerTexts.length - 1)]);
    	window.setInterval(function() {
    		$("#header_text").html(json.headerTexts[getRandomInt(0,json.headerTexts.length - 1)]);
    	}, 20000);
    	$("title").html(TITLES[getRandomInt(0,TITLES.length - 1)]);
    	window.setInterval(function() {
    		$("title").html(TITLES[getRandomInt(0,TITLES.length-1)]);
    	}, 10000);
	});

	$("#pointer").click(function() {
		if (window.pageYOffset >= window.innerHeight) {
			$('body').animate({scrollTop : 0}, 600, 'swing');
		} else if (window.pageYOffset < window.innerHeight) {
			$('body').animate({scrollTop : window.innerHeight}, 600, 'swing');
		}
	});

	if (!isMobile) {
		initThree();
	}
}

function loadedCb() {
	numProjectImagesLoaded++;
	if (numProjectImagesLoaded == numProjectImages) {
		console.log("all projects loaded");
		if (!loading) {
			window.clearInterval(loadingCheck);
			$("#loading_screen").remove();
			$(".project_title_container").css({"opacity" : 1});
			$("body").css({"overflow" : "visible"});
			$(document).unbind('touchmove');
			run();
		}
	}
}

function run() {
	window.scrollTo(0, 0);
	animateAbout();
	for (var i = 0; i < projects.length; i++){
		projects[i].setPositions();
	}

	if (isMobile) {
		for (var i = 0; i < projects.length; i++){
			projects[i].fixTitleMobile();
		}
	} else {
		render();
		window.setInterval(intervalLoop, 250);
	}
}

function render() {
	window.requestAnimFrame(render);
	
	if (isMobileDesktop) {
		return;
	}

	scroll = window.pageYOffset;
	animateTitles();
	if (scroll < window.innerHeight*1.5) {
		renderThree();
	}
}

function intervalLoop() {
	if (isMobileDesktop) {
		return;
	}

	animateInfo();
	picturesFadeUp();
	animateBackgrounds();
	animatePointer();
}

function animatePointer() {
	if (pointerDirection == "down" && scroll >= window.innerHeight) {
		document.getElementById("pointer").setAttribute("class", "pointerPointUp");
		pointerDirection = "up";
	}

	if (pointerDirection == "up" && scroll < window.innerHeight) {
		document.getElementById("pointer").setAttribute("class", "pointerPointDown");
		pointerDirection = "down";
	}
}

function animateAbout() {
	if (isMobile) {
		$("#logo").css({"top" : "-=100px"});
		$("#logo").animate({opacity : 1, top : "+=100px"}, 700, function() {
			$("#main_title").css({"top" : "+=100px"});
			$("#main_title").animate({opacity : 1, top : "-=100px"}, 700);
			window.setTimeout(function (){
				$("#contact").css({"top" : "+=100px"});
				$("#contact").animate({opacity : 1, top : "-=100px"}, 700);
				window.setTimeout(function (){
					$("#twittersvg").css({"top" : "+=100px"});
					$("#twittersvg").animate({opacity : 1, top : "-=100px"}, 700);
					window.setTimeout(function (){
						$("#pointer").css({"bottom" : "-=100px"});
						$("#pointer").animate({opacity : 1, bottom : "+=100px"}, 700);
					}, 600);
				}, 600);
			}, 600);
		});
	} else if (isMobileDesktop) {
		changeToMobileDesktop();
		$("#logo").css({"top" : "-=100px"});
		$("#logo").animate({opacity : 1, top : "+=100px"}, 700, function() {
			$("#main_title").css({"top" : "+=100px"});
			$("#main_title").animate({opacity : 1, top : "-=100px"}, 700);
			window.setTimeout(function (){
				$("#contact").css({"margin-top" : "+=100px"});
				$("#contact").animate({opacity : 1, marginTop : "-=100px"}, 700);
				window.setTimeout(function (){
					$("#twittersvg").css({"top" : "+=100px"});
					$("#twittersvg").animate({opacity : 1, top : "-=100px"}, 700);
					window.setTimeout(function (){
						$("#pointer").css({"top" : "+=100px"});
						$("#pointer").animate({opacity : 1, top : "-=100px"}, 700, function() {
							var bottom = Math.max(window.innerHeight, $("#pointer").offset().top + $("#pointer").height());
							$("#about").css({height : bottom - $("#about").offset().top + 50 + "px"});
						});
					}, 600);
				}, 600);
			}, 600);
		});
	} else {
		resizeAbout();
		$("#header_text").css({"top" : "-=100px"});
		$("#header_text").animate({opacity : 1, top : "+=100px"}, 700);

		$("#pointer").css({"bottom" : "-=100px"});
		$("#pointer").animate({opacity : 1, bottom : "+=100px"}, 700);
		$("#twittersvg").css({"bottom" : "-=100px"});
		$("#twittersvg").animate({opacity : 1, bottom : "+=100px"}, 700);

		$("canvas").animate({opacity : 1}, 700);

		$("#logo").css({"top" : "-=100px"});
		$("#logo").animate({opacity : 1, top : "+=100px"}, 700, function() {
			$("#main_title").css({top : "+=100px"});
			$("#main_title").animate({opacity : 1, top : "-=100px"}, 700);
			window.setTimeout(function (){
				$("#services").css({"top" : "+=100px"});
				$("#services").animate({opacity : 1, top : "-=100px"}, 700);
			}, 200);
			window.setTimeout(function (){
				$("#clients").css({"top" : "+=100px"});
				$("#clients").animate({opacity : 1, top : "-=100px"}, 700);
			}, 400);
			window.setTimeout(function (){
				$("#contact").css({"margin-top" : "+=100px"});
				$("#contact").animate({opacity : 1, marginTop : "-=100px"}, 700);
			}, 600);
		});
	}
}

function animateInfo() {
	var infoFadeInPoint = scroll + window.innerHeight*0.7;
	if ((projects[focusedProject].getTopPosition() < infoFadeInPoint) && (projects[focusedProject].getInfoOpacity() == 0)) {
		projects[focusedProject].fadeInUpInfo();
	}

	if ((focusedProject + 1 != projects.length) 
		&& (projects[focusedProject + 1].getTopPosition() < infoFadeInPoint) 
		&& (projects[focusedProject + 1].getInfoOpacity() == 0)) {

			projects[focusedProject + 1].fadeInUpInfo();
	}
}

function animateBackgrounds() {
	var middleOfScreen = scroll + window.innerHeight/2;

	if ((bgColour != "#ffffff" || textColour != "#000000") && scroll < window.innerHeight/2) {
		document.getElementById("background").style.backgroundColor = "#ffffff";
		document.getElementById("header_text").style.color = "#000000";
		document.getElementById("logo").style.fill = "#000000";
		document.getElementById("pointer").style.fill = "#000000";
		document.getElementById("twitter").style.fill = "#000000";
		bgColour = "#ffffff";
		textColour = "#000000";
	}

	if (focusedProject + 1 != projects.length && projects[focusedProject + 1].getTopPosition() < middleOfScreen) {
		if (bgColour != projects[focusedProject + 1].getBgColour() || textColour != projects[focusedProject + 1].getTextColour()) {
			projects[focusedProject + 1].setTheme();
			bgColour = projects[focusedProject + 1].getBgColour();
			textColour = projects[focusedProject + 1].getTextColour();
		}
	} else if (projects[focusedProject].getTopPosition() < middleOfScreen) {
		if (bgColour != projects[focusedProject].getBgColour() || textColour != projects[focusedProject].getTextColour()) {
			projects[focusedProject].setTheme();
			bgColour = projects[focusedProject].getBgColour();
			textColour = projects[focusedProject].getTextColour();
		}
	} else if (focusedProject - 1 >= 0 && projects[focusedProject - 1].getTopPosition() < middleOfScreen) {
		if (bgColour != projects[focusedProject - 1].getBgColour() || textColour != projects[focusedProject - 1].getTextColour()) {
			projects[focusedProject - 1].setTheme();
			bgColour = projects[focusedProject - 1].getBgColour();
			textColour = projects[focusedProject - 1].getTextColour();
		}
	}
}

function picturesFadeUp() {
	var pictureFadeInPoint = scroll + window.innerHeight*0.8;
	var images = projects[focusedProject].getImagePositions();
	var opcs = projects[focusedProject].getImageOpacities();

	for (var i = 0; i < images.length; i++) {
		if (images[i] < pictureFadeInPoint && opcs[i] != 1) {
			projects[focusedProject].fadeInUpPicture(i);
		}
	}

	if (focusedProject + 1 != projects.length) {
		images = projects[focusedProject + 1].getImagePositions();
		opcs = projects[focusedProject + 1].getImageOpacities();

		if (images[0] < pictureFadeInPoint && opcs[0] != 1) {
			projects[focusedProject + 1].fadeInUpPicture(0);
		}
	}
}

function animateTitles() {
	var bottomOfPage = scroll + window.innerHeight;

	for (var i = 0; i < projects.length; i++) {
		var topOfProject = projects[i].getTopPosition();
		var bottomOfProject = projects[i].getBottomPosition();

		if (!projects[i].isTitleFixed() && topOfProject <= scroll && bottomOfProject >= bottomOfPage) {
			projects[i].fixTitle();
			focusedProject = i;
		} else if (topOfProject > scroll) {
			projects[i].unfixTitle("upper");
		} else if (bottomOfProject < bottomOfPage) {
			projects[i].unfixTitle("lower");
		}
	}
}

function changeToDesktop() {
	$("#services, #clients, #header_text, #pointer, canvas").css({opacity : 1});
	$("#pointer").css({top : "auto"});
	$("#twittersvg").css({top : "auto"});
	$("#about").css({height : "100%"});
}

function changeToMobileDesktop() {
	for (var i = 0; i < projects.length; i++){
		projects[i].fixTitleMobile();
	}
	$(".project_title_container").css({top : 0});
	document.getElementById("pointer").setAttribute("class", "pointerPointDown");
	pointerDirection = "down";

	$("#twittersvg").css({top : "80px"});
	if ($("#pointer").offset().top != 0) {
		var bottom = Math.max(window.innerHeight, $("#pointer").offset().top + $("#pointer").height());
		$("#about").css({height : bottom - $("#about").offset().top + 50 + "px"});
	}
	resizeDesktopMobilePointer();
}

// THREEJS
var SEPARATION = 200, AMOUNTX = 25, AMOUNTY = 25;
var container;
var camera, scene, renderer;
var particles, particle, count = 0;
var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var canvasHeight = 1.7;

function initThree() {
	container = $("#jswave")[0];

	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / (window.innerHeight * canvasHeight), 1, 10000);
	camera.position.z = 1000;

	scene = new THREE.Scene();
	particles = new Array();

	var PI2 = Math.PI * 2;
	var material = new THREE.SpriteCanvasMaterial({
		color: 0x000000,
		program: function (context) {
			context.beginPath();
			context.arc( 0, 0, 0.5, 0, PI2, true );
			context.fill();
		}
	});

	var i = 0;
	for (var ix = 0; ix < AMOUNTX; ix++) {
		for (var iy = 0; iy < AMOUNTY; iy++) {
			particle = particles[i++] = new THREE.Sprite(material);
			particle.position.x = ix * SEPARATION - ((AMOUNTX * SEPARATION) / 2);
			particle.position.z = iy * SEPARATION - ((AMOUNTY * SEPARATION) / 2);
			scene.add(particle);
		}
	}

	renderer = new THREE.CanvasRenderer({alpha : true});
	renderer.setPixelRatio( window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight * canvasHeight);
	renderer.setClearColor( 0x000000, 0);
	container.appendChild( renderer.domElement);

	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	document.addEventListener( 'touchstart', onDocumentTouchStart, false );
	document.addEventListener( 'touchmove', onDocumentTouchMove, false );
	window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {
	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;
	camera.aspect = window.innerWidth / (window.innerHeight * canvasHeight);
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight * canvasHeight);
}

function onDocumentMouseMove( event ) {
	mouseX = event.clientX - windowHalfX;
	mouseY = event.clientY - windowHalfY;
}

function onDocumentTouchStart( event ) {
	if (event.touches.length === 1 ) {
		// event.preventDefault();
		mouseX = event.touches[0].pageX - windowHalfX;
		mouseY = event.touches[0].pageY - windowHalfY;
	}
}

function onDocumentTouchMove(event) {
	if (event.touches.length === 1) {
		// event.preventDefault();
		mouseX = event.touches[0].pageX - windowHalfX;
		mouseY = event.touches[0].pageY - windowHalfY;
	}
}

function renderThree() {
	camera.position.x += (mouseX - camera.position.x) * .05;
	camera.position.y += (- (mouseY + scroll) - camera.position.y) * .05;
	camera.lookAt( scene.position );

	var i = 0;
	for ( var ix = 0; ix < AMOUNTX; ix++) {
		for ( var iy = 0; iy < AMOUNTY; iy++) {
			particle = particles[i++];
			particle.position.y = (Math.sin((ix + count) * 0.3) * 50) + (Math.sin(( iy + count) * 0.5) * 50);
			particle.scale.x = particle.scale.y = (Math.sin((ix + count) * 0.3) + 1) * 4 + (Math.sin((iy + count) * 0.5) + 1) * 4;
		}
	}
	renderer.render(scene, camera);
	count += 0.1;
}
//threejs end

function mobileDesktopCheck() {
	return !isMobile && window.innerWidth < MIN_MOBILE_DESKTOP_WIDTH;
}

function mobilecheck() {
	var check = false;
	(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
	return check;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
 
// requestAnimationFrame polyfill by Erik M�ller. fixes from Paul Irish and Tino Zijdel
 
// MIT license

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();
 
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());