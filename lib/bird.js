var birdCanvas = document.getElementById("birdWindow")

class Bird {
	constructor() {
		this.x = 300;
		this.y = 200;
		this.width = 10;
		this.height = 10;
		this.ctx = birdCanvas.getContext('2d') || {}
	}

	fall() {
		var _this = this;
		requestAnimationFrame(function gameLoop() {
			_this.ctx.fillStyle = "purple";
			_this.ctx.clearRect(0, 0, 600, 600 );
			if (_this.y > 375) {
				_this.game_over();
			}
			else {
			_this.ctx.fillRect(50, _this.y+=0.25, 10, 10); //dropping rate
			requestAnimationFrame(gameLoop);
		}
		})
		return this;
	}

	up() {
		this.y-=15;
		debugger
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
