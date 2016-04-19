(function(root) {


	var context,
	 		screenH,
	 		screenW,
		 	dots = [],
	 		numDots = 250;


	document.addEventListener('DOMContentLoaded', function() {

		function ResizeCanvas(e) {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		}

		window.addEventListener('resize', ResizeCanvas, false);

		var canvas = document.getElementById('dots');
		screenW = window.innerWidth;
		screenH = window.innerHeight;

		canvas.setAttribute('height', screenH);
		canvas.setAttribute('width', screenW);
		context = canvas.getContext('2d');

		for (var i = 0; i < numDots; i++) {
			var x = Math.round(Math.random() * screenW);
			var y = Math.round(Math.random() * screenH);
			var length = 1 + Math.random() * 2;
			var opacity = Math.random();

			var dot = new Dot(x, y, opacity);

			dots.push(dot);
		}

		requestAnimationFrame(animate);
	});

	function animate() {
		context.clearRect(0, 0, screenW, screenH);
		for (var i = 0, n = dots.length; i < n; i++) {
			dots[i].x++;
			dots[i].y--;
			dots[i].draw(context);
		}
		requestAnimationFrame(animate);
	}

	function Dot(x, y, opacity) {
		this.x = parseInt(x);
		this.y = parseInt(y);
		this.opacity = opacity;
		this.factor = 1;
		this.increment = Math.random() * .03;
	}

	Dot.prototype.draw = function() {

		context.rotate((Math.PI * 1 / 10));
		context.save();
		context.translate(this.x, this.y);

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
		context.arc(75, 75, 2, 0, 2 * Math.PI);
		context.closePath();
		context.fillStyle = "rgba(255, 255, 200, " + this.opacity + ")";
		context.shadowBlur = 10;
		context.shadowColor = '#ffff33';
		context.fill();

		context.restore();
};
}(this));
