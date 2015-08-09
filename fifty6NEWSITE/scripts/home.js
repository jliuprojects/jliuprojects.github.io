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

function onMouseMove( event ) {
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
	mouse_pixels.x = event.clientX;
	mouse_pixels.y = event.clientY;
}

$(document).ready(function(){
	document.getElementById('featured').appendChild(renderer.domElement);
});

/*	dimensions is an {width:##, height:##} array with length = length of size
	positions is an {x:##, y:## , y:##} array with length = length of size	
*/
function Set(scene, size, dimensions, positions, urls, rotations, info){
	this.features = [];
	this.size = size;
	this.rotations = rotations;
	this.text = $('<div class="project-info"></div>');
	this.text.html('<p class="project-title">' + info.title + '</p>' + '<p class="project-description">' + info.description + '</p>' + '<p class="project-tags">' + info.tags + '</p>' + '<div class="btn">Launch Site</div>');
	$('body').append(this.text);

	this.transitioningfwd = []; // counter for frames for transitioning positive x
	this.transitioningbk = []; // counter for frames for transitioning negative x
	this.accl = []; // accleration of x transitions
	this.frames = []; // number of frames

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

		scene.add(this.features[i]);
		this.features[i].position.x = positions[i].x;
		this.features[i].position.y = positions[i].y;
		this.features[i].position.z = positions[i].z;
	}
}

/*
	rotations is {x:##, y:## , y:##} list where each property is the increase in rotation in that axis
*/
Set.prototype.animate = function (){
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
		}

		this.features[i].rotation.y += this.rotations[i].y;
		this.features[i].rotation.z += this.rotations[i].z;
	}
}

var sets = [];
									//phone							site							logo
sets[0] = new Set(scene, 3, [		{width:4,height:8},				{width:9,height:6},				{width:3,height:3}],
								   [{x:5,y:0,z:0},					{x:-3,y:2.5,z:0},				{x:-3,y:-3,z:0}], 
								   ['assets/carousels/elie.png',	'assets/carousels/elie2.png',	'assets/carousels/elie3.png'],
								   [{x:0.005,y:0.005,z:0},			{x:-0.005,y:-0.005,z:0},		{x:0.005,y:0.005,z:0}],
								   {title:'Visionelie', tags:'Web Development, Interactive Design, Responsive Design, Creative Direction', description:'dolor sit amet, consectetur adipiscing elit. Vestibulum a quam nulla. Fusce ex eros, dictum sed justo eu, commodo eleifend dolor. Cras pretium laoreet ligula vitae tempus.'});

var currentFocusedSet = 0;
var initBuffer = 30;
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

	sets[currentFocusedSet].animate();

	renderer.render(scene, camera);
};
render();