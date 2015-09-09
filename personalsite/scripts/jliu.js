var heightSoFar = 0;
function Set(index, imgs, title, description, last){
	var imgshtml = '';
	var sign = 1;
	var classname = 'left';
	if (index%2){
		sign = -1;
		classname = 'right';
	}
	for (var i = 0; i < imgs.length; i++){
		imgshtml += "<img class='project-img' src=" + imgs[i] + ">";
	}

	this.text = $("<div class='project-container-" + classname + "'>" + 
					"<div class='project-metadata'><div class='project-title'>" + 
					title + 
					"</div><div class='project-description'>" + 
					description + 
					"</div><div class='project-launch'>Launch Site</div></div>" +
					imgshtml + "</div>");

	$('#work-container').append(this.text);

	if (window.innerHeight < 870){
		this.text.width(this.text.width() + 490 + 870 + (window.innerWidth * 0.4));
	}else{
		this.text.width(this.text.width() + 490 + window.innerHeight + (window.innerWidth * 0.4));
	}
	

	if (index%2){
		this.text.children('.project-metadata').css('right',(window.innerWidth * 0.10));
		this.text.children('.project-img').css('right',(window.innerWidth * 0.4 + 32));
	}

	this.text.attr( "data-" + heightSoFar, "transform: translate(0px, 0px)");
	if (index){
		this.text.attr( "data-" + (heightSoFar + window.innerHeight), "transform: translate(0px, -" + window.innerHeight + "px)");
		this.text.attr( "data-" + (heightSoFar + this.text.width() - window.innerWidth), "transform: translate(" + sign * (-1*(this.text.width() - window.innerWidth -  window.innerHeight)) + "px" + ", -" + window.innerHeight + "px)");
		if (!last){
			this.text.attr( "data-" + (heightSoFar + this.text.width() - window.innerWidth + window.innerHeight), "transform: translate(" + sign * (-1*(this.text.width() - window.innerWidth -  window.innerHeight)) + "px" + ", -" + window.innerHeight*2 + "px)");
		}
		heightSoFar += this.text.width() - window.innerWidth;
	}else{
		this.text.attr( "data-" + (heightSoFar + this.text.width() - window.innerWidth -  window.innerHeight), "transform: translate(" + (-1*(this.text.width() - window.innerWidth -  window.innerHeight)) + "px" + ", 0px)");
		this.text.attr( "data-" + (heightSoFar + this.text.width() - window.innerWidth), "transform: translate(" + (-1*(this.text.width() - window.innerWidth -  window.innerHeight)) + "px" + ", -" + window.innerHeight + "px)");
		heightSoFar += this.text.width() - window.innerWidth - window.innerHeight;
	}
}

var sets = [];
sets.push(new Set(sets.length, ["assets/kid.png","assets/kid.png","assets/kid.png"], "Kid Studio", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. "));
sets.push(new Set(sets.length,["assets/kid.png"], "Kid Studio", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. "));
sets.push(new Set(sets.length,["assets/kid.png","assets/kid.png","assets/kid.png"], "Kid Studio", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. "));
sets.push(new Set(sets.length,["assets/kid.png","assets/kid.png"], "Kid Studio", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ", true));


sets[0].text.css({'top' : '0%'});

$('.containers').fadeOut(0);
$('body,html').css('overflow','hidden');

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

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 10000);
// var mouse_pixels = {x:0,y:0};
var renderer = new THREE.WebGLRenderer({alpha:true});

renderer.setSize(window.innerWidth - 1, window.innerHeight - 1);
renderer.setClearColor( 0x000000, 0 );

window.addEventListener( 'resize', onWindowResize, false );

camera.position.z = 10;

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var offset = new THREE.Vector3(),
			INTERSECTED, SELECTED;

// window.addEventListener( 'mousemove', onMouseMove, false );

// function onMouseMove( event ) {
// 	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
// 	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
// 	console.log(mouse);
// 	mouse_pixels.x = event.clientX;
// 	mouse_pixels.y = event.clientY;
// }

document.getElementById('about-container').appendChild(renderer.domElement);

var tetrahedron = new THREE.Mesh(new THREE.TetrahedronGeometry(6,0), new THREE.MeshBasicMaterial({transparent: true, opacity: 1, color: 0x000000, wireframe: true}));
var dodecahedron = new THREE.Mesh(new THREE.DodecahedronGeometry(4,0), new THREE.MeshBasicMaterial({transparent: true, opacity: 1, color: 0x000000, wireframe: true}));
var octahedron = new THREE.Mesh(new THREE.OctahedronGeometry(4,0), new THREE.MeshBasicMaterial({transparent: true, opacity: 1, color: 0x000000, wireframe: true}));
var cube = new THREE.Mesh(new THREE.BoxGeometry(3,3,3,2,2,2), new THREE.MeshBasicMaterial({transparent: true, opacity: 1, color: 0x000000, wireframe: true}));
var circle = new THREE.Mesh(new THREE.SphereGeometry(2,10,10), new THREE.MeshBasicMaterial({transparent: true, opacity: 1, color: 0x000000, wireframe: true}));

var plane = new THREE.Mesh(
					new THREE.PlaneBufferGeometry( 2000, 2000, 8, 8 ),
					new THREE.MeshBasicMaterial( { color: 0x000000, opacity: 0.25, transparent: true }));

var shapes = []
shapes.push(tetrahedron);
shapes.push(dodecahedron);
shapes.push(octahedron);
shapes.push(cube);
shapes.push(circle);

tetrahedron.position.x = 8;
tetrahedron.position.y = 0;

dodecahedron.position.x = -1;
dodecahedron.position.y = -3;

octahedron.position.x = -7;
octahedron.position.y = 4;
// octahedron.position.z = -5;

cube.position.x = -10;
cube.position.y = -3;

circle.position.x = 3;
circle.position.y = 4;

scene.add(tetrahedron);
scene.add(dodecahedron);
scene.add(octahedron);
scene.add(cube);
scene.add(circle);

renderer.domElement.addEventListener( 'mousemove', onDocumentMouseMove, false );
renderer.domElement.addEventListener( 'mousedown', onDocumentMouseDown, false );
renderer.domElement.addEventListener( 'mouseup', onDocumentMouseUp, false );

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function onDocumentMouseMove( event ) {

	event.preventDefault();

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

	//

	raycaster.setFromCamera( mouse, camera );

	if ( SELECTED ) {

		var intersects = raycaster.intersectObject( plane );
		SELECTED.position.copy( intersects[ 0 ].point.sub( offset ) );
		return;

	}

	var intersects = raycaster.intersectObjects( shapes );

	if ( intersects.length > 0 ) {

		if ( INTERSECTED != intersects[ 0 ].object ) {

			// if ( INTERSECTED ) INTERSECTED.material.color.setHex( INTERSECTED.currentHex );

			INTERSECTED = intersects[ 0 ].object;
			// INTERSECTED.currentHex = INTERSECTED.material.color.getHex();

			plane.position.copy( INTERSECTED.position );
			plane.lookAt( camera.position );

		}

		// container.style.cursor = 'pointer';

	} else {

		// if ( INTERSECTED ) INTERSECTED.material.color.setHex( INTERSECTED.currentHex );

		INTERSECTED = null;

		// container.style.cursor = 'auto';

	}

}

function onDocumentMouseDown( event ) {

	event.preventDefault();

	var vector = new THREE.Vector3( mouse.x, mouse.y, 0.5 ).unproject( camera );

	var raycaster = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );

	var intersects = raycaster.intersectObjects( shapes );

	if ( intersects.length > 0 ) {

		// controls.enabled = false;

		SELECTED = intersects[ 0 ].object;

		var intersects = raycaster.intersectObject( plane );
		offset.copy( intersects[ 0 ].point ).sub( plane.position );

		// container.style.cursor = 'move';

	}

}

function onDocumentMouseUp( event ) {

	event.preventDefault();

	// controls.enabled = true;

	if ( INTERSECTED ) {

		plane.position.copy( INTERSECTED.position );

		SELECTED = null;

	}

	// container.style.cursor = 'auto';

}

function render() {
	requestAnimationFrame(render);
	tetrahedron.rotation.x += 0.003;
	tetrahedron.rotation.y += 0.003;
	// tetrahedron.rotation.z += 0.003;

	dodecahedron.rotation.x -= 0.003;
	dodecahedron.rotation.y -= 0.003;
	// dodecahedron.rotation.z -= 0.003;

	octahedron.rotation.x += 0.003;
	octahedron.rotation.y -= 0.003;
	// octahedron.rotation.z += 0.003;

	cube.rotation.x -= 0.004;
	cube.rotation.y -= 0.004;

	circle.rotation.x -= 0.004;
	circle.rotation.y -= 0.004;

	// update the picking ray with the camera and mouse position	
	raycaster.setFromCamera( mouse, camera );	

	// calculate objects intersecting the picking ray
	var intersects = raycaster.intersectObjects( shapes );


	for ( var i = 0; i < intersects.length; i++ ) {
		// console.log(intersects);
		intersects[i].object.rotation.x += 0.06;
		intersects[i].object.rotation.y += 0.06;
	}

	renderer.render(scene, camera);
};
render();