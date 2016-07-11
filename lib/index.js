var counter = 0;
var previousCharacter = null;

// const Scorecard = require('./scorecard');
const Bird = require('./bird');
const Level = require('./level');
const KeyStroke = require('./keystroke');
const Game = require('./game');

var bird = new Bird();

var levelOne = new Level(1, 0, bird);
var playerInput = document.getElementById("player-input")

document.addEventListener('keyup', function startLevelOne(event){
	$("#player-input").focus();
	  levelOne.removeInstructions();
		levelOne.render(0);
		bird.fall();
		this.removeEventListener('keyup', startLevelOne)
})

playerInput.addEventListener('keyup', function keyStore(event){
	let currentText = $('#challenge-text').text()
	let char = event.key;
	let currentIndex = $("#player-input").val().length - 1
	bird.reset();
	let level = new Level(Number($('#level').text()), Number($('#score').text()), bird)
	let stroke = new KeyStroke(char, currentText, currentIndex, level)
	stroke.score().prepareForNext().updateScoreCard();
	console.log("hit")
})

window.addEventListener('load', function startGame(event){
	var game = new Game();
  game.start();
})
