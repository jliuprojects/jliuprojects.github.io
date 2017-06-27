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
		SM.animationTime = [4000, 4500, 5000];
		SM.power = 2;
		SM.revMin = 5;
		SM.revMax = 12;
		SM.slotHeight = document.getElementsByClassName(slotClassName)[0].clientHeight;
		SM.slotsContainers = document.getElementsByClassName(slotsContainerClassName);
		SM.numSlots = SM.slotsContainers[0].children.length - 1;
		SM.slotsContainerHeight = SM.slotHeight * SM.numSlots;
		SM.selectedSlotTops = []; // top of selected slots
		SM.startingSlotTops = [0, 0, 0];
		SM.startFrame = undefined;
		SM.pw = '';
		SM.sfxStart = new Audio('slots.mp3');

		SM.C = []; // quadratic constant C
		SM.A = []; // quadratic constant A

		document.getElementById(buttonId).addEventListener("click", SM.spin);
	},

	spin: function() {
		if (SM.startFrame !== undefined) return; // already spinning

		SM.requestSpin(function(res) {
			SM.pw = res.pw;

			for (let i = 0; i < 3; i++) {
				SM.selectedSlotTops[i] = res.selected[i] * -SM.slotHeight;
				let revs = (Math.random() * (SM.revMax - SM.revMin) + SM.revMin) | 0; // random number of revolutions

				SM.C[i] = SM.selectedSlotTops[i] - revs * SM.slotsContainerHeight; // constant offset
				SM.A[i] = (-SM.C[i] + SM.startingSlotTops[i]) / Math.pow(SM.animationTime[i], SM.power); // coefficient of x^2

				SM.startingSlotTops[i] = SM.selectedSlotTops[i];
			}

			requestAnimationFrame(SM.animate);
			SM.sfxStart.play();
		});
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

		xhr.send("numSlots=" + SM.numSlots); // TODO : hard code this on server after we know how many items per slot
	},

	animate: function(ts) {
		if (!SM.startFrame) SM.startFrame = ts;
		let t = ts - SM.startFrame || 0;

		for (let i = 0; i < 3; i++) { // apply quadratic equation
			if (t >= SM.animationTime[i]) continue;
			let x = t - SM.animationTime[i];
			let y = SM.A[i] * Math.pow(x, SM.power) + SM.C[i];
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
	},
};
