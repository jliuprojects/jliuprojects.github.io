var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var W = 350;
var H = 450;


canvas.height = H; 
canvas.width = W;

var ball = {};
var gravity = 0.2;
var	bounceFactor = 0.7;
var balls = [];

function Ball(x, y) {
	this.x = x;
	this.y = y;
	
	this.radius = 15;
	this.color = "red";
	
	this.vx = 0;
	this.vy = 1;
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
			// First, reposition the ball on top of the floor and then bounce it!
			ball.y = H - ball.radius;
			ball.vy *= -bounceFactor;
		}
	});
};

canvas.addEventListener("click", function(e) {
	console.log(e);
	var x = e.x - (window.innerWidth/2 - W/2);
	var y = e.y;
	balls.push(new Ball(x, y));
	// alert("ASDF");
});

setInterval(update, 1000/60);


