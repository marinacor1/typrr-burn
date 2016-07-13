var birdCanvas = document.getElementById("birdWindow")
// var animator = require('./animator')
const Level = require('./level')

var birds = ['/lib/bird-1.png',
						 '/lib/bird-2.png',
						 '/lib/bird-3.png',
						 '/lib/bird-4.png',
						 '/lib/bird-5.png']
var index;

setInterval(function(){
	index = index + 1 || 1
}, 500)

class Bird {
	constructor(level) {
		this.x = 300;
		this.y = 200;
		this.width = 10;
		this.height = 10;
		this.paused = false;
		this.ctx = birdCanvas.getContext('2d') || {}
	}

	callImage(){
		return animator.frame
	}

	level () {
		return new Level(level, Number($('#score').text()), this);
	}

	reset() {
		this.x = 300;
		this.y = 200;
		return this;
	}

	birdFrame(){
		var image = new Image();
		image.src = birds[index%5];
		return image;
	}

	fall() {
		var _this = this;
		requestAnimationFrame(function gameLoop() {
			_this.ctx.clearRect(0, 0, 600, 600 );
			if (_this.y > 375) {
				_this.level().endGame();
			}
			else if (_this.paused){
			_this.ctx.drawImage(_this.birdFrame(), _this.x, _this.y);
			}
			else { //dropping
			_this.ctx.drawImage(_this.birdFrame(), _this.x, _this.y);
			_this.ctx.drawImage(_this.birdFrame(), _this.x, _this.y+=_this.levelSpeed(level));
			requestAnimationFrame(gameLoop);
		}
		})
		return this;
	}
	// +=(_this.levelSpeed(level))

	levelSpeed(level) {
		if (level === 1){
			return 0.01
		} else if (level === 2){
			return 0.2
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
		this.y+=10;
	}
}

module.exports = Bird;
