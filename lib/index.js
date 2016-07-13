var counter = 0;
var previousCharacter = null;

const Bird = require('./bird');
const Level = require('./level');
const KeyStroke = require('./keystroke');
const Game = require('./game');

var bird = new Bird(1);
var highScore = localStorage['high score'] || 0;
var levelOne = new Level(1, highScore, bird);
var playerInput = document.getElementById("player-input")

document.addEventListener('keyup', function startLevelOne(event){
	$("#player-input").focus();
	  levelOne.removeInstructions();
		levelOne.render(0);
		// bird.fall();
		this.removeEventListener('keyup', startLevelOne)
})

playerInput.addEventListener('keyup', function keyStore(event){
	let currentText = $('#challenge-text').text()
	let char = event.key;
	// let currentIndex = $("#player-input").val().length - 1
	var levelNumber = Number($('#level').text())
	let level = new Level(levelNumber, Number($('#score').text()), bird)
	let stroke = new KeyStroke(char, currentText, level)
	stroke.score().prepareForNext().updateScoreCard();
})

window.addEventListener('load', function startGame(event){
	var game = new Game();
  game.start();
})
