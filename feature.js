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

function Carousel (scene, len, posx, posy, posz, posxFactor, posyFactor, poszFactor, roty) {
	this.posxFactor = posxFactor || -5;
	this.posyFactor = posyFactor || -1;
	this.poszFactor = poszFactor || -3;
	this.roty = roty || 0.25;
	this.posx = posx || 0;
	this.posy = posy || 0;
	this.posz = posz || 0;
	this.contents = [];
	for (var i = 0; i < len; i++){
		this.contents[i] = new THREE.Mesh(new THREE.BoxGeometry(13, 9, 0), new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture('assets/carousels/loading.jpg'), transparent: true, opacity: 1, color: 0xffffff}));
		this.contents[i].material.needsUpdate = true;

		scene.add(this.contents[i]);
		this.contents[i].position.x = this.posxFactor*i + this.posx;
		this.contents[i].position.y = this.posyFactor*i + this.posy;
		this.contents[i].position.z = this.poszFactor*i + this.posz;
		this.contents[i].rotation.y = this.roty;
	}

	var self = this;
	this.animate = function (maxz, x, y, z) {
		for (var i = 0; i < this.contents.length; i++){
			if (this.contents[i].position.z > maxz){
				this.contents[i].position.x = this.posx + this.posxFactor * (this.contents.length - 1);
				this.contents[i].position.y = this.posy + this.posyFactor * (this.contents.length - 1);
				this.contents[i].position.z = this.posz + this.poszFactor * (this.contents.length - 1);
			}

			if (this.contents[i].position.z > (this.posz + this.poszFactor * (this.contents.length - 1)) && this.contents[i].position.z < this.posz){
				if(this.contents[i].material.opacity <= 1){
					this.contents[i].material.opacity += 0.02;
				}
			}

			if (this.contents[i].position.z > this.posz + 1){
				this.contents[i].material.opacity -= 0.02;
			}

			
			this.contents[i].position.x += x;
			this.contents[i].position.y += y;
			this.contents[i].position.z += z;
		}
	};

	this.bgLock = false;

	this.loadBackground = function (collection, callback) {
		for (var i = 0; i < this.contents.length; i++){
			var textureLoader = new THREE.TextureLoader();
			textureLoader.load('assets/carousels/' + collection + i + '.jpg', callback);
		}
	};

	this.setLoadingBg = function (){
		for (var i = 0; i < this.contents.length; i++){
			this.contents[i].material.map = THREE.ImageUtils.loadTexture('assets/carousels/loading.jpg');
		}
	}
}

var NUM_CUBES = 4;
var cubes = new Carousel(scene, NUM_CUBES);
// var cubes1 = new Carousel(scene, NUM_CUBES, 0, -5, 3, 5, 1, -3, -0.25);
var collection;
$(document).ready(function(){
	$('.project-entry').hover(function() {

		if ($(this).attr('id') == 'kid'){
			$( this ).append( $("<span> &larr; link currently unavailable</span>"));
		}else{
			$( this ).append( $("<span> &larr;</span>"));
		}
		
		collection = $(this).attr('id');
		cubes.setLoadingBg();

		cubes.loadBackground($(this).attr('id'), function (t){
			var url = t.image.currentSrc.split(".");
			var index = url[url.length - 2][url[url.length - 2].length-1];
			var temp = url[url.length-2].split("/")[url[url.length-2].split("/").length-1];
			temp = temp.substring(0, temp.length - 1);
			if (temp == collection){
				cubes.contents[index].material.map = t;
			}
		});

		$('#feature').fadeIn(500);
	}, function() {
		$( this ).find("span:last").remove();
		$('#feature').hide();

		cubes.setLoadingBg();
	});
});

function render() {
	requestAnimationFrame(render);
	
	cubes.animate(3, 0.05, 0.01, 0.03);
	// cubes1.animate(6, -0.05, -0.01, 0.03);

	renderer.render(scene, camera);
};
render();