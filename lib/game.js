var backgroundCanvas = document.getElementById("background")

class Game {
  constructor(){
    this.cloudImage = document.getElementById('cloud-pic');
		this.background = new Image();
		this.background.src = '/lib/cloud-pic.png'
		this.background.velocity = 200;
		this.background.distance = 0;
		this.background.lastFrameRepaintTime = 0;
		this.backgroundPosition= 0;
		this.ctx = backgroundCanvas.getContext('2d');
		this.canvas = backgroundCanvas;
		this.canvas.width = 600;
		this.canvas.height = 400;
 	}

	calcOffset(time){
		var frameGapTime = time - this.background.lastFrameRepaintTime;
		this.background.lastFrameRepaintTime = time;
		var translateX = this.background.velocity * (frameGapTime/1000)
		return translateX;
	}

	draw(time){
		this.background.distance+= calcOffset(time);
		if (this.background.distance > 900){
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
			this.ctx.save();
			this.ctx.translate(this.background.distance, 0);
			this.ctx.drawImage(this.cloudImage, 0, 0);
			this.ctx.drawImage(this.cloudImage, -899, 0);

			requestAnimationFrame(draw);

			this.ctx.restore();
		}
	}

	// start(){
		// this.background.lastFrameRepaintTime = window.performance.now();
		// requestAnimationFrame.bind(this.draw);
	// }

	start(){
		var _this = this;
		window.requestAnimationFrame(function gameLoop(){
			var position = _this.backgroundPosition-=0.25;
			var offset = _this.backgroundOffset+=0.25;
			_this.ctx.clearRect(0, 0, _this.canvas.width, _this.canvas.height)
			_this.ctx.save();
			_this.ctx.translate(_this.backgroundOffset, 0);
			_this.ctx.drawImage(_this.background, position, 0, 900, 400)
			_this.ctx.drawImage(_this.background, (position + _this.background.width), 0, 900, 400)
			// if (_this.backgroundPosition < -299) {
			//
			// }
			// _this.ctx.clearRect(0, 0, 600, 400)
			requestAnimationFrame(gameLoop);
		})
	}
}

module.exports = Game;
