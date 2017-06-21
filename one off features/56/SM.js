var SM = {
	run: function(slotsContainerClassName, slotClassName, buttonId) {
		if (SM.exists === true) {
			console.log("there is already an SM");
			return;
		}

		SM.exists = true;
		SM.init(slotsContainerClassName, slotClassName, buttonId);
	},

	init: function(slotsContainerClassName, slotClassName, buttonId) {
		SM.animationTime = 8000;
		SM.slotHeight = document.getElementsByClassName(slotClassName)[0].clientHeight;
		SM.slotsContainers = document.getElementsByClassName(slotsContainerClassName);
		SM.numSlots = SM.slotsContainers[0].children.length - 1;
		SM.slotsContainerHeight = SM.slotHeight * SM.numSlots;
		SM.selectedSlotTops = []; // top of selected slots
		SM.startingSlotTops = [0, 0, 0];
		SM.startFrame = undefined;

		SM.C = []; // quadratic constant C
		SM.A = []; // quadratic constant A

		document.getElementById(buttonId).addEventListener("click", SM.spin);
	},

	spin: function() {
		if (SM.startFrame !== undefined) return; // already spinning

		for (let i = 0; i < 3; i++) {
			SM.selectedSlotTops[i] = (Math.random() * SM.numSlots | 0) * -SM.slotHeight; // randomly select landing icon
			let revs = Math.random() * 10 + 4 | 0; // random number of revolutions

			SM.C[i] = SM.selectedSlotTops[i] - revs * SM.slotsContainerHeight; // constant offset
			SM.A[i] = (-SM.C[i] + SM.startingSlotTops[i]) / Math.pow(SM.animationTime, 2); // coefficient of x^2

			SM.startingSlotTops[i] = SM.selectedSlotTops[i];
		}

		requestAnimationFrame(SM.animate);
	},

	animate: function(ts) {
		if (!SM.startFrame) SM.startFrame = ts;
		let t = ts - SM.startFrame || 0;

		for (let i = 0; i < 3; i++) { // apply quadratic equation
			let x = t - SM.animationTime;
			let y = SM.A[i] * Math.pow(x, 2) + SM.C[i];
			let top = y % SM.slotsContainerHeight | 0;

			SM.slotsContainers[i].style.top = top + "px";
		}

		if (t < SM.animationTime) {
			requestAnimationFrame(SM.animate);
		} else {
			SM.startFrame = undefined;
			SM.check();
		}
	},

	check: function() {
		for (let i = 0; i < 3; i++) {
			if (SM.selectedSlotTops[0] !== SM.selectedSlotTops[i]) {
				console.log("you lose");
				return;
			}	
		}
		console.log("you win");
	}
};