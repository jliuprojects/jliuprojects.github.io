var MAX_GENS = 8;
var BASE_SPEED = 1.1;
var GEN_WIDTHS = [[5, 5], [4, 4], [4, 3], [3, 2], [2, 2], [2, 1], [1, 1], [1, 0]];

var Tree = function (scene) {
	this.bending = 0;
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
		1, 
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