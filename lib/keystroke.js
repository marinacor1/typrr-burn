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
		if (this.char === "Backspace"){
			this.level.counter--;
			this.level.indexCounter--;
			console.log("You are backspace");
			this.correct = false;
			return this;
		} else if (this.char !== this.currentText[this.currentIndex]) {
			this.scorecard.birdPoints--;
			this.level.counter++;
			this.level.indexCounter++;
			this.bird.down();
			this.correct = false;
			console.log("You are incorrect");
			return this;
		} else if (this.char === this.currentText[this.currentIndex]) {
			this.scorecard.birdPoints++;
			this.level.counter++;
			this.level.indexCounter++;
			this.bird.up();
			console.log("You are correct");
			this.correct = true;
			if (this.currentIndex +1  === this.currentText.length) {
			 	this.level.nextLine(this.currentText);
			 }
			return this;
		} else {
			console.log("WTF is:", this);
		}
	}

	prepareForNext() {
		if(this.correct) {
			var $this = "#" + (this.level.indexCounter -1);
			var target = "#" + this.level.indexCounter;
			$($this).removeClass("grey");
			$($this).removeClass("underline");
			$($this).removeClass("red");
			$(target).addClass("underline");
			console.log("*Correct Styling*");
			// return this;
		} else if (this.char === "Backspace") {
			var target = "#" + (this.level.indexCounter);
			$(".letter").removeClass("underline");
			$(target).removeClass("red");
			$(target).addClass("underline");
			console.log("*Backspace Styling*");
			// return this;
		} else if (!this.correct){
			var target = "#" + (this.level.indexCounter -1);
			$(".letter").removeClass("grey");
			$(target).addClass("red");
			console.log("*Incorrect Styling*" + "for target: " + target)
			// return this;
		} else {
			console.log("WTF is:", this);
		}
	}

}

module.exports = KeyStroke;
