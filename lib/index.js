var birdCanvas = document.getElementById("birdWindow")
var playerInput = document.getElementById("player-input")

var birdContext = birdCanvas.getContext("2d");

function bird() {
	this.x = 10;
	this.y= 150;
	this.width = 10;
	this.height = 10;
}

// function text(string){
// 	this.content = string;
// }

var myBird = new bird();

bird.prototype.draw = function(){
	// console.log("this:", this);
	// console.log("birdContext:", birdContext);
	// console.log("BirdCanvas:", birdCanvas);
	birdContext.fillStyle = "black";
	birdContext.fillRect(this.x, this.y, this.width, this.height);
	// console.log("this2:", this);
	return this;
}

bird.prototype.move = function(){
	this.x++;
}

playerInput.addEventListener('keyup', function(){
  
})

window.addEventListener("keyup", function(event){
	myBird.draw();
	console.log(event.key);
	myBird.move();
	// console.log(myBird);
})
