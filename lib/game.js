var birdCanvas = document.getElementById("birdWindow")

class Game {
  constructor(){
		this.background = new Image();
		this.background.src = './imgs/background'
		this.backgroundOffset = 0;
		this.ctx = birdCanvas.getContext('2d');
		this.canvas = birdCanvas;
		this.canvas.width = 600;
		this.canvas.height = 400;
 	}

	startGame(){
		var _this = this;
		window.requestAnimationFrame(function gameLoop(){
			_this.ctx.drawImage(_this.background, 0, 0, _this.canvas.width, _this.canvas.height)
		})
	}
}

module.exports = Game;
