var W = 350;
var H = 450;

var ball = null;
var gravity = 0.2;
var	bounceFactor = 0.7;
var balls = [];

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.height = H; 
canvas.width = W;

function clearCanvas() {
	ctx.clearRect(0, 0, W, H);
};

function update() {
	clearCanvas();

	if (ball != null) {
		ctx.beginPath();
		ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2, false);
		ctx.fillStyle = "red";
		ctx.fill();
		ctx.closePath();

		ball.y += ball.vy;
		ball.vy += gravity;

		if (ball.y + ball.radius > H) {
			ball.y = H - ball.radius;
			ball.vy *= -bounceFactor;
		}
	}
};

canvas.addEventListener("click", function(e) {
	ball = {
		x : e.x - (window.innerWidth/2 - W/2),
		y : e.y,
		radius : 15,

		vx : 0,
		vy : 1
	};
});

setInterval(update, 1000/60);
