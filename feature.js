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