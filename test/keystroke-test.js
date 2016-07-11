const assert = require('chai').assert;
const KeyStroke = require('../lib/keystroke');
const Level = require('../lib/level')
const Bird = require('../lib/bird')
const sinon = require('sinon')
// var sinon = require("imports?define=>false!sinon");
// const stub = sinon.stub();

describe ("Keystroke", function() {
	context('with a correct keystroke',function(){
		var level = new Level(1);
		var text = level.challenge[0]
		var char = level.challenge[0][0]
		var bird = new Bird();
		var correctKeystroke = new KeyStroke(char, text, 0, level, bird);

		it('should assign a char', function(){
			assert.equal(correctKeystroke.char, char)
		})

		it('should assign a text', function(){
			assert.equal(correctKeystroke.currentText, text)
		})

		it('should assign an index', function(){
			assert.equal(correctKeystroke.currentIndex, 0)
		})

		it('should assign a level', function(){
			assert.equal(correctKeystroke.level, level)
		})

		it('should increment the score & the index & set correct to true', function(){
			assert.equal(0, level.score)
			assert.equal(0, correctKeystroke.currentIndex)
			assert.equal(undefined, correctKeystroke.correct)

			correctKeystroke.scoreCorrect();

			assert.equal(1, level.score)
			assert.equal(1, correctKeystroke.currentIndex)
			assert.equal(true, correctKeystroke.correct)
		})
	})

	context('with an incorrect keystroke', function(){
		var level = new Level(1);
		var text = level.challenge[0]
		var bird = {};
		var incorrectKeystroke = new KeyStroke("z", text, 0, level, bird);

		it('should assign a char', function(){
			assert.equal(incorrectKeystroke.char, "z")
		})

		it('should assign a text', function(){
			assert.equal(incorrectKeystroke.currentText, text)
		})

		it('should assign an index', function(){
			assert.equal(incorrectKeystroke.currentIndex, 0)
		})

		it('should assign a level', function(){
			assert.equal(incorrectKeystroke.level, level)
		})

		it('should decrement the score, increment the index & set correct to false', function(){
			assert.equal(0, level.score)
			assert.equal(0, incorrectKeystroke.currentIndex)
			assert.equal(undefined, incorrectKeystroke.correct)

			incorrectKeystroke.scoreIncorrect();

			assert.equal(-1, level.score)
			assert.equal(1, incorrectKeystroke.currentIndex)
			assert.equal(false, incorrectKeystroke.correct)
		})
	})

	context('with an incorrect keystroke', function(){
		var level = new Level(1);
		var text = level.challenge[0]
		var bird = {};
		var backspace = new KeyStroke("Backspace", text, 0, level, bird);

		it('should assign a char', function(){
			assert.equal(backspace.char, "Backspace")
		})

		it('should assign a text', function(){
			assert.equal(backspace.currentText, text)
		})

		it('should assign an index', function(){
			assert.equal(backspace.currentIndex, 0)
		})

		it('should assign a level', function(){
			assert.equal(backspace.level, level)
		})

		it('should decrement the index', function(){
			assert.equal(0, level.score)
			assert.equal(0, backspace.currentIndex)
			assert.equal(undefined, backspace.correct)

			backspace.scoreBackspace();

			assert.equal(0, level.score)
			assert.equal(-1, backspace.currentIndex)
			assert.equal(undefined, backspace.correct)
		})
	})

	context('with a correct keystroke at the end of a line', function(){
		var level = new Level(1);
		var text = level.challenge[0]
		var lastCharIndex = level.challenge.length
		var lastChar = level.challenge[0][lastCharIndex]
		var bird = {};
		var lastCharKeystroke = new KeyStroke(lastChar, text, lastCharIndex, level, bird);

		it('should assign a char', function(){
			assert.equal(lastCharKeystroke.char, lastChar)
		})

		it('should assign a text', function(){
			assert.equal(lastCharKeystroke.currentText, text)
		})

		it('should assign an index', function(){
			assert.equal(lastCharKeystroke.currentIndex, lastCharIndex)
		})

		it('should assign a level', function(){
			assert.equal(lastCharKeystroke.level, level)
		})

		it('should increment the score & the index & set correct to true', function(){
			assert.equal(0, level.score)
			assert.equal(lastCharIndex, lastCharKeystroke.currentIndex)
			assert.equal(undefined, lastCharKeystroke.correct)

			lastCharKeystroke.scoreCorrect();

			assert.equal(1, level.score)
			assert.equal(5, lastCharKeystroke.currentIndex)
			assert.equal(true, lastCharKeystroke.correct)
		})
	})
})
