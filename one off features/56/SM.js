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
		SM.totalFrames = [1.2 * 60, 2.2 * 60, 3.2 * 60];
		SM.power = .72;
		SM.revMin = 50;
		SM.revMax = 70;
		SM.slotHeight = document.getElementsByClassName(slotClassName)[0].clientHeight;
		SM.slotsContainers = document.getElementsByClassName(slotsContainerClassName);
		SM.numSlots = SM.slotsContainers[0].children.length - 1;
		SM.slotsContainerHeight = SM.slotHeight * SM.numSlots;
		SM.selectedSlotTops = []; // top of selected slots
		SM.startingSlotTops = [0, 0, 0];
		SM.frames = undefined;
		SM.pw = '';
		SM.sfxStart = new Audio('spin-sfx.mp4');
		SM.sfxWin = new Audio('win-sfx.mp4');

		SM.A = []; // quadratic constant A
		SM.B = []; // quadratic constant B
		SM.C = []; // quadratic constant C
		SM.D = []; // quadratic constant D

		let visibilityChange, hidden;
		if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support 
			hidden = "hidden";
			visibilityChange = "visibilitychange";
		} else if (typeof document.msHidden !== "undefined") {
			hidden = "msHidden";
			visibilityChange = "msvisibilitychange";
		} else if (typeof document.webkitHidden !== "undefined") {
			hidden = "webkitHidden";
			visibilityChange = "webkitvisibilitychange";
		}
		document.addEventListener(visibilityChange, function() {
			if (isNaN(SM.frames)) return;

			if (document[hidden]) {
				SM.sfxStart.pause();
			} else {
				SM.sfxStart.play();
			}
		});

		document.getElementById(buttonId).addEventListener("click", SM.spin);
	},

	spin: function() {
		if (SM.frames !== undefined) return; // already spinning

		SM.requestSpin(function(res) {
			SM.pw = res.pw;

			for (let i = 0; i < 3; i++) {
				SM.selectedSlotTops[i] = res.selected[i] * -SM.slotHeight;
				let revs = (Math.random() * (SM.revMax - SM.revMin) + SM.revMin) | 0; // random number of revolutions

				let S = SM.startingSlotTops[i];
				let E = SM.selectedSlotTops[i] - revs * SM.slotsContainerHeight;
				let R = E * SM.power;

				SM.A[i] = (8 * (2 * R - S - E)) / (3 * Math.pow(SM.totalFrames[i], 3));
				SM.B[i] = -(64 * R - 38 * S - 26 * E) / (6 * Math.pow(SM.totalFrames[i], 2));
				SM.C[i] = (-2 * (E + 7 * S - 8 * R)) / (3 * SM.totalFrames[i]);
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
		if (isNaN(SM.frames)) SM.frames = 0;
		let f = SM.frames;

		for (let i = 0; i < 3; i++) { // apply cubic
			if (f >= SM.totalFrames[i]) continue;
			let y = SM.A[i] * Math.pow(f, 3) + SM.B[i] * Math.pow(f, 2) + SM.C[i] * f + SM.D[i];
			let top = y % SM.slotsContainerHeight | 0;

			SM.slotsContainers[i].style.top = top + "px";
		}

		if (f < SM.totalFrames[0] || f < SM.totalFrames[1] || f < SM.totalFrames[2]) {
			SM.frames++;
			requestAnimationFrame(SM.animate);
		} else {
			SM.frames = undefined;
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
