var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 10000);
var renderer = new THREE.WebGLRenderer({alpha:true});
renderer.setSize(window.innerWidth * 0.75, window.innerHeight*0.8);
renderer.setClearColor( 0x000000, 0 );	
camera.position.z = 10;
camera.position.x = 1;

$(document).ready(function(){
	document.getElementById('feature').appendChild(renderer.domElement);
});

function createCarousel(len, posxOffset, posyOffset, poszOffset, posxFactor, posyFactor, poszFactor, roty){
	posxFactor = posxFactor || -5;
	posyFactor = posyFactor || -1;
	poszFactor = poszFactor || -3;
	roty = roty || 0.25;
	posxOffset = posxOffset || 0;
	posyOffset = posyOffset || 0;
	poszOffset = poszOffset || 0;

	var arr = [];
	for (var i = 0; i < len; i++){
		arr[i] = new THREE.Mesh(new THREE.BoxGeometry(13, 9, 0), new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture('assets/carousels/loading.jpg'), transparent: true, opacity: 1, color: 0xffffff}));
		arr[i].material.needsUpdate = true;

		scene.add(arr[i]);
		arr[i].position.x = posxFactor*i + posxOffset;
		arr[i].position.y = posyFactor*i + posyOffset;
		arr[i].position.z = poszFactor*i + poszOffset;
		arr[i].rotation.y = roty;
	}
	return arr;
}

function animateCarousel(arr){
	for (var i = 0; i < arr.length; i++){
		if (arr[i].position.z > 3){
			arr[i].position.z = -9;
			arr[i].position.x = -15;
			arr[i].position.y = -3;
		}

		if (arr[i].position.z > -9 && arr[i].position.z < 0){
			if(arr[i].material.opacity <= 1){
				arr[i].material.opacity += 0.02;
			}
		}

		if (arr[i].position.z > 1){
			arr[i].material.opacity -= 0.02;
		}

		arr[i].position.z += 0.03;
		arr[i].position.x += 0.05;
		arr[i].position.y += 0.01;
	}
}
var NUM_CUBES = 4;
var cubes = createCarousel(NUM_CUBES);

function changeBackground(arr, collection){
	for (var i = 0; i < arr.length; i++){
		var textureLoader = new THREE.TextureLoader();
		textureLoader.load('assets/carousels/' + collection + i + '.jpg', function(t){
			var url = t.image.currentSrc.split(".");
			var index = url[url.length - 2][url[url.length - 2].length-1];
		    arr[index].material.map = t;
		});
	}
}

function loadingBackground(arr){
	for (var i = 0; i < arr.length; i++){
		arr[i].material.map = THREE.ImageUtils.loadTexture('assets/carousels/loading.jpg');
	}
}

$(document).ready(function(){
	$('.project-entry').hover(function() {
		console.log("hover");
		$( this ).append( $("<span> &larr;</span>"));
		loadingBackground(cubes);
		changeBackground(cubes, $(this).attr('id'));
		
		$('#feature').fadeIn(500);
	}, function() {
		$( this ).find("span:last").remove();
		$('#feature').hide();
		loadingBackground(cubes);
	});
});

function render() {
	requestAnimationFrame(render);
	
	animateCarousel(cubes);

	renderer.render(scene, camera);
};
render();