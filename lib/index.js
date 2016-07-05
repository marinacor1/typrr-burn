var birdCanvas = document.getElementById("birdWindow")
var textCanvas = document.getElementById("textWindow")

var birdContext = birdCanvas.getContext("2d");
var textContext = textCanvas.getContext("2d");

function bird() {
	this.x = 10;
	this.y= 150;
	this.width = 10;
	this.height = 10;
}

var myBird = new bird();

bird.prototype.draw = function(){
	console.log("this:", this);
	console.log("birdContext:", birdContext);
	console.log("BirdCanvas:", birdCanvas);
	birdContext.fillStyle = "black";
	birdContext.fillRect(this.x, this.y, this.width, this.height);
	console.log("this2:", this);
	return this;
}

bird.prototype.move = function(){
	this.x++;
}


window.addEventListener("keyup", function(event){
	myBird.draw();
	console.log(myBird);
	myBird.move();
	console.log(myBird);
})
