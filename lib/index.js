var counter = 0;
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
	$("#player-input").focus();
	levelOne.render(0);
	bird.fall();
	this.remove();
})

playerInput.addEventListener('keyup', function keyStore(event){
	let currentText = $('#challenge-text').text()
	let char = event.key;
	let currentIndex = $("#player-input").val().length - 1
	let level = new Level(Number($('#level').text()), Number($('#score').text()))
	let stroke = new KeyStroke(char, currentText, currentIndex, level, bird, scorecard)
	stroke.score().prepareForNext();
	scorecard.updateScore();
})
