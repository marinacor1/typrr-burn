class KeyStroke {
	constructor(char, currentText, currentIndex, level, bird) {
		this.char = char;
		this.currentText = currentText;
		this.currentIndex = currentIndex;
		this.level = level;
		this.bird = bird;
	}

	score() {
		if (this.char === "Backspace"){
			this.currentIndex--;
			return this;
		} else if (this.char !== this.currentText[this.currentIndex]) {
			this.level.score--;
			this.currentIndex++;
			this.bird.down();
			this.correct = false;
			return this;
		} else if (this.char === this.currentText[this.currentIndex]) {
			this.level.score++;
			this.currentIndex++;
			this.bird.up();
			this.correct = true;
			if (this.currentIndex  === this.currentText.length) {
			 	this.level.nextLine(this.currentText);
			 }
			return this;
		} else {
			console.log("WTF is:", this);
		}
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
		}
		return this;
	}

}

module.exports = KeyStroke;
