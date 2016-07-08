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
			return "<span class='letter' id='" + index + "'>" + char + "</span>";
		});
		$("#challenge-text").html(wrapped.join(""));
	};
}

function keyStroke(char, challengeText) {
	this.char = char;
	this.challengeText = challengeText;
	this.score = function() {
		if (this.char === challengeText[indexCounter]) {
			birdPoints++;
			counter++;
			indexCounter++;
			console.log("correct!")
			console.log("birdPoints:", birdPoints)
			console.log("counter:", counter)
			console.log("indexCounter:", indexCounter)
			myBird.move().draw();
			this.correct = true;
			return this;
		}
		 else if (this.char === "Backspace"){
			counter--;
			indexCounter --;
			console.log("Backspace!")
			console.log("birdPoints:", birdPoints)
			console.log("counter:", counter)
			console.log("indexCounter:", indexCounter)
			this.correct = false;
			return this;
		}
		else {
				birdPoints--;
				counter++;
				this.correct = false;
				console.log("wrong!")
				console.log("birdPoints:", birdPoints)
				console.log("counter:", counter)
				console.log("indexCounter:", indexCounter)
				return this;
		};
	}
}
//first letter is not highlighted
//past letters don't change
//if you go back, it removes all green
//color you are on is green, maybe a different color?
//if backspace turns letter you were on red
//if backspace multiple times only goes back one
	this.prepareForNext = function () {
		if (this.correct) {
			var target = "#" + indexCounter
			$(".letter").removeClass("red");
			$(target).addClass("green");
		}
		 else {
			var target = "#" + indexCounter;
			$(".letter").removeClass("green");
			$(target).addClass("red");

		}
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
	var stroke = new keyStroke(currentKey, challengeText)
	stroke.score().prepareForNext();
	updateScore();
})

function updateScore(){
	$("#score").text(birdPoints);
}

var levelOne = new levelText("hello world");
levelOne.render();
myBird.draw();
