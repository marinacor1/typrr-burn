var counter = 0;
var indexCounter = 0;
var previousCharacter = null;

const Scorecard = require('./scorecard');
const Bird = require('./bird');
const Level = require('./level');
const KeyStroke = require('./keystroke')

var scorecard = new Scorecard();
var bird = new Bird();
var levelOne = new Level(1);

var playerInput = document.getElementById("player-input")
var startButton = document.getElementById("start-button")

startButton.addEventListener('click', function(){
	levelOne.render();
	bird.fall();
	this.remove();
})

playerInput.addEventListener('keyup', function keyStore(event){
	bird.fall(this.y);
	var currentText = $('#challenge-text').text()
	var char = event.key;
	var stroke = new KeyStroke(char, currentText, indexCounter, levelOne, bird, scorecard)

	stroke.score().prepareForNext();
	scorecard.updateScore();
})
