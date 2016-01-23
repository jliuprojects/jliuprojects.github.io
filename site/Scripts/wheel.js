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
	info.style.color = '#000000';
	info.style.fontWeight = 'bold';
	info.style.backgroundColor = 'transparent';
	info.style.zIndex = '1';
	info.style.fontFamily = 'Monospace';
	info.innerHTML = 'Drag mouse to rotate camera; Scroll to zoom';
	document.body.appendChild( info );

	// renderer
	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setClearColor(0xffffff);
	document.body.appendChild( renderer.domElement );

	// scene
	scene = new THREE.Scene();
	
	// camera
	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.set( 0, 0, 0 );

	// controls
	controls = new THREE.OrbitControls( camera );
    controls.minDistance = 10;
    controls.maxDistance = 500;
    // controls.enabled = false;
	
	// axes
	// scene.add( new THREE.AxisHelper( 20 ) );

	// geometry
	var geometry = new THREE.BoxGeometry( 50, 0, 25 );

	// texture
	var texture = THREE.ImageUtils.loadTexture( 'assets/kid.png' );
	
	// material
	var material = new THREE.MeshBasicMaterial( {
		map: texture,
		// color: 0x000000, 
		// wireframe: true
	} );
	
	// parent
	parent = new THREE.Object3D();
	scene.add( parent );

	// pivots
	var pivot1 = new THREE.Object3D();
	var pivot2 = new THREE.Object3D();
	var pivot3 = new THREE.Object3D();
	var pivot4 = new THREE.Object3D();
	var pivot5 = new THREE.Object3D();
	pivot1.rotation.z = 2 * Math.PI * 1 / 5;
	pivot2.rotation.z = 2 * Math.PI * 2 / 5;
	pivot3.rotation.z = 2 * Math.PI * 3 / 5;
	pivot4.rotation.z = 2 * Math.PI * 4 / 5;
	pivot5.rotation.z = 2 * Math.PI * 5 / 5;
	parent.add( pivot1 );
	parent.add( pivot2 );
	parent.add( pivot3 );
	parent.add( pivot4 );
	parent.add( pivot5 );

	parent.rotation.x += Math.PI;

	// mesh
	var mesh1 = new THREE.Mesh( geometry, material );
	var mesh2 = new THREE.Mesh( geometry, material );
	var mesh3 = new THREE.Mesh( geometry, material );
	var mesh4 = new THREE.Mesh( geometry, material );
	var mesh5 = new THREE.Mesh( geometry, material );
	mesh1.position.y = 100;
	mesh2.position.y = 100;
	mesh3.position.y = 100;
	mesh4.position.y = 100;
	mesh5.position.y = 100;
	pivot1.add( mesh1 );
	pivot2.add( mesh2 );
	pivot3.add( mesh3 );
	pivot4.add( mesh4 );
	pivot5.add( mesh5 );
	
}

function animate() {

	requestAnimationFrame( animate );

	parent.rotation.z += 0.005;
    
	controls.update();

	renderer.render( scene, camera );

}
