const Bird = require('./bird');

var levelText = {
	// __for developement__
	// 1: [ "abcdf", "cd", "ef", "gh"],
	// 2: [ "ij", "kl", "mn", "op"],
	// 3: [ "qr", "st", "uv", "wx"],
	// 4: [ "yz", "ba", "dc", "fe"],
	// 5: [ "ji", "lk", "vn", "kd"],
	// 6: [ "ha", "uh", "mq", "yb"]

	//__actual challenge texts__

	1: [
			"ene ite nee inet one ene ite etee tent aten ite inent",
			"eat anne tea oat tea oat neat tea oat inan ina anot",
			"too toon too enot not enot not anot enot one ato not",
			"reat ran arrai errit aar tarie erren air enroe ear"],
	2: [
			"A journey of a thousand miles begins with a single step",
			"Τhοse whο fοrget histοry are cοndemned tο repeat it",
			"Τhe prοοf οf the pudding is always in the eating",
			"Dο nοt cοunt yοur chickens befοre they are hatched",
			"Fοr want οf a nail the kingdοm was lοst"],
	3: [
			"Pack my box with five dozen liquor jugs",
			"The quick brown fox jumps over the lazy dog.",
			"A house which is divided against itself cannot stand",
			"Now is the time for all good men to come to the aid of their country.",
			"Ρeοple whο live in glass hοuses shοuld nοt thrοw stοnes",
			"As you can see in the title this is 'A very hard typing test text.'",
			"Someone must have the worldwide record as at least 60 seconds to he put up on my typing test wall!"],
	4: [
			"I will be checking this page every day to see if someone got this score. Most likely I will! Me!",
			"Do your best! I will do my best. Believe in yourself. ",
			",.?? \| ? [{[]}]+=+=+=+=```~~~~~",
			"That's awesome! Congratulations -- did you think it'd be so easy? Yes? No? Maybe?"],
	5: [
			"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit",
			"Mea at copiosae tincidunt quaerendum, velit signiferumque pro in.",
			"Ea vix nibh iudicabit, ut mel deleniti vulputate reformidans.",
			"Putent habemus ei sit. Te nisl legimus quo, dolorum vivendo interesset nam an",
			"Sed an detraxit accusata cotidieque, eum salutandi appellantur cu. Alii falli debitis sit no, vel id volutpat inciderint.",
			"Ceteros lobortis vix ea, an summo apeirian prodesset eos, mel vitae mentitum reprimique ex."],
	6: [
			"Nam ad graecis legendos, pri no fuisset maiestatis.",
			"Liber quando eu cum, vel sonet nonumy nostrum at. Vero mundi eu cum.",
			"Et nec vituperata assueverit, sit at officiis honestatis.",
			"Vix nisl iudico labore et. Eum graeci audire maluisset ut.",
			"Ex quem aperiri mediocritatem quo. Prompta ceteros no vix.",
			"Mea ipsum causae antiopam ne, et expetenda incorrupte eam"],
}

class Level {
	constructor(number, accumulatedScore) {
		this.number = number;
		this.challenge = levelText[number];
		this.score = accumulatedScore || 0;
		this.indexCounter = 0;
	}

	preparedLine(i) {
		//testable
		var chars = this.challenge[i].split('');
		var wrapped = chars.map(function(char, index) {
			return "<span class='letter grey' id='" + index + "'>" + char + "</span>";
		});
		return wrapped.join('');
	}

	renderNewLine(prepared) {
		//not testable
		$("#challenge-text").html(prepared);
		$('#0').addClass('underline');
	}

	render(i) {
		//not testable
		this.renderNewLine(this.preparedLine(i));
		return this;
	}

	indexOfNextLine(currentLine) {
		//test
		return this.challenge.indexOf(currentLine) + 1
	}

	thereIsAnotherLineInTheLevel(i) {
		//test
		if (this.challenge[i]) { return true }
	}

	clearInput() {
		//not testable
		$('#player-input').val('');
		return this;
	}

	thereIsAnotherLevel() {
		//test
		if (this.number < 6) { return true; }
	}

	nextLevelMessage() {
		$('#challenge-text').html("<h3>You finished level " + this.number +
		", press spacebar to play level " + (this.number + 1) + "</h3>")
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
				var bird = new Bird();
				bird.fall();
				this.removeEventListener('keyup', newLevel);
			}
		})
	}

	nextLine(line) {
		if (this.thereIsAnotherLineInTheLevel(this.indexOfNextLine(line))) {
			this.render(this.indexOfNextLine(line)).clearInput();
		} else if (this.thereIsAnotherLevel()) {
			this.nextLevelMessage().bonusPoints().bonusPointsMessage()
			var nextLevel = new Level(this.number+1, this.score)
			this.startLevel(nextLevel)
			$('#level').text(nextLevel.number);
			return nextLevel;
		} else { // the game is complete!
			$('#challenge-text').html("<h3>You won the game!!! Press enter to play again</h3>")
			this.clearInput();
			//enter your name to save your high score! (learn to save things)
			document.addEventListener('keyup', function(event) {
				if (event.keyCode === 13) { location.reload(); };
			})
		}
	}
}

module.exports = Level;
