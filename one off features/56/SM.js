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
		SM.animationTime = 3000;
		SM.slotHeight = document.getElementsByClassName(slotClassName)[0].clientHeight;
		SM.slotsContainers = document.getElementsByClassName(slotsContainerClassName);
		SM.numSlots = SM.slotsContainers[0].children.length - 1;
		SM.slotsContainerHeight = SM.slotHeight * SM.numSlots;
		SM.spinSpeeds = [];
		SM.selectedSlots = [];
		SM.lastFrame = undefined;

		document.getElementById(buttonId).addEventListener("click", SM.spin);
	},

	spin: function() {
		console.log("trying to spin");
		if (SM.lastFrame !== undefined) return; // already spinning

		for (let i = 0; i < SM.numSlots; i++) {
			SM.spinSpeeds[i] = Math.random() + 1;	
			SM.selectedSlots[i] = Math.random() * SM.numSlots | 0;
		}

		SM.animate();
	},

	animate: function(ts) {
		if (!SM.lastFrame) SM.lastFrame = ts;
		let t = ts - SM.lastFrame || 0;

		for (let i = 0; i < SM.numSlots; i++) {
			let coef = SM.spinSpeeds[i] / SM.animationTime / 2;
			let tLeft = SM.animationTime - t;
			let selectedOffset = SM.selectedSlots[i] * SM.slotHeight;// * (t / SM.animationTime);
			let dist = (coef * tLeft * tLeft + selectedOffset) % SM.slotsContainerHeight | 0;
			SM.slotsContainers[i].style.top = -dist + "px";
		}

		if (t < SM.animationTime) {
			requestAnimationFrame(SM.animate);
		} else {
			SM.lastFrame = undefined;
			SM.check();
		}
	},

	check: function() {
		for (let i = 0; i < SM.numSlots; i++) {
			if (SM.selectedSlots[0] !== SM.selectedSlots[i]) {
				console.log("you lose");
				return;
			}	
		}
		console.log("you win");
	}
};