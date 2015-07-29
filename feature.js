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

var cubes = [];

cubes[0] = new THREE.Mesh(new THREE.BoxGeometry(13, 9, 0), new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture('assets/carousels/loading.jpg'), transparent: true, opacity: 1, color: 0xffffff}));
cubes[1] = new THREE.Mesh(new THREE.BoxGeometry(13, 9, 0), new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture('assets/carousels/loading.jpg'), transparent: true, opacity: 1, color: 0xffffff}));
cubes[2] = new THREE.Mesh(new THREE.BoxGeometry(13, 9, 0), new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture('assets/carousels/loading.jpg'), transparent: true, opacity: 1, color: 0xffffff}));
cubes[3] = new THREE.Mesh(new THREE.BoxGeometry(13, 9, 0), new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture('assets/carousels/loading.jpg'), transparent: true, opacity: 1, color: 0xffffff}));

cubes[0].material.needsUpdate = true;
cubes[1].material.needsUpdate = true;
cubes[2].material.needsUpdate = true;
cubes[3].material.needsUpdate = true;

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

for (var i = 0; i < cubes.length; i++){
	scene.add(cubes[i]);
	cubes[i].position.x = -5*i;
	cubes[i].position.y = -1*i;
	cubes[i].position.z = -3*i;
	cubes[i].rotation.y = 0.25;

}

camera.position.z = 10;
camera.position.x = 1;

var imgkid = [THREE.ImageUtils.loadTexture('assets/carousels/kid1.jpg'),
			  THREE.ImageUtils.loadTexture('assets/carousels/kid2.jpg'),
			  THREE.ImageUtils.loadTexture('assets/carousels/kid3.jpg'),
			  THREE.ImageUtils.loadTexture('assets/carousels/kid4.jpg')];

var imgtemp = [THREE.ImageUtils.loadTexture('assets/carousels/comingsoon.jpg'),
			  THREE.ImageUtils.loadTexture('assets/carousels/comingsoon.jpg'),
			  THREE.ImageUtils.loadTexture('assets/carousels/comingsoon.jpg'),
			  THREE.ImageUtils.loadTexture('assets/carousels/comingsoon.jpg')];

$(document).ready(function(){
	$('.project-entry').hover(function() {
		var imgarr;
		$( this ).append( $("<span> &larr;</span>"));
		if ($(this).attr('id') == "kid"){
			imgarr = imgkid;
		}else{
			imgarr = imgtemp;
		}
		for (var i = 0; i < 4; i++){
			cubes[i].material.map = imgarr[i];
		}
		$('#feature').fadeIn(500);
	}, function() {
		$( this ).find("span:last").remove();
		$('#feature').hide();
	});
});
// cubes[1].rotation.x = 0.25;
// cubes[2].rotation.x = 0.5;
// cubes[3].rotation.x = 0.75;
function render() {
	requestAnimationFrame(render);

	if(mouseDown){
		dragMove();
	}

	if (cubes[0].position.z > 3){
		cubes[0].position.z = -9;
		cubes[0].position.x = -15;
		cubes[0].position.y = -3;
	}
	if (cubes[1].position.z > 3){
		cubes[1].position.z = -9;
		cubes[1].position.x = -15;
		cubes[1].position.y = -3;
	}
	if (cubes[2].position.z > 3){
		cubes[2].position.z = -9;
		cubes[2].position.x = -15;
		cubes[2].position.y = -3;
	}
	if (cubes[3].position.z > 3){
		cubes[3].position.z = -9;
		cubes[3].position.x = -15;
		cubes[3].position.y = -3;
	}

	if (cubes[0].position.z > -9 && cubes[0].position.z < 0){
		if(cubes[0].material.opacity <= 1){
			cubes[0].material.opacity += 0.02;
		}
	}

	if (cubes[1].position.z > -9 && cubes[1].position.z < 0){
		if(cubes[1].material.opacity <= 1){
			cubes[1].material.opacity += 0.02;
		}
	}

	if (cubes[2].position.z > -9 && cubes[2].position.z < 0){
		if(cubes[2].material.opacity <= 1){
			cubes[2].material.opacity += 0.02;
		}
	}

	if (cubes[3].position.z > -9 && cubes[3].position.z < 0){
		if(cubes[3].material.opacity <= 1){
			cubes[3].material.opacity += 0.02;
		}
	}

	if (cubes[0].position.z > 1){
		cubes[0].material.opacity -= 0.02;
	}
	if (cubes[1].position.z > 1){
		cubes[1].material.opacity -= 0.02;
	}
	if (cubes[2].position.z > 1){
		cubes[2].material.opacity -= 0.02;
	}
	if (cubes[3].position.z > 1){
		cubes[3].material.opacity -= 0.02;
	}
	

	cubes[0].position.z += 0.03;
	cubes[1].position.z += 0.03;
	cubes[2].position.z += 0.03;
	cubes[3].position.z += 0.03;

	cubes[0].position.x += 0.05;
	cubes[1].position.x += 0.05;
	cubes[2].position.x += 0.05;
	cubes[3].position.x += 0.05;

	cubes[0].position.y += 0.01;
	cubes[1].position.y += 0.01;
	cubes[2].position.y += 0.01;
	cubes[3].position.y += 0.01;
	renderer.render(scene, camera);
};
render();