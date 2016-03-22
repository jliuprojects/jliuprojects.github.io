var MAX_GENS = 6;
var BASE_SPEED = 1/3 + 0.1;
var GEN_WIDTHS = [[5, 5], [4, 4], [4, 3], [3, 2], [2, 2], [2, 1], [1, 1], [1, 1]];

var Tree = function (scene) {
	this.bending = 0;
	this.generations = [[new Branch(
		scene, 
		GEN_WIDTHS[0][1], 
		GEN_WIDTHS[0][0], 
		BASE_SPEED, 
		this.getBranchColour(), 
		false,
		0
	)]];

	this.generations[0][0].mesh.position.y = -300;
};

Tree.prototype.growLeaves = function () {
	this.generations[this.generations.length - 1].forEach(function (leaf) {
		leaf.grow();
	});
};

Tree.prototype.grow = function () {
	if (this.generations.length < MAX_GENS) {
		this.generations[this.generations.length - 1].forEach(function (branch) {
			branch.grow();
		});
		if (Math.random() < 0.02 + 0.2 * (this.generations.length - 1)) {
			var i = randomIntFromInterval(0, this.generations[this.generations.length-1].length - 1);
			this.bendBranch(i);
		}
	} else {
		this.growLeaves();
	}
};

Tree.prototype.getRandomGrowthSpeed = function () {
	return BASE_SPEED - Math.random() * this.generations.length / MAX_GENS / 3;
};

Tree.prototype.getRandomDirection = function (index) {
	var x, z;
	var baseAngle = Math.PI/4.5;
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
			x = randomFloatFromInterval(-baseAngle - (this.generations.length - 1)*factor, -baseAngle + (this.generations.length - 1)*factor);
			z = randomFloatFromInterval(baseAngle - (this.generations.length - 1)*factor, baseAngle + (this.generations.length - 1)*factor);
			break;		

	}
	return {x : x, z : z};
};

Tree.prototype.getBranchColour = function () {
	var r = this.generations ? Math.min(255, 119 + this.generations.length * 17) : 119;
	var g = this.generations ? Math.max(0, 37 - this.generations.length * 5) : 37;
	var b = 18;

	return "rgb(" + r + "," + g + "," + b + ")";
};

Tree.prototype.createLeaves = function () {
	var self = this;
	var currGenBranches = this.generations[this.generations.length - 1];
	var leaves = [];
	currGenBranches.forEach(function (branch) {
		var leaf = new Leaf(branch.mesh);
		leaf.mesh.position.y = branch.getHeight() - 1;
		leaves.push(leaf);
	});
	this.generations.push(leaves);
};

Tree.prototype.splitBranches = function () {
	var numGens = this.generations.length;
	if (numGens === MAX_GENS) {
		this.createLeaves();
		return;
	} else if (numGens < MAX_GENS) {
		var self = this;
		var currGenBranches = this.generations[numGens - 1];
		var nextGenBranches = [];
		currGenBranches.forEach(function (branch) {
			if (branch.dying && branch.lifespan > 0) {
				nextGenBranches.push(branch);
			} else if (!branch.dying) {
				nextGenBranches.push(self.createDyingBranch(branch));

				var numChildren = randomIntFromInterval(2, 3);
				for (var i = 0; i < numChildren; i++) {
					var newBranch = new Branch(
						branch.mesh, 
						GEN_WIDTHS[numGens][1], 
						GEN_WIDTHS[numGens][0], 
						self.getRandomGrowthSpeed(), 
						self.getBranchColour(),
						false,
						0
					);
					var dir = self.getRandomDirection(i);
					newBranch.mesh.rotation.z = dir.z;
					newBranch.mesh.rotation.x = dir.x;
					newBranch.mesh.position.y = branch.getHeight();
					nextGenBranches.push(newBranch);
				}
			}
		});
		this.generations.push(nextGenBranches);
	}
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

Tree.prototype.createDyingBranch = function (oldBranch) {
	var newBranch = new Branch(
		oldBranch.mesh, 
		1.5 - this.generations.length/MAX_GENS, 
		oldBranch.topWidth, 
		oldBranch.growthSpeed, 
		oldBranch.colour, 
		true, 
		Math.floor(Math.random() * 60) + 60);
	newBranch.mesh.position.y = oldBranch.getHeight();
	newBranch.mesh.rotation.z = randomFloatFromInterval(-0.2, 0.2);
	newBranch.mesh.rotation.x = randomFloatFromInterval(-0.2, 0.2);
	return newBranch;
};

function randomFloatFromInterval(min, max) {
    return Math.random()*(max-min)+min;
};

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
};