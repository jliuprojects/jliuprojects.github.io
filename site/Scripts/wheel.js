var parent, renderer, scene, camera, controls;

init();
animate();

function init() {

	// info
	info = document.createElement( 'div' );
	info.style.position = 'absolute';
	info.style.top = '30px';
	info.style.width = '100%';
	info.style.textAlign = 'center';
	info.style.color = '#fff';
	info.style.fontWeight = 'bold';
	info.style.backgroundColor = 'transparent';
	info.style.zIndex = '1';
	info.style.fontFamily = 'Monospace';
	// info.innerHTML = 'Drag mouse to rotate camera; Scroll to zoom';
	document.body.appendChild( info );

	// renderer
	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	// scene
	scene = new THREE.Scene();
	
	// camera
	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.set( 0, 0, 0 );

	// controls
	controls = new THREE.OrbitControls( camera );
    controls.minDistance = 10;
    controls.maxDistance = 10;
    controls.enabled = false;
	
	// axes
	// scene.add( new THREE.AxisHelper( 20 ) );

	// geometry
	var geometry = new THREE.BoxGeometry( 50, 0, 25 );
	
	// material
	var material = new THREE.MeshBasicMaterial( {
		color: 0xffffff, 
		wireframe: true
	} );
	
	// parent
	parent = new THREE.Object3D();
	scene.add( parent );

	// pivots
	var pivot1 = new THREE.Object3D();
	var pivot2 = new THREE.Object3D();
	var pivot3 = new THREE.Object3D();
	pivot1.rotation.z = 0;
	pivot2.rotation.z = 2 * Math.PI / 3;
	pivot3.rotation.z = 4 * Math.PI / 3;;
	parent.add( pivot1 );
	parent.add( pivot2 );
	parent.add( pivot3 );

	// mesh
	var mesh1 = new THREE.Mesh( geometry, material );
	var mesh2 = new THREE.Mesh( geometry, material );
	var mesh3 = new THREE.Mesh( geometry, material );
	mesh1.position.y = 100;
	mesh2.position.y = 100;
	mesh3.position.y = 100;
	pivot1.add( mesh1 );
	pivot2.add( mesh2 );
	pivot3.add( mesh3 );
	
}

function animate() {

	requestAnimationFrame( animate );

	parent.rotation.z += 0.005;
    
	controls.update();

	renderer.render( scene, camera );

}
