var birdCanvas = document.getElementById("birdWindow")
const Level = require('./level')

var birds = ['https://s3-us-west-1.amazonaws.com/ideabox/bird-1.png',
						 'https://s3-us-west-1.amazonaws.com/ideabox/bird-2.png',
						 'https://s3-us-west-1.amazonaws.com/ideabox/bird-3.png',
						 'https://s3-us-west-1.amazonaws.com/ideabox/bird-4.png',
						 'https://s3-us-west-1.amazonaws.com/ideabox/bird-5.png']
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

	levelSpeed(level) {
		if (level === 1){
			return 0.01
		} else if (level === 2){
			return 0.45
		} else if (level === 3){
			return 0.6
		} else if (level === 4){
			return 0.7
		} else if (level === 5){
			return 0.8
		} else {
			return 0.9
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

	down(level) {
		if (level === 1){
		this.y+=10;
	} else if (level === 2 || level === 3 ){
		this.y+=20;
	}
	else if (level === 4 || level === 5){
		this.y+=30;
	}
	else{
		this.y+=40;
	}
	}
}

module.exports = Bird;
