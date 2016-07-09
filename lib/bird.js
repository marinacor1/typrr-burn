var birdCanvas = document.getElementById("birdWindow")

class Bird {
	constructor() {
		this.x = 10;
		this.y = 150;
		this.width = 10;
		this.height = 10;
		this.ctx = birdCanvas.getContext('2d');
	}

	fall() {
		var _this = this;
		requestAnimationFrame(function gameLoop() {
			_this.ctx.fillStyle = "yellow";
			_this.ctx.clearRect(0, 0, 400, 600 );
			_this.ctx.fillRect(50, _this.y+=0.25, 10, 10);
			requestAnimationFrame(gameLoop);
		})
		return this;
	}

	up() {
		this.y-=15;
		return this;
	}

	down() {
		this.y+=15;
		return this;
	}
}

module.exports = Bird;
