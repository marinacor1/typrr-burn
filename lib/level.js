var levelText = require('./texts')

class Level {
	constructor(number, accumulatedScore, bird) {
		this.number = number;
		this.challenge = levelText[number];
		this.score = accumulatedScore || 0;
		this.indexCounter = 0;
		this.bird = bird;
	}

	removeInstructions() {
    $('.instructions').fadeOut(300, function() {
			$(this).text("");
		});
	}
	preparedLine(i) {
		var chars = this.challenge[i].split('');
		var wrapped = chars.map(function(char, index) {
			return "<span class='letter challenge-text my-grey' id='" + index + "'>" + char + "</span>";
		});
		return wrapped.join('');
	}

	renderNewLine(prepared) {
		$("#challenge-text").html(prepared);
		$('#0').addClass('my-underline');
	}

	render(i) {
		this.renderNewLine(this.preparedLine(i));
		return this;
	}

	indexOfNextLine(currentLine) {
		return this.challenge.indexOf(currentLine) + 1
	}

	thereIsAnotherLineInTheLevel(i) {
		if (this.challenge[i]) { return true }
	}

	clearInput() {
		$('#player-input').val('');
		return this;
	}

	thereIsAnotherLevel() {
		if (this.number < 6) { return true; }
	}

	nextLevelMessage() {
		$('#challenge-text').text("You finished level " + this.number +
		", press spacebar to play level " + (this.number + 1))
		return this;
	}

	bonusPoints(){
		this.score += 100;
		return this;
	}

	bonusPointsMessage(){
		$('#stats-message').text("You earned 100 points! ").fadeOut(3000, function() {
			$(this).text("");
		});
		return this;
	}

	focusOnInput(){
		$('#player-input').focus();
    return this;
	}

	startLevel(nextLevel) {
		document.addEventListener('keyup', function newLevel(event) {
			if (event.keyCode === 32) {
				nextLevel.clearInput().focusOnInput().render(0);
				nextLevel.bird.paused = false;
				nextLevel.bird.fall();
				this.removeEventListener('keyup', newLevel);
			}
		})
	}

	endGame() {
		// remove the keyup event listener-need to name it and move it to do this.
		if (this.number === 6) {
			$('#challenge-text').text("You won the game!!! Press enter to play again")
		} else {
			$('#challenge-text').text("Your bird fell. Press enter to try again")
		}
		if (highestScore(nextLevel.score, )){
			$('.you-have-high-score').text("Congratulations! You now have the highest score!")
		}
		this.clearInput();
		document.addEventListener('keyup', function(event) {
			if (event.keyCode === 13) {
				location.reload();
			};
		});
	}

	highestScore(currentScore, ){

	}

	nextLine(line) {
		if (this.thereIsAnotherLineInTheLevel(this.indexOfNextLine(line))) {
			this.render(this.indexOfNextLine(line)).clearInput();
		} else if (this.thereIsAnotherLevel()) {
			this.nextLevelMessage().bonusPoints().bonusPointsMessage()
			var nextLevel = new Level(this.number+1, this.score, this.bird)
			this.bird.paused = true;
			this.startLevel(nextLevel)
			$('#level').text(nextLevel.number);
			return nextLevel;
		} else { // the game is complete!
				this.endGame(highestScore);
		}

	}
}

module.exports = Level;
