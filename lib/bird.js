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
			_this.ctx.fillStyle = "purple";
			_this.ctx.clearRect(0, 0, 600, 600 );
			_this.ctx.fillRect(50, _this.y+=0.25, 10, 10);
			requestAnimationFrame(gameLoop);
		})
		return this;
	}

	up() {
		if (this.y > 20){
			this.y-=15;
		} else if (this.y < 10){
			this.y = 11
		} else {
			this.y = 20
			this.y-=1
		}
		return this;
	}

	down() {
		if (this.y > 375) {
			console.log("GAME OVER")
		} else {
		this.y+=15;
		return this;
	}
	}
}

module.exports = Bird;
