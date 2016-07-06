var birdCanvas = document.getElementById("birdWindow")
var playerInput = document.getElementById("player-input")
var counter = 0;
var birdPoints = 0;
var indexCounter = 0;
var birdContext = birdCanvas.getContext("2d");

function bird() {
	this.x = 10;
	this.y= 150;
	this.width = 10;
	this.height = 10;
}

function levelText(string) {
	this.text = string
	this.render = function(){
		var chars = this.text.split("");
		var wrapped = chars.map(function(char, index){
			return "<span id='" + index + "'>" + char + "</span>";
		});
		$("#challenge-text").html(wrapped.join(""));
	};
}

var myBird = new bird();

bird.prototype.draw = function(){
	birdContext.fillStyle = "black";
	birdContext.fillRect(this.x, this.y, this.width, this.height);
	return this;
}

bird.prototype.move = function(){
	this.x+=5;
	return this;
}

playerInput.addEventListener('keyup', function(event){
	var challengeText = $('#challenge-text').text()
	var currentKey = event.key;
	evaluateKey(currentKey, challengeText);
	updateScore();
})

function updateScore(){
	$("#score").text(birdPoints);
}

function evaluateKey(currentKey, challengeText) {
	if (currentKey === challengeText[indexCounter]) {
    birdPoints++;
    counter++;
		indexCounter++;
		myBird.move().draw();
	} else if (currentKey === "Backspace"){
		counter--;
	} else {
			birdPoints--;
			counter++;
	};
}
var levelOne = new levelText("hello world");
levelOne.render();
myBird.draw();
