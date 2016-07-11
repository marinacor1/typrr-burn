class KeyStroke {
	constructor(char, currentText, currentIndex, level, bird) {
		this.char = char;
		this.currentText = currentText;
		this.currentIndex = currentIndex;
		this.level = level;
		this.bird = bird;
	}

	scoreCorrect() {
		this.level.score++;
		this.currentIndex++;
		this.correct = true;
	}

	scoreIncorrect() {
		this.level.score--;
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
			this.scoreBackspace();
			console.log("Backspace")
			return this;
		} else if (this.char !== this.currentText[this.currentIndex]) {
			this.scoreIncorrect();
			this.bird.down();
			console.log("Wrong")
			return this;
		} else if (this.char === this.currentText[this.currentIndex]) {
			this.scoreCorrect();
			this.bird.up();
			this.checkIfEndOfLine();
			console.log("Correct")
			return this;
		} else {
			console.log("WTF is:", this);
		};
	}

	updateScoreCard() {
		$("#score").text(this.level.score);
	}

	prepareForNext() {
		if(this.correct) {
			var nextLetter = "#" + this.currentIndex;
			var thisLetter = "#" + (this.currentIndex-1);
			$(thisLetter).removeClass('underline').removeClass('grey');
			$(nextLetter).addClass('underline')
		} else if (this.char === "Backspace") {
			var deletedLetter = "#" + (this.currentIndex+2);
			var nextLetter = "#" + (this.currentIndex+3);
			$(deletedLetter).addClass('grey').addClass('underline');
			$(nextLetter).removeClass('red').removeClass('underline');
		} else if (!this.correct){
			var nextLetter = "#" + this.currentIndex;
			var thisLetter = "#" + (this.currentIndex-1);
			$(thisLetter).removeClass('underline').removeClass('grey').addClass('red');
			$(nextLetter).addClass('underline')
		} else {
			console.log("WTF is:", this);
		};
		return this;
	}

}

module.exports = KeyStroke;
