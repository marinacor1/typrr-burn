var birdCanvas = document.getElementById("birdWindow")

class Bird {
	constructor(level) {
		this.x = 300;
		this.y = 200;
		this.width = 10;
		this.height = 10;
		this.paused = false;
		this.level = level;
		this.ctx = birdCanvas.getContext('2d') || {}
	}

	reset() {
		this.x = 300;
		this.y = 200;
		return this;
	}

	fall() {
		var _this = this;
		requestAnimationFrame(function gameLoop() {
			_this.ctx.fillStyle = "purple";
			_this.ctx.clearRect(0, 0, 600, 600 );
			if (_this.y > 375) {
				_this.game_over();
			}
			else if (_this.paused){
			_this.ctx.fillStyle = "purple";
			_this.ctx.fillRect(_this.x, _this.y, 10, 10); //dropping rate
        console.log("We are pausing the fall")
			}
			else {
				debugger
			_this.ctx.fillRect(_this.x, _this.y+=0.25, 10, 10); //dropping rate
			requestAnimationFrame(gameLoop);
		}
		})
		return this;
	}

	up() {
		this.y-=15;
		// console.log("My y is " + this.y)
		// if (this.y > 20){
		// 	this.y-=15;
		// } else if (this.y < 10){
		// 	this.y = 11
		// } else {
		// 	this.y = 20
		// 	this.y-=1
		// }
		return this;
	}

	down() {
		this.y+=15;
		return this;
	}

	game_over(){
    $("#challenge-text").text("GAME OVER!!");
	}
}

module.exports = Bird;
