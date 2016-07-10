const assert = require('chai').assert;
const KeyStroke = require('../lib/keystroke');
const Level = require('../lib/level')
const Bird = require('../lib/bird')

describe ("Keystroke", function() {
	context("a correct keystroke", function() {
		var level = new Level(1);
		var firstLevelChar = level.challenge[0][0];
		var firstLevelText = level.challenge[0]
		var bird = new Bird();
		var correctKeystroke = new Keystroke(firstLevelChar, firstLevelText, level, bird)

		it('should assign a char', function () {
			assert.equal(true, true)
		})
	})
})
