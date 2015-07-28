var mouse = {x: 0, y: 0};
var distMouse = {x:0,y:0};
var prevMouse = {x:0,y:0};
var mouseDown = false;
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 10000);
var renderer = new THREE.WebGLRenderer({alpha:true});
$(document).ready(function(){
	document.getElementById('feature').appendChild(renderer.domElement);
});
renderer.setSize(window.innerWidth * 0.75, window.innerHeight*0.8);
renderer.setClearColor( 0x000000, 0 );

var geometry1 = new THREE.BoxGeometry(13, 9, 0, 10, 10, 10);
var feature1 = THREE.ImageUtils.loadTexture();
var material1 = new THREE.MeshBasicMaterial({map: feature1, transparent: true, opacity: 0.5, color: 0xFF0000});
// ultra hard var material1 = new THREE.MeshBasicMaterial({map: feature1, transparent: true, opacity: 0.5, color: 0xFF0000});
var cube1 = new THREE.Mesh(geometry1, material1);
cube1.material.needsUpdate = true;

var geometry2 = new THREE.BoxGeometry(13, 9, 0, 10, 10, 10);
var feature2 = THREE.ImageUtils.loadTexture();
var material2 = new THREE.MeshBasicMaterial({map: feature2, transparent: true, opacity: 0.5, color: 0xFF0000});
var cube2 = new THREE.Mesh(geometry2, material2);
cube2.material.needsUpdate = true;

var geometry3 = new THREE.BoxGeometry(13, 9, 0, 10, 10, 10);
var feature3 = THREE.ImageUtils.loadTexture();
var material3 = new THREE.MeshBasicMaterial({map: feature3, transparent: true, opacity: 0.5, color: 0xFF0000});
var cube3 = new THREE.Mesh(geometry3, material3);
cube3.material.needsUpdate = true;

var geometry4 = new THREE.BoxGeometry(13, 9, 0, 10, 10, 10);
var feature4 = THREE.ImageUtils.loadTexture();
var material4 = new THREE.MeshBasicMaterial({map: feature4, transparent: true, opacity: 0.5, color: 0xFF0000});
var cube4 = new THREE.Mesh(geometry4, material4);
cube4.material.needsUpdate = true;

document.addEventListener( 'mousemove', onDocumentMouseMove, false );
document.addEventListener( 'mousedown', onMouseDown, false);
document.addEventListener( 'mouseup', onMouseUp, false);
document.addEventListener( 'keydown', onKeyDown, false);

function onDocumentMouseMove(e){
	mouse.x = (e.clientX / window.innerWidth);
	mouse.y = (e.clientY / window.innerHeight);
}

function onKeyDown(e){
	switch (e.keyCode){
		case 37:
			camera.position.x += 0.5;
			break;
		case 38:
			camera.position.y -= 0.5;
			break;
		case 39:
			camera.position.x -= 0.5;
			break;
		case 40:
			camera.position.y += 0.5;
			break;
	}
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

function dragMove() {
	distMouse.x = prevMouse.x - mouse.x;
	distMouse.y = prevMouse.y - mouse.y;
	camera.rotation.y -= distMouse.x * 2;
	camera.rotation.x -= distMouse.y * 2;
	prevMouse.x = mouse.x;
	prevMouse.y = mouse.y;
}

scene.add(cube1);
scene.add(cube2);
scene.add(cube3);
scene.add(cube4);

camera.position.z = 10;
camera.position.x = 1;

cube2.position.x = -5;
cube3.position.x = -10;
cube4.position.x = -15;

cube2.position.y = -1;
cube3.position.y = -2;
cube4.position.y = -3;

cube2.position.z = -3;
cube3.position.z = -6;
cube4.position.z = -9;

cube1.rotation.y = 0.25;
cube2.rotation.y = 0.25;
cube3.rotation.y = 0.25;
cube4.rotation.y = 0.25;
$(document).ready(function(){
	$('.project-entry').hover(function() {
		$( this ).append( $("<span> &larr;</span>"));
		$('#feature').show();
		cube1.material.map = THREE.ImageUtils.loadTexture($(this).attr('id') + '.png');
		cube2.material.map = THREE.ImageUtils.loadTexture($(this).attr('id') + '.png');
		cube3.material.map = THREE.ImageUtils.loadTexture($(this).attr('id') + '.png');
		cube4.material.map = THREE.ImageUtils.loadTexture($(this).attr('id') + '.png');
	}, function() {
		$( this ).find("span:last").remove();
		$('#feature').hide();
	});
});
// cube2.rotation.x = 0.25;
// cube3.rotation.x = 0.5;
// cube4.rotation.x = 0.75;
function render() {
	requestAnimationFrame(render);

	if(mouseDown){
		dragMove();
	}

	if (cube1.position.z > 3){
		cube1.position.z = -9;
		cube1.position.x = -15;
		cube1.position.y = -3;
	}
	if (cube2.position.z > 3){
		cube2.position.z = -9;
		cube2.position.x = -15;
		cube2.position.y = -3;
	}
	if (cube3.position.z > 3){
		cube3.position.z = -9;
		cube3.position.x = -15;
		cube3.position.y = -3;
	}
	if (cube4.position.z > 3){
		cube4.position.z = -9;
		cube4.position.x = -15;
		cube4.position.y = -3;
	}

	if (cube1.position.z > -9 && cube1.position.z < 0){
		if(cube1.material.opacity <= 0.5){
			cube1.material.opacity += 0.01;
		}
	}

	if (cube2.position.z > -9 && cube2.position.z < 0){
		if(cube2.material.opacity <= 0.5){
			cube2.material.opacity += 0.01;
		}
	}

	if (cube3.position.z > -9 && cube3.position.z < 0){
		if(cube3.material.opacity <= 0.5){
			cube3.material.opacity += 0.01;
		}
	}

	if (cube4.position.z > -9 && cube4.position.z < 0){
		if(cube4.material.opacity <= 0.5){
			cube4.material.opacity += 0.01;
		}
	}

	if (cube1.position.z > 1){
		cube1.material.opacity -= 0.01;
	}
	if (cube2.position.z > 1){
		cube2.material.opacity -= 0.01;
	}
	if (cube3.position.z > 1){
		cube3.material.opacity -= 0.01;
	}
	if (cube4.position.z > 1){
		cube4.material.opacity -= 0.01;
	}
	

	cube1.position.z += 0.03;
	cube2.position.z += 0.03;
	cube3.position.z += 0.03;
	cube4.position.z += 0.03;

	cube1.position.x += 0.05;
	cube2.position.x += 0.05;
	cube3.position.x += 0.05;
	cube4.position.x += 0.05;

	cube1.position.y += 0.01;
	cube2.position.y += 0.01;
	cube3.position.y += 0.01;
	cube4.position.y += 0.01;
	renderer.render(scene, camera);
};
render();