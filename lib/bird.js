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
			}
			else {
			_this.ctx.fillRect(_this.x, _this.y+=(_this.levelSpeed(level)), 10, 10); //dropping rate
			requestAnimationFrame(gameLoop);
		}
		})
		return this;
	}

	levelSpeed(level){
		if (level === 1){
			return 0.25
		} else if (level === 2){
			return 0.28
		} else if (level === 3){
			return 0.3
		} else if (level === 4){
			return 0.4
		} else if (level === 5){
			return 0.5
		} else {
			return 0.6
		}
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
	}

	down() {
		this.y+=20;
	}

	game_over(){
    $("#challenge-text").text("GAME OVER!!");
		if (highestScore){
		$('.you-have-high-score').text("Congratulations! You now have the highest score!")
	}
	}
}

module.exports = Bird;
