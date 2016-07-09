var backgroundCanvas = document.getElementById("background")

class Game {
  constructor(){
    this.cloudImge = document.getElementById('cloud-pic');
		this.background = new Image();
		this.background.src = '/lib/cloud-pic.png'
		this.backgroundOffset = 0;
		this.ctx = backgroundCanvas.getContext('2d');
		this.canvas = backgroundCanvas;
		this.canvas.width = 600;
		this.canvas.height = 400;
 	}

	start(){
		var _this = this;
		window.requestAnimationFrame(function gameLoop(){
			_this.ctx.drawImage(_this.background, 0, 0, 600, 400)
			requestAnimationFrame(gameLoop());
		})
	}
}

module.exports = Game;
