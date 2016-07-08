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
			console.log("correct!")
			this.scorecard.birdPoints++;
			console.log("birdPoints:", this.scorecard.birdPoints)
			this.level.counter++;
			console.log("counter:", this.level.counter)
			this.level.indexCounter++;
			console.log("indexCounter:", this.level.indexCounter)
			this.bird.up();
			this.correct = true;
			return this;
		} else if (this.char === "Backspace"){
			console.log("Backspace!")
			console.log("birdPoints:", this.scorecard.birdPoints)
			this.level.counter--;
			console.log("counter:", this.level.counter)
			this.level.indexCounter--;
			console.log("indexCounter:", this.level.indexCounter)
			this.correct = false;
			return this;
		} else {
			console.log("wrong!")
			this.scorecard.birdPoints--;
			console.log("birdPoints:", this.scorecard.birdPoints)
			this.level.counter++;
			console.log("counter:", this.level.counter)
			console.log("indexCounter:", this.level.indexCounter)
			this.bird.down();
			this.correct = false;
			return this;
		};
	}

	prepareForNext() {
		if(this.correct) {
			console.log("right!, preparing...")
			console.log("birdPoints:", this.scorecard.birdPoints)
			console.log("counter:", this.level.counter)
			console.log("indexCounter:", this.level.indexCounter)
			return this;
		} else if (this.char === "Backspace") {
			console.log("backspace!, preparing...")
			console.log("birdPoints:", this.scorecard.birdPoints)
			console.log("counter:", this.level.counter)
			console.log("indexCounter:", this.level.indexCounter)
			return this;
		} else {
			console.log("wrong!, preparing...")
			console.log("birdPoints:", this.scorecard.birdPoints)
			console.log("counter:", this.level.counter)
			console.log("indexCounter:", this.level.indexCounter)
			return this;
		}
	}

}

module.exports = KeyStroke;

	//first letter is not highlighted
	//past letters don't change
	//if you go back, it removes all green
	//color you are on is green, maybe a different color?
	// If you go back and redo it, you get more points. Need a way to store previous char and give no points.
	//if get wrong one time, even when correct later, doesn't render green

// here is the old function---->
// 		this.prepareForNext = function () {
// 			if (this.correct) {
// 				var target = "#" + indexCounter
// 				$(".letter").removeClass("red");
// 				$(target).addClass("green");
// 			} else if (this.char === "Backspace"){
// 				var target = "#" + (indexCounter - 1);
// 			} else if (this.correct === false){
// 				var target = "#" + indexCounter;
// 				$(".letter").removeClass("green");
// 				$(target).addClass("red");
// 			}
// 		}
// 	}
// }

// current text, current index, counter, text--all could be properties of level.
