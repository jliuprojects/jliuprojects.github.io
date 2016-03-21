var Branch = function (parent, topWidth, bottomWidth, growthSpeed, colour, dying, lifespan) {
	this.topWidth = topWidth;
	this.growthSpeed = growthSpeed;
	this.dying = dying;
	this.lifespan = lifespan;
	this.colour = colour;
	this.mesh = new THREE.Mesh(
		new THREE.CylinderGeometry(topWidth, bottomWidth, 1, 10), 
		new THREE.MeshBasicMaterial({color : colour})
	);
	this.mesh.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0.5, 0));
	this.mesh.geometry.dynamic = true;
	this.mesh.geometry.verticesNeedUpdate = true;
	this.mesh.position.y = -300;

	parent.add(this.mesh);
};

Branch.prototype.grow = function () {
	var self = this;
	if (this.dying) {
		if (this.lifespan > 0) {
			this.lifespan--;
		} else {
			return;
		}
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

Branch.prototype.kill = function (lifespan) {
	this.dying = true;
	this.lifespan = lifespan;
};

/////////////////////////////////////////////////////////////////////////////
var MAX_GENS = 8;
var BASE_SPEED = 1.1;
var GEN_WIDTHS = [
	[5, 5],
	[4, 4],
	[4, 3],
	[3, 2],
	[2, 2],
	[2, 1],
	[1, 1],
	[1, 1]
];
var Tree = function (scene) {
	this.bending = 0;
	// trunk is first generation
	this.generations = [[new Branch(
		scene,
		GEN_WIDTHS[0][1], 
		GEN_WIDTHS[0][0], 
		BASE_SPEED, 
		"rgb(128, 64, 0)",
		false,
		0
	)]];
};

Tree.prototype.grow = function () {
	// only grow last generation up to MAX_GENS
	if (this.generations.length < MAX_GENS) {
		this.generations[this.generations.length - 1].forEach(function (branch) {
			branch.grow();
		});
		if (Math.random() < 0.02 + 0.2 * (this.generations.length - 1)) {
			var i = randomIntFromInterval(0, this.generations[this.generations.length-1].length - 1);
			this.bendBranch(i);
		}
	}
};

Tree.prototype.getRandomGrowthSpeed = function () {
	return BASE_SPEED - Math.random() * this.generations.length / MAX_GENS;
};

Tree.prototype.getRandomDirection = function (index) {
	var x, z;
	var baseAngle = Math.PI/4;
	var factor = 0.5;
	switch (index) {
		case 0:
			x = randomFloatFromInterval(baseAngle - (this.generations.length - 1)*factor, baseAngle + (this.generations.length - 1)*factor);
			z = randomFloatFromInterval(baseAngle - (this.generations.length - 1)*factor, baseAngle + (this.generations.length - 1)*factor);
			break;
		case 1:
			x = randomFloatFromInterval(-baseAngle - (this.generations.length - 1)*factor, -baseAngle + (this.generations.length - 1)*factor);
			z = randomFloatFromInterval(-baseAngle - (this.generations.length - 1)*factor, -baseAngle + (this.generations.length - 1)*factor);
			break;
		case 2:
			x = randomFloatFromInterval(-Math.PI/2 - (this.generations.length - 1)*factor, Math.PI/2 + (this.generations.length - 1)*factor);
			z = randomFloatFromInterval(-Math.PI/2 - (this.generations.length - 1)*factor, Math.PI/2 + (this.generations.length - 1)*factor);
			break;		

	}
	return {x : x, z : z};
};

Tree.prototype.getBranchColour = function () {
	var r = Math.min(128, 128 + this.generations.length * 8) ;
	var g = Math.min(255, 64 - this.generations.length * 9);
	var b = 0;

	return "rgb(" + r + "," + g + "," + b + ")";
};

Tree.prototype.splitBranches = function () {
	var numGens = this.generations.length;
	if (numGens == MAX_GENS) {
		return;
	}

	var self = this;
	var currGenBranches = this.generations[numGens - 1];
	var nextGenBranches = [];
	currGenBranches.forEach(function (branch) {
		if (branch.dying) {
			if (branch.lifespan > 0) {
				nextGenBranches.push(branch);
			}
		} else {
			branch.kill(Math.floor(Math.random() * 60) + 60);
			nextGenBranches.push(branch);

			var numChildren = randomIntFromInterval(2, 3);
			for (var i = 0; i < numChildren; i++) {
				nextGenBranches.push(new Branch(
					branch.mesh, 
					GEN_WIDTHS[numGens][1], 
					GEN_WIDTHS[numGens][0], 
					self.getRandomGrowthSpeed(), 
					self.getBranchColour(),
					false,
					0
				));
				nextGenBranches[nextGenBranches.length - 1].mesh.position.y = branch.getHeight();
				var dir = self.getRandomDirection(i);
				nextGenBranches[nextGenBranches.length - 1].mesh.rotation.z = dir.z;
				nextGenBranches[nextGenBranches.length - 1].mesh.rotation.x = dir.x;
			}
		}
	});
	this.generations.push(nextGenBranches);
};

Tree.prototype.bendBranch = function (i) {
	var currGen = this.generations.length - 1;
	var oldBranch = this.generations[currGen][i];
	if (oldBranch.dying) {
		return;
	}

	var newBranch = new Branch(
		oldBranch.mesh, 
		oldBranch.topWidth, 
		oldBranch.topWidth, 
		oldBranch.growthSpeed, 
		oldBranch.colour, 
		false, 
		0);
	newBranch.mesh.position.y = oldBranch.getHeight();
	newBranch.mesh.rotation.z = randomFloatFromInterval(-0.2, 0.2);
	newBranch.mesh.rotation.x = randomFloatFromInterval(-0.2, 0.2);
	this.generations[currGen][i] = newBranch;
};

function randomFloatFromInterval (min, max) {
    return Math.random()*(max-min)+min;
};

function randomIntFromInterval (min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
};