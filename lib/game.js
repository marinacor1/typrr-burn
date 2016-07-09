var birdCanvas = document.getElementById("birdWindow")

class Game {
  constructor(){
		this.background = new Image();
		this.background.src = './imgs/background'
		this.backgroundOffset = 0;
		this.ctx = birdCanvas.getContext('2d');
 	}

	drawBackground(){
    this.ctx.translate(-this.backgroundOffset, 0);
		this.ctx.drawImage(this.background, 0, 0)
	}
}

module.exports = Game;
