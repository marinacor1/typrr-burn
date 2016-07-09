var birdCanvas = document.getElementById("birdWindow")

class Game {
  constructor(options){
		this.clouds = options.clouds;
		this.cloudsCtx = options.cloudsCtx;
    this.canvas = options.canvas;
 	}

  cloudsImage(){
    this.getClouds();
  }

	drawBackground(){
    this.ctx.translate(-this.backgroundOffset, 0);
		this.ctx.drawImage(this.background, 0, 0)
	}
}

module.exports = Background;
