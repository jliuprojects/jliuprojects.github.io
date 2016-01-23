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
    // controls.minPolarAngle = -Math.PI/4; // radians
	// controls.maxPolarAngle = Math.PI/4; // radians
	controls.minAzimuthAngle = -Math.PI/4; // radians
	controls.maxAzimuthAngle = Math.PI/4; // radians
    // controls.enabled = false;
	
	// axes
	scene.add( new THREE.AxisHelper( 20 ) );

	// geometry
	var geometry = new THREE.BoxGeometry( 100, 0, 71 );

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

	// pivots
	var dpivot1 = new THREE.Object3D();
	var dpivot2 = new THREE.Object3D();
	var dpivot3 = new THREE.Object3D();
	var dpivot4 = new THREE.Object3D();
	var dpivot5 = new THREE.Object3D();
	dpivot1.rotation.x = 2 * Math.PI * 1 / 5;
	dpivot2.rotation.x = 2 * Math.PI * 2 / 5;
	dpivot3.rotation.x = 2 * Math.PI * 3 / 5;
	dpivot4.rotation.x = 2 * Math.PI * 4 / 5;
	dpivot5.rotation.x = 2 * Math.PI * 5 / 5;
	parent.add( dpivot1 );
	parent.add( dpivot2 );
	parent.add( dpivot3 );
	parent.add( dpivot4 );
	parent.add( dpivot5 );

	// mesh
	var dmesh1 = new THREE.Mesh( geometry, material );
	var dmesh2 = new THREE.Mesh( geometry, material );
	var dmesh3 = new THREE.Mesh( geometry, material );
	var dmesh4 = new THREE.Mesh( geometry, material );
	var dmesh5 = new THREE.Mesh( geometry, material );
	dmesh1.position.y = 100;
	dmesh2.position.y = 100;
	dmesh3.position.y = 100;
	dmesh4.position.y = 100;
	dmesh5.position.y = 100;
	dpivot1.add( dmesh1 );
	dpivot2.add( dmesh2 );
	dpivot3.add( dmesh3 );
	dpivot4.add( dmesh4 );
	dpivot5.add( dmesh5 );

	parent.rotation.x += Math.PI;
}

function animate() {

	requestAnimationFrame( animate );

	parent.rotation.z += 0.005;
    
	controls.update();

	renderer.render( scene, camera );

}
