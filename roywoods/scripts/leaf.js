var Leaf = function (parent) {
	this.mesh = new THREE.Mesh(
		new THREE.CylinderGeometry(2, 2, 2, 10), 
		new THREE.MeshLambertMaterial({color : "green"})
	);
	this.mesh.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 1, 0));
	this.mesh.geometry.dynamic = true;
	this.mesh.geometry.verticesNeedUpdate = true;
	this.mesh.position.y = -300;
	this.mesh.matrixWorldNeedsUpdate = true;

	parent.add(this.mesh);
};

Leaf.prototype.grow = function () {
	var m = new THREE.Matrix4();
	var inverse = new THREE.Matrix4();
	m.makeTranslation(0, -1, 0);
	inverse.getInverse(this.mesh.matrixWorld);
	inverse.multiply(m);
	inverse.multiply(this.mesh.matrixWorld);
	this.mesh.applyMatrix(inverse);
};

Leaf.prototype.setGrowthSpeed = function (growthSpeed) {
	this.growthSpeed = growthSpeed;
};

Leaf.prototype.getHeight = function () {
	return this.mesh.geometry.vertices[0].y;
};
