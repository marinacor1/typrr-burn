var backgroundCanvas = document.getElementById("background")

class Game {
  constructor(){
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
    var velocityX = 0;
		window.requestAnimationFrame(function cloudLoop(){
      requestAnimationFrame(cloudLoop);
      _this.ctx.clearRect(0, 0, _this.canvas.width, _this.canvas.height)
			_this.ctx.drawImage(_this.background, velocityX, 0)
			_this.ctx.drawImage(_this.background, (_this.background.width-Math.abs(velocityX)), 0);
      if (Math.abs(velocityX) > _this.background.width) {
        velocityX = 0;
      }
      velocityX-=1;
		})
	}
}

module.exports = Game;
