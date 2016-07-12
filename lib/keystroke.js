class KeyStroke {
	constructor(char, currentText, currentIndex, level) {
		this.char = char;
		this.currentText = currentText;
		this.currentIndex = currentIndex;
		this.level = level;
	}

	scoreCorrect() {
		this.level.score++;
		this.currentIndex++;
		localStorage['high score'] = this.level.score;
		this.correct = true;
	}

	scoreIncorrect() {
		this.level.score--;
		localStorage['high score'] = this.level.score;
		this.currentIndex++;
		this.correct = false;
	}

	scoreBackspace() {
		this.currentIndex--;
	}

	checkIfEndOfLine() {
		if (this.currentIndex  === this.currentText.length) {
			this.level.nextLine(this.currentText);
		};
	}

	score() {
		if (this.char === "Backspace"){
			this.level.bird.down();
			this.scoreBackspace();
			return this;
		} else if (this.char !== this.currentText[this.currentIndex]) {
			this.level.bird.down();
			this.scoreIncorrect();
			return this;
		} else  { //(this.char === this.currentText[this.currentIndex])
			this.scoreCorrect();
			this.level.bird.up();
			this.checkIfEndOfLine();
			return this;
		};
	}

	updateScoreCard() {
		$("#score").text(this.level.score);

	}

	prepareForNext() {
		if(this.correct) {
			var nextLetter = "#" + this.currentIndex;
			var thisLetter = "#" + (this.currentIndex-1);
			$(thisLetter).removeClass('my-underline').removeClass('my-grey').removeClass('my-red');
			$(nextLetter).addClass('my-underline').removeClass('my-red')
		} else if (this.char === "Backspace") {
			var deletedLetter = "#" + (this.currentIndex+2);
			var nextLetter = "#" + (this.currentIndex+3);
			$(deletedLetter).addClass('my-grey').addClass('my-underline');
			$(nextLetter).removeClass('my-red').removeClass('my-underline');
		} else { //!this.correct
			var nextLetter = "#" + this.currentIndex;
			var thisLetter = "#" + (this.currentIndex-1);
			$(thisLetter).removeClass('my-underline').removeClass('my-grey').addClass('my-red');
			$(nextLetter).addClass('my-underline')
		};
		return this;
	}

}

module.exports = KeyStroke;
