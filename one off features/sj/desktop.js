var Desktop = {
	run: function() {
		console.log("running Desktop version");
		Desktop.init();
		Desktop.animate();
	},

	init: function() {
		Desktop.camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 10000);
		Desktop.camera.position.z = 400;
		Desktop.scene = new THREE.Scene();
		Desktop.scene.fog = new THREE.FogExp2(0xffffff, 0.001);
		Desktop.plane = Desktop.createPlane(Desktop.scene);
		Desktop.postDetails = [];
		Desktop.posts = Desktop.createPosts(POST_URLS, Desktop.scene);
		Desktop.renderer = JLIU.Util.Three.createRenderer(0xffffff, document.getElementById('container'));
		Desktop.raycaster = new THREE.Raycaster();
		Desktop.mouse = new THREE.Vector2();
		Desktop.loadingFrames = 60;
		Desktop.scrollDisabled = true;
		Desktop.disableScroll();
		Desktop.attachListeners();
		JLIU.Util.forceTopOnRefresh();
	},

	attachListeners: function() {
		window.addEventListener('resize', JLIU.Util.Three.onWindowResize, false);
		window.addEventListener('wheel', Desktop.onWindowWheel, true);
		window.addEventListener('mousemove', Desktop.onMouseMove, false);
	},

	createPosts: function(urls, scene) {
		let posts = [];
		for (let i = 0; i < urls.length; i++) {
			let texture = new THREE.TextureLoader().load(urls[i]);
			let geometry = new THREE.BoxBufferGeometry(IMG_WIDTH, IMG_HEIGHT, 0);
			let material = new THREE.MeshBasicMaterial({map: texture, transparent: true, opacity: i === 0 ? 1 : POST_OPC_FADED});
			posts.push(new THREE.Mesh(geometry, material));
			posts[i].postId = i;
			posts[i].position.z = -i * POST_GAP_Z;
			posts[i].position.x = -(i % 2) * POST_GAP_X + POST_OFFSET_X;
			scene.add(posts[i]);

			// create html on-hover text
			let div = document.createElement("div");
			div.classList.add("post-desc");
			div.style.left = i % 2 === 0 ? "10vw" : "65vw";
			div.innerHTML = POST_DESCS[i];
			document.body.appendChild(div);
			Desktop.postDetails.push(div);
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

	disableScroll: function () {
		JLIU.Util.disableScroll();
		Desktop.scrollDisabled = true;
	},

	enableScroll: function () {
		JLIU.Util.enableScroll();
		Desktop.scrollDisabled = false;

		for (let i = 0; i < Desktop.posts.length; i++) {
			if (Desktop.postDetails[i].style.opacity === "1") {
				Desktop.postDetails[i].style.opacity = 0;
			}
		}
	},

	onWindowWheel: function (e) {
		let dir = e.wheelDelta < 0 ? 1 : -1; // 1 = down , -1 = up
		Desktop.animatePosts(dir);
	},

	onMouseMove: function (e) {
		Desktop.mouse.x = (e.clientX / window.innerWidth) * 2 - 1; // for raycasting 
		Desktop.mouse.y = - (e.clientY / window.innerHeight) * 2 + 1; // for raycasting 
	},

	animate: function () {
		if (isNaN(Desktop.loadingFrames) || Desktop.loadingFrames > 0) {
			isNaN(Desktop.loadingFrames) ? Desktop.loadingFrames = 60 : Desktop.loadingFrames--;
		} else if (Desktop.scrollDisabled) {
			Desktop.handlePostHover();
		}

		requestAnimationFrame(Desktop.animate);
		Desktop.renderer.render(Desktop.scene, Desktop.camera);
	},

	handlePostHover: function () {
		Desktop.raycaster.setFromCamera(Desktop.mouse, Desktop.camera);
		let intersects = Desktop.raycaster.intersectObjects(Desktop.scene.children);
		let hoverId = -1;

		for (let i = 0; i < intersects.length; i++) {
			let id = intersects[i].object.postId;
			if (id === undefined || POST_GAP_Z / 2 < Desktop.posts[id].position.z || Desktop.posts[id].position.z < -POST_GAP_Z / 4) continue;
			hoverId = id;

			let hoverDesc = Desktop.postDetails[hoverId];
			if (hoverDesc.style.opacity === "" || hoverDesc.style.opacity === "0") {
				hoverDesc.style.opacity = 1;
			}
			break;
		}

		for (let i = 0; i < Desktop.posts.length; i++) {
			if (Desktop.postDetails[i].style.opacity === "1" && hoverId !== i) {
				Desktop.postDetails[i].style.opacity = 0;
			}
		}
	},

	animatePosts: function (dir) {
		if (Desktop.scrollDisabled) {
			if (Desktop.posts[0].position.z < -POST_GAP_Z && dir === -1) return;

			for (let i = 0; i < Desktop.posts.length; i++) {
				Desktop.posts[i].position.z += dir * POST_SCROLL_SPEED_Z;
				if (-POST_GAP_Z <= Desktop.posts[i].position.z && Desktop.posts[i].position.z <= 0) Desktop.posts[i].material.opacity += dir * POST_SCROLL_SPEED_OPC;
			}

			Desktop.plane.position.z += dir * POST_SCROLL_SPEED_Z;

			if (Desktop.posts[Desktop.posts.length - 1].position.z >= 0) {
				Desktop.enableScroll();
			}
		} else if (window.scrollY === 0 && dir === -1) {
			Desktop.disableScroll();
		}
	}
}