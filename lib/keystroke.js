class KeyStroke {
	constructor(char, currentText, currentIndex, level, bird, scorecard) {
		this.char = char;
		this.currentText = currentText;
		this.currentIndex = currentIndex;
		this.level = level;
		this.bird = bird;
		this.scorecard = scorecard;
	}

	score() {
		if (this.char === this.currentText[this.currentIndex]) {
			this.scorecard.birdPoints++;
			this.level.counter++;
			this.level.indexCounter++;
			this.bird.up();
			this.correct = true;
			return this;
		} else if (this.char === "Backspace"){
			this.level.counter--;
			this.level.indexCounter--;
			return this;
		} else {
			this.scorecard.birdPoints--;
			this.level.counter++;
			this.bird.down();
			this.correct = false;
			return this;
		};
	}
}

// current text, current index, counter, text--all could be properties of level.
