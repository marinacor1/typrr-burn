var backgroundCanvas = document.getElementById("background")

class Game {
  constructor(){
    this.cloudImge = document.getElementById('cloud-pic');
		this.background = new Image();
		this.background.src = '/lib/cloud-pic.png'
		this.backgroundPosition= 0;
		this.ctx = backgroundCanvas.getContext('2d');
		this.canvas = backgroundCanvas;
		this.canvas.width = 600;
		this.canvas.height = 400;
 	}

	start(){
		var _this = this;
		window.requestAnimationFrame(function gameLoop(){
			var position = _this.backgroundPosition-=0.25;
			var offset = _this.backgroundOffset+=0.25;
			_this.ctx.drawImage(_this.background, position, 0, 600, 400)
			_this.ctx.drawImage(_this.background, (position + _this.background.width), 0, 600, 400)
			if (_this.backgroundPosition < 0) {
			_this.ctx.drawImage(_this.background, position, 0, 600, 400)

				//render new background
			}
			// _this.ctx.clearRect(0, 0, 600, 400)
			requestAnimationFrame(gameLoop);
		})
	}
}

module.exports = Game;
