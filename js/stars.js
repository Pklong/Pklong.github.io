var context;
var screenH;
var screenW;
var stars = [];
var fps = 50;
var numStars = 2000;


document.addEventListener('DOMContentLoaded', function() {

	function ResizeCanvas(e) {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}

	window.addEventListener('resize', ResizeCanvas, false);

	var canvas = document.getElementById('stars');
	screenW = window.innerWidth;
	screenH = window.innerHeight;

	// Fill out the canvas
	canvas.setAttribute('height', screenH);
	canvas.setAttribute('width', screenW);
	context = canvas.getContext('2d');

	// Create all the stars
	for (var i = 0; i < numStars; i++) {
		var x = Math.round(Math.random() * screenW);
		var y = Math.round(Math.random() * screenH);
		var length = 1 + Math.random() * 2;
		var opacity = Math.random();

		// Create a new star and draw
		var star = new Star(x, y, length, opacity);

		// Add the the stars array
		stars.push(star);
	}

	setInterval(animate, 1000 / fps);
});

/**
 * Animate the canvas
 */
function animate() {
	context.clearRect(0, 0, screenW, screenH);
	for (var i = 0, n = stars.length; i < n; i++) {
		stars[i].x++;
		stars[i].y--;
		stars[i].draw(context);
	}
}

/**
 * Star
 *
 * @param int x
 * @param int y
 * @param int length
 * @param opacity
 */
function Star(x, y, length, opacity) {
	this.x = parseInt(x);
	this.y = parseInt(y);
	this.length = parseInt(length);
	this.opacity = opacity;
	this.factor = 1;
	this.increment = Math.random() * .03;
}

/**
 * Draw a star
 *
 * This function draws a star.
 * You need to give the context as a parameter
 *
 * @param context
 */
Star.prototype.draw = function() {
	context.rotate((Math.PI * 1 / 10));

	// Save the context
	context.save();

	// move into the middle of the canvas, just to make room
	context.translate(this.x, this.y);

	// Change the opacity
	if(this.opacity > 1) {
		this.factor = -1;
	}
	else if(this.opacity <= 0) {
		this.factor = 1;

		this.x = Math.round(Math.random() * screenW);
		this.y = Math.round(Math.random() * screenH);
	}

	this.opacity += this.increment * this.factor;

	context.beginPath();

	for (var i = 5; i--;) {
		context.lineTo(0, this.length);
		context.translate(0, this.length);
		context.rotate((Math.PI * 2 / 10));
		context.lineTo(0, - this.length);
		context.translate(0, - this.length);
		context.rotate(-(Math.PI * 6 / 10));
	}
	context.lineTo(0, this.length);
	context.closePath();
	context.fillStyle = "rgba(255, 255, 200, " + this.opacity + ")";
	context.shadowBlur = 10;
	context.shadowColor = '#ffff33';
	context.fill();

	context.restore();
};