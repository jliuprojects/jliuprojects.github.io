var W = 350;
var H = 450;

var ball = {};
var gravity = 0.2;
var	bounceFactor = 0.7;
var balls = [];

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.height = H; 
canvas.width = W;

function Ball(x, y) {
	this.x = x;
	this.y = y;
	
	this.vx = 0;
	this.vy = 1;

	this.radius = 15;
	this.color = "red";
};

Ball.prototype.draw = function(ctx) {
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
	ctx.fillStyle = this.color;
	ctx.fill();
	ctx.closePath();
};

function clearCanvas() {
	ctx.clearRect(0, 0, W, H);
};

function update() {
	clearCanvas();

	balls.forEach(function(ball, index, array) {
		ball.draw(ctx);
		
		ball.y += ball.vy;
		ball.vy += gravity;

		if(ball.y + ball.radius > H) {
			ball.y = H - ball.radius;
			ball.vy *= -bounceFactor;
		}
	});
};

canvas.addEventListener("click", function(e) {
	var x = e.x - (window.innerWidth/2 - W/2);
	var y = e.y;
	balls.push(new Ball(x, y));
});

setInterval(update, 1000/60);
