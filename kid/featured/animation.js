var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 10000);
var renderer = new THREE.WebGLRenderer( { alpha: true });
var mouse = {x: 0, y: 0};
var prevMouse = {x:0,y:0};
var distMouse = {x:0,y:0};
var timerx = 500;
var transitionFrames = 30;
var i = 0;
var transitionCounter = 0;
var leftScroll = false;
var dLeftScroll = false;
var dRightScroll = false;
var rightScroll = false;
var val =  - window.innerHeight/2
var oriHeight = Math.min(window.innerHeight,window.innerWidth);
var minSize = Math.min(window.innerHeight,window.innerWidth);
var oriRatio = window.innerHeight / window.innerWidth;
var currentFocus = 1; 
var snapping = false;
var snapback = {x:0,y:0};
var hovering = false;

$('.next').css('transform', 'rotate(90deg) translateX(' + val + 'px)');
$('.prev').css('transform', 'rotate(270deg) translateX(' + -val + 'px)');


document.getElementById('featured').appendChild(renderer.domElement);

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor( 0x000000, 0 );

//resize picture
var geometry = new THREE.BoxGeometry(minSize * 0.8, minSize * 0.6, 0, 10, 10, 10);
var geometry2 = new THREE.BoxGeometry(minSize * 0.8, minSize * 0.6, 0, 10, 10, 10);
var geometry3 = new THREE.BoxGeometry(minSize * 0.8, minSize * 0.6, 0, 10, 10, 10);

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

cube2.position.x = 2000;
cube3.position.x = 4000;

document.addEventListener( 'mousemove', onDocumentMouseMove, false );
document.addEventListener( 'mousedown', onMouseDown, false);
document.addEventListener( 'mouseup', onMouseUp, false);
$('.next').click(onNext);
$('.prev').click(onPrev);

function onNext(e) {
	if (!dRightScroll && !dLeftScroll && !rightScroll && !leftScroll){
		if(currentFocus == 3){
			currentFocus = 1;
			dRightScroll = true;
		}else{
			currentFocus += 1;
			leftScroll = true;
		}
	}
	console.log('next');
}

function onPrev(e) {
	if (!dRightScroll && !dLeftScroll && !rightScroll && !leftScroll){
		if(currentFocus == 1){
			currentFocus = 3;
			dLeftScroll = true;
		}else{
			currentFocus -= 1;
			rightScroll = true;
		}
	}
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
	snapping = true;
	snapback.x = cube.rotation.x / 60;
	snapback.y = cube.rotation.y / 60;
}

function onDocumentMouseMove(e){
	hovering = false;
	mouse.x = (e.clientX / window.innerWidth);
	mouse.y = (e.clientY / window.innerHeight);
}

var dimension = {x: window.innerWidth, y: window.innerHeight};

$(window).resize(function(e){
	val =  - window.innerHeight/2
	minSize = Math.min(window.innerHeight,window.innerWidth);
	height = oriRatio * window.innerWidth;
	$('.next').css('transform', 'rotate(90deg) translateX(' + val + 'px)');
	$('.prev').css('transform', 'rotate(90deg) translateX(' + val + 'px)');

	var scale = window.innerHeight / height;
	height = scale * height;
	width = scale * window.innerWidth;
	renderer.setSize(width,height);
})

function dragMove() {
	distMouse.x = prevMouse.x - mouse.x;
	distMouse.y = prevMouse.y - mouse.y;
	cube.rotation.y -= distMouse.x * 2;
	cube.rotation.x -= distMouse.y * 2;
	cube2.rotation.y -= distMouse.x * 2;
	cube2.rotation.x -= distMouse.y * 2;
	cube3.rotation.y -= distMouse.x * 2;
	cube3.rotation.x -= distMouse.y * 2;
}

function hoverMove() {
	if(mouse.x > 0.5){
		if (cube.rotation.y < 0.3){
			cube.rotation.y += 0.002;
			cube2.rotation.y += 0.002;
			cube3.rotation.y += 0.002;
		}
	}else if(mouse.x < 0.5){
		if (cube.rotation.y > -0.3){
			cube.rotation.y -= 0.002;
			cube2.rotation.y -= 0.002;
			cube3.rotation.y -= 0.002;
		}
	}

	if(mouse.y > 0.5){
		if (cube.rotation.x < 0.3){
			cube.rotation.x += 0.002;
			cube2.rotation.x += 0.002;
			cube3.rotation.x += 0.002;
		}
	}else if(mouse.y < 0.5){
		if (cube.rotation.x > -0.3){
			cube.rotation.x -= 0.002;
			cube2.rotation.x -= 0.002;
			cube3.rotation.x -= 0.002;
		}
	}

	if ((cube.rotation.y > 0.3 || cube.rotation.y < -0.3) &&
		(cube.rotation.x > 0.3 || cube.rotation.x < -0.3)){
		hovering = true;
	}
}

function snapBack() {
	if (cube.rotation.x < 0.002 && cube.rotation.x > -0.002 && 
		cube.rotation.y < 0.002 && cube.rotation.y > -0.002) {
		snapping = false;
	}
	cube.rotation.x -= snapback.x;
	cube.rotation.y -= snapback.y;

	cube2.rotation.x -= snapback.x;
	cube2.rotation.y -= snapback.y;

	cube3.rotation.x -= snapback.x;
	cube3.rotation.y -= snapback.y;
}

function hover() {
	if (i == timerx){
		i = 0;
	}
	if(i < timerx / 2){
		cube.rotation.x += 0.0003;
		cube.rotation.y -= 0.0003;

		cube2.rotation.x += 0.0003;
		cube2.rotation.y -= 0.0003;

		cube3.rotation.x += 0.0003;
		cube3.rotation.y -= 0.0003;
	}else{
		cube.rotation.x -= 0.0003;
		cube.rotation.y += 0.0003;

		cube2.rotation.x -= 0.0003;
		cube2.rotation.y += 0.0003;

		cube3.rotation.x -= 0.0003;
		cube3.rotation.y += 0.0003;
	}
	i++;
}
function render() {
	requestAnimationFrame(render);

	if(mouseDown){
		dragMove();
	}else if (snapping) {
		snapBack();
	}else if (hovering) {
		hover();
	}else{
		hoverMove();
	}

	if(leftScroll){
		if(transitionCounter <= transitionFrames){
			camera.position.x += 64;
			transitionCounter++;
		}else{
			transitionCounter = 0;
			leftScroll = false;
		}
	}

	if(dLeftScroll){
		if(transitionCounter <= transitionFrames){
			camera.position.x += 64*2;
			transitionCounter++;
		}else{
			transitionCounter = 0;
			dLeftScroll = false;
		}
	}

	if(rightScroll){
		if(transitionCounter <= transitionFrames){
			camera.position.x -= 64;
			transitionCounter++;
		}else{
			transitionCounter = 0;
			rightScroll = false;
		}
	}

	if(dRightScroll){
		if(transitionCounter <= transitionFrames){
			camera.position.x -= 64 * 2;
			transitionCounter++;
		}else{
			transitionCounter = 0;
			dRightScroll = false;
		}
	}

	if(mouseDown){
		prevMouse.y = mouse.y;
		prevMouse.x = mouse.x;
	}
	
	
	renderer.render(scene, camera);
};
render();