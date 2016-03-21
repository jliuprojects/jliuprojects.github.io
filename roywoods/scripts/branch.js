var Branch = function (parent, topWidth, bottomWidth, growthSpeed, colour, dying, lifespan) {
	this.topWidth = topWidth;
	this.growthSpeed = growthSpeed;
	this.dying = dying;
	this.lifespan = lifespan;
	this.colour = colour;
	this.mesh = new THREE.Mesh(
		new THREE.CylinderGeometry(topWidth, bottomWidth, 1, 10), 
		new THREE.MeshPhongMaterial({color : colour})
	);
	this.mesh.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0.5, 0));
	this.mesh.geometry.dynamic = true;
	this.mesh.geometry.verticesNeedUpdate = true;
	this.mesh.position.y = -300;

	parent.add(this.mesh);
};

Branch.prototype.grow = function () {
	if (this.dying && this.lifespan === 0) {
		return;
	} else if (this.dying && this.lifespan > 0) {
		this.lifespan--;
	}

	this.mesh.geometry.verticesNeedUpdate = true;
	this.mesh.geometry.vertices[this.mesh.geometry.vertices.length - 2].y += this.growthSpeed;
	for (var i = 0; i < this.mesh.geometry.vertices.length/2 - 1; i++) {
		this.mesh.geometry.vertices[i].y += this.growthSpeed;
	}
};

Branch.prototype.setGrowthSpeed = function (growthSpeed) {
	this.growthSpeed = growthSpeed;
};

Branch.prototype.getHeight = function () {
	return this.mesh.geometry.vertices[0].y;
};
