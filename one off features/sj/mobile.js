var Mobile = {
	run: function() {
		console.log("running Mobile version");
		Mobile.init();
		Mobile.animate();
	},

	init: function() {
		Mobile.camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 10000);
		Mobile.camera.position.z = 400;
		Mobile.scene = new THREE.Scene();
		Mobile.scene.fog = new THREE.FogExp2(0xffffff, 0.001);
		Mobile.plane = Mobile.createPlane(Mobile.scene);
		Mobile.posts = Mobile.createPosts(POST_URLS, Mobile.scene);
		Mobile.renderer = JLIU.Util.Three.createRenderer(0xffffff, document.getElementById('container'));
		Mobile.yDown = null;
		Mobile.yDiff = 0;
		Mobile.attachListeners();
		JLIU.Util.forceTopOnRefresh();
	},

	createPosts: function(urls, scene) {
		let posts = [];
		for (let i = 0; i < urls.length; i++) {
			let texture = new THREE.TextureLoader().load(urls[i]);
			let geometry = new THREE.BoxBufferGeometry(IMG_WIDTH, IMG_HEIGHT, 0);
			let material = new THREE.MeshBasicMaterial({map: texture, transparent: true, opacity: 1});
			posts.push(new THREE.Mesh(geometry, material));
			posts[i].postId = i;
			posts[i].position.z = -i * POST_GAP_Z;
			posts[i].position.x = -(i % 2) * POST_GAP_X + POST_OFFSET_X;
			scene.add(posts[i]);
		}
		return posts;
	},

	createPlane: function (scene) {
		let geo = new THREE.PlaneBufferGeometry(1500, 6000, 20, 60);
		let mat = new THREE.MeshBasicMaterial({color: 0x000000, side: THREE.DoubleSide, wireframe: true});
		let plane = new THREE.Mesh(geo, mat);
		plane.position.set(0, -IMG_HEIGHT / 2, 0);
		plane.rotateX(Math.PI / 2);
		scene.add(plane);
		return plane;
	},

	attachListeners: function() {
		document.addEventListener('touchstart', Mobile.handleTouchStart, false, {passive: false});        
		document.addEventListener('touchmove', Mobile.handleTouchMove, false, {passive: false});
	},

	handleTouchStart: function (evt) {
	    Mobile.yDown = evt.touches[0].clientY;                            
	},

	handleTouchMove: function (evt) {
	    if (!Mobile.yDown) return;
	               
	    let yUp = evt.touches[0].clientY;
	    Mobile.yDiff = Mobile.yDown - yUp;
	    Mobile.yDiff *= 3;
	    console.log(Mobile.yDiff)
	    // let dir = Mobile.yDiff > 0 ? 1 : -1;
	    Mobile.yDown = yUp;

		if (Mobile.scrollDisabled) evt.preventDefault();
	},
	animate: function () {
		if (!Mobile.scrollDisabled && document.body.scrollTop <= 0) {
			Mobile.scrollDisabled = true;
			Mobile.yDiff = Mobile.yDiff < 0 ? Math.max(Mobile.yDiff, -30) : Math.min(Mobile.yDiff, 30);
		}
		if (Mobile.posts[Mobile.posts.length - 1].position.z >= 0 && Mobile.yDiff > 0) Mobile.scrollDisabled = false;

		if (Mobile.scrollDisabled && Math.abs(Mobile.yDiff) > 0) Mobile.animatePosts();

		requestAnimationFrame(Mobile.animate);
		Mobile.renderer.render(Mobile.scene, Mobile.camera);
	},

	animatePosts: function () {
		// if (Mobile.posts[0].position.z < -POST_GAP_Z && dir === -1) return;

		for (let i = 0; i < Mobile.posts.length; i++) {
			Mobile.posts[i].position.z += Mobile.yDiff;
			// if (-POST_GAP_Z <= Mobile.posts[i].position.z && Mobile.posts[i].position.z <= 0) Mobile.posts[i].material.opacity += dir * POST_SCROLL_SPEED_OPC;
		}

		Mobile.plane.position.z += Mobile.yDiff;
		Mobile.yDiff /= 1.1;
	}
}