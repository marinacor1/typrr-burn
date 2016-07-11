var counter = 0;
var previousCharacter = null;

// const Scorecard = require('./scorecard');
const Bird = require('./bird');
const Level = require('./level');
const KeyStroke = require('./keystroke');
const Game = require('./game');

// var scorecard = new Scorecard();
var bird = new Bird();
var levelOne = new Level(1);

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
	let level = new Level(Number($('#level').text()), Number($('#score').text()))
	let stroke = new KeyStroke(char, currentText, currentIndex, level, bird)
	stroke.score().prepareForNext().updateScoreCard();
})

window.addEventListener('load', function startGame(event){
	var game = new Game();
  game.start();
})
