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