
var playerInput = document.getElementById("player-input")
var startButton = document.getElementById("start-button")
var counter = 0;
// var birdPoints = 0;
var indexCounter = 0;
// var birdContext = birdCanvas.getContext("2d");
var previousCharacter = null;

const Scorecard = require('./scorecard');
const Bird = require('./bird')
var scorecard = new Scorecard();
var bird = new Bird();



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
			scorecard.birdPoints++;
			counter++;
			indexCounter++;
			bird.up();
			// bird.move().draw();
			this.correct = true;
			return this;
		} else if (this.char === "Backspace"){
			counter--;
			indexCounter --;
			return this;
		} else {
				scorecard.birdPoints--;
				counter++;
				bird.down();
				this.correct = false;
				return this;
		};

	}

//first letter is not highlighted
//past letters don't change
//if you go back, it removes all green
//color you are on is green, maybe a different color?
// If you go back and redo it, you get more points. Need a way to store previous char and give no points.
//if get wrong one time, even when correct later, doesn't render green

	this.prepareForNext = function () {
		if (this.correct) {
			var target = "#" + indexCounter
			$(".letter").removeClass("red");
			$(target).addClass("green");
		} else if (this.char === "Backspace"){
			var target = "#" + (indexCounter - 1);
		} else if (this.correct === false){
			var target = "#" + indexCounter;
			$(".letter").removeClass("green");
			$(target).addClass("red");
		}
	}
}

startButton.addEventListener('click', function(){
	var levelOne = new levelText("hello world");
	levelOne.render();
	bird.fall();
	this.remove();
})

playerInput.addEventListener('keyup', function keyStore(event){
	bird.fall(this.y);
	var challengeText = $('#challenge-text').text()
	var currentKey = event.key;
	var stroke = new keyStroke(currentKey, challengeText)
	stroke.score().prepareForNext();
	scorecard.updateScore();
})
