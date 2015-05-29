var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 10000);
var renderer = new THREE.WebGLRenderer();
var mouse = {x: 0, y: 0};
var prevMouse = {x:0,y:0};
var distMouse = {x:0,y:0};
var timerx = 500;
var timery = 5;
var transitionFrames = 30;
var i = 0;
var transitionCounter = 0;
var leftScroll = false;
var rightScroll = false;
var val =  - window.innerHeight/2
var oriHeight = Math.min(window.innerHeight,window.innerWidth);
var minSize = Math.min(window.innerHeight,window.innerWidth);
var oriRatio = window.innerHeight / window.innerWidth;

$('.next').css('transform', 'rotate(90deg) translateX(' + val + 'px)');
$('.prev').css('transform', 'rotate(90deg) translateX(' + val + 'px)');


document.getElementById('featured').appendChild(renderer.domElement);

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor( 0xf0f0f0 );

//resize picture
var geometry = new THREE.BoxGeometry(minSize * 0.5, minSize * 0.5, 0, 10, 10, 10);
var geometry2 = new THREE.BoxGeometry(minSize * 0.5, minSize * 0.5, 0, 10, 10, 10);
var geometry3 = new THREE.BoxGeometry(minSize * 0.5, minSize * 0.5, 0, 10, 10, 10);

var feature1 = THREE.ImageUtils.loadTexture('1.png', {}, function(){},function(){});
var feature2 = THREE.ImageUtils.loadTexture('2.png', {}, function(){},function(){});
var feature3 = THREE.ImageUtils.loadTexture('3.png', {}, function(){},function(){});

var material1 = new THREE.MeshBasicMaterial({map: feature1});
var material2 = new THREE.MeshBasicMaterial({map: feature2});
var material3 = new THREE.MeshBasicMaterial({map: feature3});

var cube = new THREE.Mesh(geometry, material1);
var cube2 = new THREE.Mesh(geometry2, material2);
var cube3 = new THREE.Mesh(geometry3, material3);

var mouseDown = false;

scene.add(cube);
scene.add(cube2);
scene.add(cube3);
camera.position.z = 500;

cube2.position.x = 1500;
cube3.position.x = -1500;

document.addEventListener( 'mousemove', onDocumentMouseMove, false );
document.addEventListener( 'mousedown', onMouseDown, false);
document.addEventListener( 'mouseup', onMouseUp, false);
$('.next').click(onNext);
$('.prev').click(onPrev);

function onNext(e) {
	leftScroll = true;
	console.log('next');
}

function onPrev(e) {
	rightScroll = true;
	console.log('prev');
}

function onMouseDown(e){
	console.log("down");
	mouseDown = true;
	prevMouse.x = mouse.x;
	prevMouse.y = mouse.y;
}

function onMouseUp( ){
	console.log("up");
	mouseDown = false;
}

function onDocumentMouseMove(e){
	mouse.x = (e.clientX / window.innerWidth);
	mouse.y = (e.clientY / window.innerHeight);
}

var dimension = {x: window.innerWidth, y: window.innerHeight};

$(window).resize(function(e){
	// renderer.setSize(window.innerWidth, window.innerHeight);
	val =  - window.innerHeight/2
	minSize = Math.min(window.innerHeight,window.innerWidth);
	height = oriRatio * window.innerWidth;
	$('.next').css('transform', 'rotate(90deg) translateX(' + val + 'px)');
	$('.prev').css('transform', 'rotate(90deg) translateX(' + val + 'px)');
	// cube.scale.x = Math.min(window.innerHeight,window.innerWidth)/oriHeight;
	// cube.scale.y = Math.min(window.innerHeight,window.innerWidth)/oriHeight;
	// cube.scale.z = Math.min(window.innerHeight,window.innerWidth)/oriHeight;

	var scale = window.innerHeight / height;
	height = scale * height;
	width = scale * window.innerWidth;
	renderer.setSize(width,height);
})

function render() {
	requestAnimationFrame(render);

	if (i == timerx){
		i = 0;
	}
	if(i < timerx / 2){
		cube.rotation.x += 0.001;
		cube.rotation.y -= 0.001;

		cube2.rotation.x += 0.001;
		cube2.rotation.y -= 0.001;

		cube3.rotation.x += 0.001;
		cube3.rotation.y -= 0.001;
	}else{
		cube.rotation.x -= 0.001;
		cube.rotation.y += 0.001;

		cube2.rotation.x -= 0.001;
		cube2.rotation.y += 0.001;

		cube3.rotation.x -= 0.001;
		cube3.rotation.y += 0.001;
	}
	//feature1
	if(mouseDown){
		distMouse.x = prevMouse.x - mouse.x;
		distMouse.y = prevMouse.y - mouse.y;
		cube.rotation.y -= distMouse.x * 2;
		cube.rotation.x -= distMouse.y * 2;
	}else{
		if(mouse.x > 0.5){
			if (cube.rotation.y < 0.75){
				cube.rotation.y += 0.005;
			}
		}else if(mouse.x < 0.5){
			if (cube.rotation.y > -0.75){
				cube.rotation.y -= 0.005;
			}
		}

		if(mouse.y > 0.5){
			if (cube.rotation.x < 0.75){
				cube.rotation.x += 0.005;
			}
		}else if(mouse.y < 0.5){
			if (cube.rotation.x > -0.75){
				cube.rotation.x -= 0.005;
			}
		}
	}
//feature2
	if(mouseDown){
		distMouse.x = prevMouse.x - mouse.x;
		distMouse.y = prevMouse.y - mouse.y;
		cube2.rotation.y -= distMouse.x * 2;
		cube2.rotation.x -= distMouse.y * 2;
	}else{
		if(mouse.x > 0.5){
			if (cube2.rotation.y < 0.75){
				cube2.rotation.y += 0.005;
			}
		}else if(mouse.x < 0.5){
			if (cube2.rotation.y > -0.75){
				cube2.rotation.y -= 0.005;
			}
		}

		if(mouse.y > 0.5){
			if (cube2.rotation.x < 0.75){
				cube2.rotation.x += 0.005;
			}
		}else if(mouse.y < 0.5){
			if (cube2.rotation.x > -0.75){
				cube2.rotation.x -= 0.005;
			}
		}
	}
//feature3
	if(mouseDown){
		distMouse.x = prevMouse.x - mouse.x;
		distMouse.y = prevMouse.y - mouse.y;
		cube3.rotation.y -= distMouse.x * 2;
		cube3.rotation.x -= distMouse.y * 2;
	}else{
		if(mouse.x > 0.5){
			if (cube3.rotation.y < 0.75){
				cube3.rotation.y += 0.005;
			}
		}else if(mouse.x < 0.5){
			if (cube3.rotation.y > -0.75){
				cube3.rotation.y -= 0.005;
			}
		}

		if(mouse.y > 0.5){
			if (cube3.rotation.x < 0.75){
				cube3.rotation.x += 0.005;
			}
		}else if(mouse.y < 0.5){
			if (cube3.rotation.x > -0.75){
				cube3.rotation.x -= 0.005;
			}
		}
	}


	if(leftScroll){
		if(transitionCounter <= transitionFrames){
			camera.position.x += 48;
			transitionCounter++;
		}else{
			transitionCounter = 0;
			leftScroll = false;
		}
	}

	if(rightScroll){
		if(transitionCounter <= transitionFrames){
			camera.position.x -= 48;
			transitionCounter++;
		}else{
			transitionCounter = 0;
			rightScroll = false;
		}
	}

	if(mouseDown){
		prevMouse.y = mouse.y;
		prevMouse.x = mouse.x;
	}
	i++;
	
	renderer.render(scene, camera);
};
render();