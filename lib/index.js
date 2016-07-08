var birdCanvas = document.getElementById("birdWindow")
var playerInput = document.getElementById("player-input")
var counter = 0;
var birdPoints = 0;
var indexCounter = 0;
var birdContext = birdCanvas.getContext("2d");
var previousCharacter = null;

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
	this.score = function(){
		if (this.char === "Backspace"){
			counter--;
			indexCounter --;
			this.correct = false;
			console.log("backpace")
			console.log("Birdpoints: " + birdPoints)
			console.log("indexCounter: " + indexCounter)
			console.log("counter: " + counter)
			return this;
		}
	  else if (this.char !== challengeText[indexCounter]){
			birdPoints--;
			indexCounter ++;
			counter++;
			myBird.down();
			this.correct = false;
			console.log("wrong")
			console.log(this.char)
			console.log("Birdpoints: " + birdPoints)
			console.log("You put: " +this.char + ", the correct letter was: " + challengeText[indexCounter - 1])
			console.log("counter: " + counter)
			return this;
		}
		else if (this.char === challengeText[indexCounter]) {
			birdPoints++;
			counter++;
			indexCounter++;
			myBird.up();
			this.correct = true;
			console.log("right")
			console.log("You put: " +this.char + ", the correct letter was: " + challengeText[indexCounter - 1])
			console.log("Birdpoints: " + birdPoints)
			console.log("indexCounter: " + indexCounter)
			console.log("counter: " + counter)
			return this;
		}
	else {
		console.log ("WTF, mate.")
	}
}
//red appears on first but never changes
//underline only works on first one
	this.prepareForNext = function () {
		if (this.correct === true) {
			var target = "#" + indexCounter
			$(".letter").removeClass("grey");
			$(".letter").removeClass("underline");
			$(target).removeClass("red");
			$(target).addClass("underline");
			console.log("*Correct Styling*")
		}
		else if (this.char === "Backspace"){
			var target = "#" + (indexCounter);
			$(".letter").removeClass("underline");
			$(target).removeClass("red");
			$(target).addClass("underline");
			console.log("*Backspace Styling*")
		}
	  else if (this.correct === false){
				var target = "#" + (indexCounter -1);
				$(".letter").removeClass("grey");
				$(target).addClass("red");
				console.log("*Incorrect Styling*" + "for target: " + target)
		}
		else {
			console.log("WTF")
		}
	}
}

var myBird = new bird();

bird.prototype.draw = function(){
	birdContext.fillStyle = "black";
	birdContext.fillRect(this.x, this.y, this.width, this.height);
	return this;
}

bird.prototype.fall = function(){
	var y = this.y
	var x = this.x
	requestAnimationFrame(function gameLoop () {
		birdContext.fillStyle ="black";
		birdContext.clearRect(0, 0, 300, 300);
		birdContext.fillRect(50, y+=0.25, 10, 10);
		requestAnimationFrame(gameLoop);
	})
	return this;
}

bird.prototype.up = function(){
	this.y-=15;
	return this;
}

bird.prototype.down = function(){
	this.y+=15;
	return this;
}

playerInput.addEventListener('keyup', function keyStore(event){
	myBird.fall(this.y);
	var challengeText = $('#challenge-text').text()
	var currentKey = event.key;
	var stroke = new keyStroke(currentKey, challengeText)
	stroke.score().prepareForNext();
	updateScore();
})

function updateScore(){
	$("#score").text(birdPoints);
}

// function evaluateKey(currentKey, challengeText) {
// 	if (currentKey === challengeText[indexCounter]) {
//     birdPoints++;
//     counter++;
// 		indexCounter++;
// 		myBird.move().draw();
// 	} else if (currentKey === "Backspace"){
// 		counter--;
// 	} else {
// 			birdPoints--;
// 			counter++;
// 	};
// }
var levelOne = new levelText("hello world");
levelOne.render();
myBird.draw();
