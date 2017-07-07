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
		SM.animationTime = [1200, 2200, 3200];
		SM.power = .72;
		SM.revMin = 50;
		SM.revMax = 70;
		SM.slotHeight = document.getElementsByClassName(slotClassName)[0].clientHeight;
		SM.slotsContainers = document.getElementsByClassName(slotsContainerClassName);
		SM.numSlots = SM.slotsContainers[0].children.length - 1;
		SM.slotsContainerHeight = SM.slotHeight * SM.numSlots;
		SM.selectedSlotTops = []; // top of selected slots
		SM.startingSlotTops = [0, 0, 0];
		SM.startFrame = undefined;
		SM.pw = '';
		SM.sfxStart = new Audio('spin-sfx.mp4');
		SM.sfxWin = new Audio('win-sfx.mp4');

		SM.A = []; // quadratic constant A
		SM.B = []; // quadratic constant B
		SM.C = []; // quadratic constant C
		SM.D = []; // quadratic constant D

		document.getElementById(buttonId).addEventListener("click", SM.spin);
	},

	spin: function() {
		if (SM.startFrame !== undefined) return; // already spinning

		SM.requestSpin(function(res) {
			SM.pw = res.pw;

			for (let i = 0; i < 3; i++) {
				SM.selectedSlotTops[i] = res.selected[i] * -SM.slotHeight;
				let revs = (Math.random() * (SM.revMax - SM.revMin) + SM.revMin) | 0; // random number of revolutions

				// SM.C[i] = SM.selectedSlotTops[i] - revs * SM.slotsContainerHeight; // constant offset
				// SM.A[i] = (-SM.C[i] + SM.startingSlotTops[i]) / Math.pow(SM.animationTime[i], 2); // coefficient of x^2

				let S = SM.startingSlotTops[i];
				let E = SM.selectedSlotTops[i] - revs * SM.slotsContainerHeight;
				let R = E * SM.power;

				SM.A[i] = (8 * (2 * R - S - E)) / (3 * Math.pow(SM.animationTime[i], 3));
				SM.B[i] = -(64 * R - 38 * S - 26 * E) / (6 * Math.pow(SM.animationTime[i], 2));
				SM.C[i] = (-2 * (E + 7 * S - 8 * R)) / (3 * SM.animationTime[i]);
				SM.D[i] = S;

				SM.startingSlotTops[i] = SM.selectedSlotTops[i];

				console.log("y = " + SM.A[i] + "x^3 + " + SM.B[i] + "x^2 + " + SM.C[i] + "x + " + SM.D[i]);
			}
			SM.sfxStart.play();
			requestAnimationFrame(SM.animate);
		});
		
		if (JLIU.Util.isMobile()) {
			SM.sfxStart.play();
			SM.sfxStart.pause();
			SM.sfxWin.play();
			SM.sfxWin.pause();
		}
	},

	requestSpin: function(cb) {
		let xhr = new XMLHttpRequest();
		xhr.open("POST", "http://stg56.herokuapp.com/spin", true);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

		xhr.onreadystatechange = function () {
		    if (xhr.readyState === 4 && xhr.status === 200) {
		        cb(JSON.parse(xhr.responseText));
		    } // TODO : error check
		};

		xhr.send();
	},

	animate: function(ts) {
		if (!SM.startFrame) SM.startFrame = ts;
		let t = ts - SM.startFrame || 0;

		for (let i = 0; i < 3; i++) { // apply quadratic equation
			if (t >= SM.animationTime[i]) continue;
			let x = t;
			let y = SM.A[i] * Math.pow(x, 3) + SM.B[i] * Math.pow(x, 2) + SM.C[i] * x + SM.D[i];
			let top = y % SM.slotsContainerHeight | 0;

			SM.slotsContainers[i].style.top = top + "px";
		}

		if (t < SM.animationTime[0] || t < SM.animationTime[1] || t < SM.animationTime[2]) {
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
		setTimeout(function() { 
			SM.showWin(SM.pw);
			SM.pw = '';
		}, 1000);
		console.log("you win, pw is " + SM.pw);
	},

	showWin: function(pw) {
		let slotsContainer = document.getElementById("slots-container");
		slotsContainer.style["background-color"] = "green";

		document.getElementById("line").style.display = "none";
		document.getElementById("won").style.display = "flex";
		document.getElementById("win-text-pw").innerHTML = pw;

		SM.sfxWin.play();
	},
};
