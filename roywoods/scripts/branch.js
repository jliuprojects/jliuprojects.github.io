var Branch = function (parent, topWidth, bottomWidth, growthSpeed, colour) {
	this.topWidth = topWidth;
	this.growthSpeed = growthSpeed;
	this.geometry = new THREE.CylinderGeometry(topWidth, bottomWidth, 1, 10);
	this.material = new THREE.MeshBasicMaterial({wireframe : true, color : colour});
	this.mesh = new THREE.Mesh(this.geometry, this.material);
	this.mesh.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0.5, 0));
	this.mesh.geometry.dynamic = true;
	this.mesh.geometry.verticesNeedUpdate = true;
	parent.add(this.mesh);
	console.log('branch created');
};

Branch.prototype.grow = function () {
	this.mesh.geometry.verticesNeedUpdate = true;
	for (var i = 0; i < this.mesh.geometry.vertices.length/2 - 1; i++) {
		this.mesh.geometry.vertices[i].y += this.growthSpeed;
	}
	this.mesh.geometry.vertices[this.mesh.geometry.vertices.length - 2].y += this.growthSpeed;
};

Branch.prototype.setGrowthSpeed = function (growthSpeed) {
	this.growthSpeed = growthSpeed;
};

Branch.prototype.getHeight = function () {
	return this.mesh.geometry.vertices[0].y;
};

/////////////////////////////////////////////////////////////////////////////

var Tree = function (scene) {
	// trunk is first generation
	this.generations = [[new Branch(scene, 40, 50, 2, 0x53350A)]];
};

Tree.prototype.grow = function () {
	// only grow last generation
	this.generations[this.generations.length - 1].forEach(function (branch) {
		branch.grow();
	});
	// this.generations[0][0].mesh.rotation.z += 0.01;
};

var BRANCHINGANGLES

Tree.prototype.splitBranches = function () {
	var currGenBranches = this.generations[this.generations.length - 1];
	var nextGenBranches = [];

	currGenBranches.forEach(function (branch) {
		nextGenBranches.push(new Branch(branch.mesh, branch.topWidth - 10, branch.topWidth, 1, 0xe0301e));
		nextGenBranches[nextGenBranches.length - 1].mesh.position.y = branch.getHeight();
		nextGenBranches.push(new Branch(branch.mesh, branch.topWidth - 10, branch.topWidth, 1, 0xe0301e));
		nextGenBranches[nextGenBranches.length - 1].mesh.position.y = branch.getHeight();

		var rotz = -Math.PI/4 + randomIntFromInterval(-0.35, 0.35); //randomIntFromInterval(-Math.PI/4, Math.PI/4);
		var rotx = -Math.PI/4 + randomIntFromInterval(-0.35, 0.35); //randomIntFromInterval(-Math.PI/4, Math.PI/4);

		nextGenBranches[nextGenBranches.length - 1].mesh.rotation.z = rotz;
		nextGenBranches[nextGenBranches.length - 1].mesh.rotation.x = rotx;

		nextGenBranches[nextGenBranches.length - 2].mesh.rotation.z = rotz < 0 ? rotz + Math.PI/2 : rotz - Math.PI/2;
		nextGenBranches[nextGenBranches.length - 2].mesh.rotation.x = rotx < 0 ? rotx + Math.PI/2 : rotx - Math.PI/2;
	});

	this.generations.push(nextGenBranches);
};

function randomIntFromInterval (min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}