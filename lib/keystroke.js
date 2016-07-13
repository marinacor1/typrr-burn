var currentIndex;

class KeyStroke {
	constructor(char, currentText, level) {
		this.char = char;
		this.currentText = currentText;
		// this.currentIndex = currentIndex;
		this.level = level;
	}

	scoreCorrect() {
		this.level.score++;
		currentIndex = currentIndex + 1 || 0
		this.correct = true;
	}

	scoreIncorrect() {
		this.level.score--;
		// this.currentIndex++;
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
			this.level.bird.down();

			this.scoreIncorrect();
			return this;
		} else if (this.char === this.currentText[currentIndex]) {

			this.scoreCorrect();
			this.level.bird.up();
			this.checkIfEndOfLine();
			return this;
		}

		// if (this.char === "Backspace"){
		// 	this.level.bird.down();
		// 	this.scoreBackspace();
		// 	return this;
		// } else if (this.char !== this.currentText[this.currentIndex]) {
		// 	this.level.bird.down();
		// 	this.scoreIncorrect();
		// 	return this;
		// } else  { //(this.char === this.currentText[this.currentIndex])
		// 	this.scoreCorrect();
		// 	this.level.bird.up();
		// 	this.checkIfEndOfLine();
		// 	return this;
		// };
	}

	updateScoreCard() {
		$("#score").text(this.level.score);
	}

	prepareForNext() {
		currentIndex = currentIndex || 0
		if(this.correct && currentIndex < this.currentText.length) {
			var nextLetter = "#" + currentIndex;
			var thisLetter = "#" + (currentIndex-1);
			$(thisLetter).removeClass('my-underline').removeClass('my-grey').removeClass('my-red');
			$(nextLetter).addClass('my-underline').removeClass('my-red')
		} else if (!this.correct && currentIndex < this.currentText.length){
			var sameLetter = "#" + currentIndex;
			$(sameLetter).addClass('my-red').removeClass('my-underline').removeClass('my-grey');
			//this letter- animate highlighting glow
    }








		// if(this.correct) {
		// 	var nextLetter = "#" + this.currentIndex;
		// 	var thisLetter = "#" + (this.currentIndex-1);
		// 	$(thisLetter).removeClass('my-underline').removeClass('my-grey').removeClass('my-red');
		// 	$(nextLetter).addClass('my-underline').removeClass('my-red')
		// } else if (this.char === "Backspace") {
		// 	var deletedLetter = "#" + (this.currentIndex+2);
		// 	var nextLetter = "#" + (this.currentIndex+3);
		// 	$(deletedLetter).addClass('my-grey').addClass('my-underline');
		// 	$(nextLetter).removeClass('my-red').removeClass('my-underline');
		// } else { //!this.correct
		// 	var nextLetter = "#" + this.currentIndex;
		// 	var thisLetter = "#" + (this.currentIndex-1); // this is why the last letter is highlighted!
		// 	$(thisLetter).removeClass('my-underline').removeClass('my-grey').addClass('my-red');
		// 	$(nextLetter).addClass('my-underline')
		// };
		return this;
	}

}

module.exports = KeyStroke;
