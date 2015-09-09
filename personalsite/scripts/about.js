var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 10000);
var renderer = new THREE.WebGLRenderer({alpha:true});

renderer.setSize(window.innerWidth - 1, window.innerHeight - 1);
renderer.setClearColor( 0x000000, 0 );

window.addEventListener( 'resize', onWindowResize, false );

camera.position.z = 10;

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var offset = new THREE.Vector3(),
			INTERSECTED, SELECTED;

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
	raycaster.setFromCamera( mouse, camera );
	if ( SELECTED ) {
		var intersects = raycaster.intersectObject( plane );
		SELECTED.position.copy( intersects[ 0 ].point.sub( offset ) );
		return;
	}
	var intersects = raycaster.intersectObjects( shapes );
	if ( intersects.length > 0 ) {
		if ( INTERSECTED != intersects[ 0 ].object ) {
			INTERSECTED = intersects[ 0 ].object;
			plane.position.copy( INTERSECTED.position );
			plane.lookAt( camera.position );
		}
	} else {
		INTERSECTED = null;
	}
}

function onDocumentMouseDown( event ) {
	event.preventDefault();

	var vector = new THREE.Vector3( mouse.x, mouse.y, 0.5 ).unproject( camera );
	var raycaster = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );
	var intersects = raycaster.intersectObjects( shapes );
	if ( intersects.length > 0 ) {
		SELECTED = intersects[ 0 ].object;
		var intersects = raycaster.intersectObject( plane );
		offset.copy( intersects[ 0 ].point ).sub( plane.position );
	}
}

function onDocumentMouseUp( event ) {
	event.preventDefault();

	if ( INTERSECTED ) {
		plane.position.copy( INTERSECTED.position );
		SELECTED = null;
	}
}

function render() {
	requestAnimationFrame(render);
	tetrahedron.rotation.x += 0.003;
	tetrahedron.rotation.y += 0.003;

	dodecahedron.rotation.x -= 0.003;
	dodecahedron.rotation.y -= 0.003;

	octahedron.rotation.x += 0.003;
	octahedron.rotation.y -= 0.003;

	cube.rotation.x -= 0.004;
	cube.rotation.y -= 0.004;

	circle.rotation.x -= 0.004;
	circle.rotation.y -= 0.004;

	// update the picking ray with the camera and mouse position	
	raycaster.setFromCamera( mouse, camera );	

	// calculate objects intersecting the picking ray
	var intersects = raycaster.intersectObjects( shapes );

	for ( var i = 0; i < intersects.length; i++ ) {
		intersects[i].object.rotation.x += 0.06;
		intersects[i].object.rotation.y += 0.06;
	}

	renderer.render(scene, camera);
};
render();