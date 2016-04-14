var W = 350; // width of canvas
var H = 450; // height of canvas
var gravity = 0.2; // gravity on ball
var	bounceFactor = 0.7; // how hard the ball bounces

var canvas = document.getElementById("canvas"); // our canvas
var ctx = canvas.getContext("2d"); // context to draw on canvas
var ball = null; // our ball, initalize it to null

canvas.height = H; // set canvas height
canvas.width = W; // set canvas width

/* 
 * Clears the canvas
 */
function clearCanvas() {
	ctx.clearRect(0, 0, W, H);
};

/* 
 * Called every frame by setInterval
*/
function update() {
	clearCanvas();

	if (ball != null) { // make sure our ball isnt null

		ctx.beginPath(); // start drawing path
		ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2, false); // draw an arc that is a full circle
		ctx.fillStyle = "red"; // use red colour
		ctx.fill(); // use fill
		ctx.closePath(); // end drawing path

		ball.y += ball.vy; // increase y-position of ball by y-velocity 
		ball.vy += gravity; // increase y-velocity by y-accleration (aka gravity)

		if (ball.y + ball.radius > H) { // if ball hits the ground
			ball.y = H - ball.radius; // bounce ball up
			ball.vy *= -bounceFactor; // how hard it bounces up
		}
	}
};

canvas.addEventListener("click", function(e) { // adds an event listener to the canvas to listen for the click event 
	if (ball === null) { // if the ball is null (i.e the first time we clicked the canvas)
		ball = { 
			x : e.x - (window.innerWidth/2 - W/2), // ball starting x-position set to x-position of where you clicked
			y : e.y, // ball starting y-position set to y-position of where you clicked
			radius : 15, // radius of ball

			vx : 0, // velocity in x direction
			vy : 1 // velocity in y direction
		};
	}
});

setInterval(update, 1000/60); // calls update function once every 1000/60 seconds
