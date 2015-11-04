var camera, scene, renderer;

var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var plane;

var SEPARATION = 100, AMOUNTX = 50, AMOUNTY = 50;

var COLUMNS = 20, ROWS = 20;

init();
animate();


function init() {
  container = document.createElement( 'div' );
  document.body.appendChild( container );

  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.z = 1000;
  camera.position.y = 100;

  scene = new THREE.Scene();



  plane = new THREE.Mesh(new THREE.PlaneGeometry( 7000, 7000, COLUMNS - 1, ROWS - 1), new THREE.MeshBasicMaterial({opacity: 1, color: 0xffffff, wireframe: true}));
  plane.geometry.verticesNeedUpdate = true;
  plane.rotation.x = Math.PI / -2;
  // plane.geometry.vertices[0].z = 100; 



  scene.add(plane);
  console.log(plane.geometry);
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );

  stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.top = '0px';
  container.appendChild( stats.domElement );

  document.addEventListener( 'mousemove', onDocumentMouseMove, false );
  document.addEventListener( 'touchstart', onDocumentTouchStart, false );
  document.addEventListener( 'touchmove', onDocumentTouchMove, false );

  //

  window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {

  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

function onDocumentMouseMove( event ) {

  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
  
}

function onDocumentTouchStart( event ) {
  
  if ( event.touches.length === 1 ) {

    event.preventDefault();

    mouseX = event.touches[ 0 ].pageX - windowHalfX;
    mouseY = event.touches[ 0 ].pageY - windowHalfY;

  }

}

function onDocumentTouchMove( event ) {

  if ( event.touches.length === 1 ) {

    event.preventDefault();

    mouseX = event.touches[ 0 ].pageX - windowHalfX;
    mouseY = event.touches[ 0 ].pageY - windowHalfY;

  }

}

//

function animate() {

  requestAnimationFrame( animate );

  render();
  stats.update();

}

var count = 0;
function render() {

  camera.position.x += ( mouseX - camera.position.x ) * .05;
  camera.position.y += ( - mouseY - camera.position.y ) * .05;
  camera.lookAt( scene.position );

  var i = 0;

  for ( var ix = 0; ix < COLUMNS; ix ++ ) {

    for ( var iy = 0; iy < ROWS; iy ++ ) {

      plane.geometry.vertices[i].z = ( Math.sin( ( ix + count ) * 0.3 ) * 75 ) + ( Math.sin( ( iy + count ) * 0.5 ) * 75 );
      // plane.geometry.vertices[i].x = plane.geometry.vertices[i].y = ( Math.sin( ( ix + count ) * 0.3 ) + 1 ) * 4 +
      //   ( Math.sin( ( iy + count ) * 0.5 ) + 1 ) * 4;
      i++
    }

  }
  plane.geometry.verticesNeedUpdate = true;

  // console.log(plane);
  renderer.render( scene, camera );

  count += 0.1;
}