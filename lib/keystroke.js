var currentIndex;

class KeyStroke {
	constructor(char, currentText, level) {
		this.char = char;
		this.currentText = currentText;
		this.level = level;
	}

	scoreCorrect() {
		this.level.score++;
		currentIndex = currentIndex + 1 || 0
		this.correct = true;
	}

	scoreIncorrect() {
		this.level.score--;
		this.correct = false;
	}

	scoreBackspace() {
		this.currentIndex--;
	}

	checkIfEndOfLine() {
		if (currentIndex  == this.currentText.length) {
			this.level.nextLine(this.currentText);
			currentIndex = 0
		};
	}

	score() {
		currentIndex = currentIndex || 0
		if (currentIndex === 0 && !this.char.match(/[a-z]/i)) {
			return this;
		} else if (this.char !== this.currentText[currentIndex]) {
			this.level.bird.down(this.level);
			this.scoreIncorrect();
			return this;
		} else if (this.char === this.currentText[currentIndex]) {
			this.scoreCorrect();
			this.level.bird.up();
			this.checkIfEndOfLine();
			return this;
		}
	}

	updateScoreCard() {
		$("#score").text(this.level.score);
	}

	prepareForNext() {
		currentIndex = currentIndex || 0
		if (currentIndex === 0 && !this.char.match(/[a-z]/i))	{
			var thisLetter = "#" + (currentIndex);
			$(thisLetter).fadeIn(100).fadeOut(80).fadeIn(80).fadeIn(80).fadeOut(80).fadeIn(80);
	  } else if(this.correct && currentIndex < this.currentText.length) {
			var nextLetter = "#" + currentIndex;
			var thisLetter = "#" + (currentIndex-1);
			$(thisLetter).removeClass('my-underline').removeClass('my-grey').removeClass('my-red');
			$(nextLetter).addClass('my-underline').removeClass('my-red')
		} else if (!this.correct && currentIndex < this.currentText.length){
			var sameLetter = "#" + currentIndex;
			$(sameLetter).addClass('my-red').removeClass('my-underline').removeClass('my-grey')
			$(sameLetter).fadeIn(100).fadeOut(80).fadeIn(80).fadeIn(80).fadeOut(80).fadeIn(80);
    }
		return this;
	}

}

module.exports = KeyStroke;
