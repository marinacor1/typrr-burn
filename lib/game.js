function Game() {
	this.init = function() {
		this.bgCanvas = document.getElementById('background');
		if (this.bgCanvas.getContext) {
			this.bgContext = this.bgCanvas.getContext('2d');
			Background.prototype.context = this.bgContext;
			Background.prototype.canvasWidth = this.bgCanvas.width;
			Background.prototype.canvasHeight = this.bgCanvas.height;
			this.background = new Background();
			this.background.init(0,0);
			return true;
		} else {
			return false;
		}
	};

	this.start = function() {
		animate();
	};
}

function animate() {
	requestAnimFrame(animate);
	game.background.draw();
}

window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame   ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
			window.oRequestAnimationFrame      ||
			window.msRequestAnimationFrame     ||
			function(callback, element){
				window.setTimeout(callback, 1000 / 60);
			};
})();

module.exports = Game;
