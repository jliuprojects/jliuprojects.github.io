var heightSoFar = 0;
function Set(index, imgs, title, description, last){
	var imgshtml = '';
	for (var i = 0; i < imgs.length; i++){
		imgshtml += "<img class='project-img' src=" + imgs[i] + ">";
	}

	this.text = $("<div class='project-container'>" + 
					"<div class='project-metadata'><div class='project-title'>" + 
					title + 
					"</div><div class='project-description'>" + 
					description + 
					"</div><div class='project-launch'>Launch Site</div></div>" +
					imgshtml + "</div>");

	$('#work-container').append(this.text);
	this.text.width(this.text.width() + 490 + window.innerHeight + (window.innerWidth * 0.4));

	this.text.attr( "data-" + heightSoFar, "transform: translate(0px, 0px)");
	if (index){
		this.text.attr( "data-" + (heightSoFar + window.innerHeight), "transform: translate(0px, -" + window.innerHeight + "px)");
		this.text.attr( "data-" + (heightSoFar + this.text.width() - window.innerWidth), "transform: translate(" + (-1*(this.text.width() - window.innerWidth -  window.innerHeight)) + "px" + ", -" + window.innerHeight + "px)");
		if (!last){
			this.text.attr( "data-" + (heightSoFar + this.text.width() - window.innerWidth + window.innerHeight), "transform: translate(" + (-1*(this.text.width() - window.innerWidth -  window.innerHeight)) + "px" + ", -" + window.innerHeight*2 + "px)");
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
sets.push(new Set(sets.length,["assets/kid.png","assets/kid.png","assets/kid.png"], "Kid Studio", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ", true));

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
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 1000);
var mouse_pixels = {x:0,y:0};
var renderer = new THREE.WebGLRenderer({alpha:true});
renderer.setSize(window.innerWidth - 1, window.innerHeight - 1);
renderer.setClearColor( 0x000000, 0 );	
camera.position.z = 10;

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

window.addEventListener( 'mousemove', onMouseMove, false );

function onMouseMove( event ) {
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
	mouse_pixels.x = event.clientX;
	mouse_pixels.y = event.clientY;
}

document.getElementById('about-container').appendChild(renderer.domElement);

var tetrahedron = new THREE.Mesh(new THREE.TetrahedronGeometry(6,0), new THREE.MeshBasicMaterial({transparent: true, opacity: 1, color: 0x000000, wireframe: true}));
var dodecahedron = new THREE.Mesh(new THREE.DodecahedronGeometry(4,0), new THREE.MeshBasicMaterial({transparent: true, opacity: 1, color: 0x000000, wireframe: true}));
var octahedron = new THREE.Mesh(new THREE.OctahedronGeometry(4,0), new THREE.MeshBasicMaterial({transparent: true, opacity: 1, color: 0x000000, wireframe: true}));

tetrahedron.position.x = 7;
tetrahedron.position.y = 3;

dodecahedron.position.x = -1;
dodecahedron.position.y = -3;

octahedron.position.x = -7;
octahedron.position.y = 4;
// octahedron.position.z = -5;

scene.add(tetrahedron);
scene.add(dodecahedron);
scene.add(octahedron);


function render() {
	requestAnimationFrame(render);
	tetrahedron.rotation.x += 0.003;
	tetrahedron.rotation.y += 0.003;
	tetrahedron.rotation.z += 0.003;

	dodecahedron.rotation.x -= 0.003;
	dodecahedron.rotation.y -= 0.003;
	dodecahedron.rotation.z -= 0.003;

	octahedron.rotation.x += 0.003;
	octahedron.rotation.y -= 0.003;
	octahedron.rotation.z += 0.003;

	// update the picking ray with the camera and mouse position	
	raycaster.setFromCamera( mouse, camera );	

	// calculate objects intersecting the picking ray
	var intersects = raycaster.intersectObjects( scene.children );

	for ( var i = 0; i < intersects.length; i++ ) {
		intersects[i].object.userData.mouseoverEnterPosx = mouse_pixels.x;
		intersects[i].object.userData.mouseoverEnterPosy = mouse_pixels.y; 
		setTimeout(function(){ 
			for ( var i = 0; i < intersects.length; i++ ) {
				intersects[i].object.rotation.x += (mouse_pixels.x - intersects[i].object.userData.mouseoverEnterPosx)/10;
				intersects[i].object.rotation.y += (mouse_pixels.y - intersects[i].object.userData.mouseoverEnterPosy)/10;
			}
		}, 100);
	}



	renderer.render(scene, camera);
};
render();

