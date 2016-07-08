/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var counter = 0;
	var previousCharacter = null;

	var Scorecard = __webpack_require__(1);
	var Bird = __webpack_require__(2);
	var Level = __webpack_require__(3);
	var KeyStroke = __webpack_require__(4);

	var scorecard = new Scorecard();
	var bird = new Bird();
	var levelOne = new Level(1);

	var playerInput = document.getElementById("player-input");
	var startButton = document.getElementById("start-button");

	startButton.addEventListener('click', function () {
		$("#player-input").focus();
		levelOne.render(levelOne.number);
		bird.fall();
		this.remove();
	});

	playerInput.addEventListener('keyup', function keyStore(event) {
		var currentText = $('#challenge-text').text();
		var char = event.key;
		var currentIndex = $("#player-input").val().length - 1;
		var level = new Level(Number($('#level').text()), Number($('#score').text()));
		var stroke = new KeyStroke(char, currentText, currentIndex, level, bird, scorecard);
		stroke.score().prepareForNext();
		scorecard.updateScore();
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Scorecard = (function () {
		function Scorecard() {
			_classCallCheck(this, Scorecard);

			this.birdPoints = 0;
		}

		_createClass(Scorecard, [{
			key: "updateScore",
			value: function updateScore() {
				$("#score").text(this.birdPoints);
				return this;
			}
		}]);

		return Scorecard;
	})();

	module.exports = Scorecard;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var birdCanvas = document.getElementById("birdWindow");

	var Bird = (function () {
		function Bird() {
			_classCallCheck(this, Bird);

			this.x = 10;
			this.y = 150;
			this.width = 10;
			this.height = 10;
			this.ctx = birdCanvas.getContext('2d');
		}

		_createClass(Bird, [{
			key: "fall",
			value: function fall() {
				var _this = this;
				requestAnimationFrame(function gameLoop() {
					_this.ctx.fillStyle = "black";
					_this.ctx.clearRect(0, 0, 300, 300);
					_this.ctx.fillRect(50, _this.y += 0.25, 10, 10);
					requestAnimationFrame(gameLoop);
				});
				return this;
			}
		}, {
			key: "up",
			value: function up() {
				this.y -= 15;
				return this;
			}
		}, {
			key: "down",
			value: function down() {
				this.y += 15;
				return this;
			}
		}]);

		return Bird;
	})();

	module.exports = Bird;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Bird = __webpack_require__(2);

	var levelText = {
		// __for developement__
		1: [null, "ab", "cd", "ef", "gh"],
		2: [null, "ij", "kl", "mn", "op"],
		3: [null, "qr", "st", "uv", "wx"],
		4: [null, "yz", "ba", "dc", "fe"],
		5: [null, "ji", "lk", "vn", "kd"],
		6: [null, "ha", "uh", "mq", "yb"]

		//__actual challenge texts__

		// 1: [ null,
		// 		"ene ite nee inet one ene ite etee tent aten ite inent",
		// 		"eat anne tea oat tea oat neat tea oat inan ina anot",
		// 		"too toon too enot not enot not anot enot one ato not",
		// 		"reat ran arrai errit aar tarie erren air enroe ear"],
		// 2: [ null,
		// 		"A journey of a thousand miles begins with a single step",
		// 		"Τhοse whο fοrget histοry are cοndemned tο repeat it",
		// 		"Τhe prοοf οf the pudding is always in the eating",
		// 		"Dο nοt cοunt yοur chickens befοre they are hatched",
		// 		"Fοr want οf a nail the kingdοm was lοst"],
		// 3: [ null,
		// 		"Pack my box with five dozen liquor jugs",
		// 		"The quick brown fox jumps over the lazy dog.",
		// 		"A house which is divided against itself cannot stand",
		// 		"Now is the time for all good men to come to the aid of their country.",
		// 		"Ρeοple whο live in glass hοuses shοuld nοt thrοw stοnes",
		// 		"As you can see in the title this is 'A very hard typing test text.'",
		// 		"Someone must have the worldwide record as at least 60 seconds to he put up on my typing test wall!"],
		// 4: [ null,
		// 		"I will be checking this page every day to see if someone got this score. Most likely I will! Me!",
		// 		"Do your best! I will do my best. Believe in yourself. ",
		// 		",.?? \| ? [{[]}]+=+=+=+=```~~~~~",
		// 		"That's awesome! Congratulations -- did you think it'd be so easy? Yes? No? Maybe?"],
		// 5: [ null,
		// 		"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit",
		// 		"Mea at copiosae tincidunt quaerendum, velit signiferumque pro in.",
		// 		"Ea vix nibh iudicabit, ut mel deleniti vulputate reformidans.",
		// 		"Putent habemus ei sit. Te nisl legimus quo, dolorum vivendo interesset nam an",
		// 		"Sed an detraxit accusata cotidieque, eum salutandi appellantur cu. Alii falli debitis sit no, vel id volutpat inciderint.",
		// 		"Ceteros lobortis vix ea, an summo apeirian prodesset eos, mel vitae mentitum reprimique ex."],
		// 6: [ null,
		// 		"Nam ad graecis legendos, pri no fuisset maiestatis.",
		// 		"Liber quando eu cum, vel sonet nonumy nostrum at. Vero mundi eu cum.",
		// 		"Et nec vituperata assueverit, sit at officiis honestatis.",
		// 		"Vix nisl iudico labore et. Eum graeci audire maluisset ut.",
		// 		"Ex quem aperiri mediocritatem quo. Prompta ceteros no vix.",
		// 		"Mea ipsum causae antiopam ne, et expetenda incorrupte eam"],
	};

	var Level = (function () {
		function Level(number, accumulatedScore) {
			_classCallCheck(this, Level);

			this.number = number;
			this.challenge = levelText[number];
			this.score = accumulatedScore || 0;
			this.counter = 0;
			this.indexCounter = 0;
		}

		_createClass(Level, [{
			key: "render",
			value: function render(i) {
				var chars = this.challenge[i].split('');
				var wrapped = chars.map(function (char, index) {
					return "<span class='letter' id='" + i + "'>" + char + "</span>";
				});
				$("#challenge-text").html(wrapped.join(""));
				return this;
			}
		}, {
			key: "nextLine",
			value: function nextLine(line) {
				console.log("line: ", line);
				console.log("current challenge:", this.challenge);
				var index = this.challenge.indexOf(line) + 1;
				if (this.challenge[index]) {
					this.render(index);
					$('#player-input').val('');
					return this;
				} else if (this.number < 6) {
					console.log("level finished: ", this.number);
					$('#player-input').val('');
					$('#challenge-text').html("<h1>You finished level " + this.number + ", press start to play level " + (this.number + 1) + "</h1>");
					$('#button-div').html("<button id='new-start-button' type='button' name='button'>start</button>");
					var nextLevel = new Level(this.number + 1, this.score + 100);
					console.log("nextLevel: ", nextLevel.number);
					$('#new-start-button').on('click', function () {
						$('#player-input').focus();
						console.log("start nextLevel: ", nextLevel.number);
						nextLevel.render(1);
						var bird = new Bird();
						bird.fall();
						this.remove;
					});
					$('#level').text(nextLevel.number);
					console.log("nextLevel:", nextLevel);
					return nextLevel;
				} else {
					$('#challenge-text').html("<h1>You won the game!!!</h1>");
					debugger;
					$('#reset-button').toggleClass("hidden");

					$('#player-input').val('');
					//enter your name to save your high score! (learn to save things)
				}
			}
		}]);

		return Level;
	})();

	module.exports = Level;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var KeyStroke = (function () {
		function KeyStroke(char, currentText, currentIndex, level, bird, scorecard) {
			_classCallCheck(this, KeyStroke);

			this.char = char;
			this.currentText = currentText;
			this.currentIndex = currentIndex;
			this.level = level;
			this.bird = bird;
			this.scorecard = scorecard;
		}

		_createClass(KeyStroke, [{
			key: "score",
			value: function score() {
				if (this.char === this.currentText[this.currentIndex]) {
					// console.log("correct!")
					this.scorecard.birdPoints++;
					// console.log("birdPoints:", this.scorecard.birdPoints)
					this.level.counter++;
					// console.log("counter:", this.level.counter)
					this.level.indexCounter++;
					// console.log("indexCounter:", this.level.indexCounter)
					this.bird.up();
					this.correct = true;
					if (this.currentIndex + 1 === this.currentText.length) {
						this.level.nextLine(this.currentText);
					}
					return this;
				} else if (this.char === "Backspace") {
					// console.log("Backspace!")
					// console.log("birdPoints:", this.scorecard.birdPoints)
					this.level.counter--;
					// console.log("counter:", this.level.counter)
					this.level.indexCounter--;
					// console.log("indexCounter:", this.level.indexCounter)
					// should this.correct equal true or false?
					return this;
				} else {
					// console.log("wrong!")
					this.scorecard.birdPoints--;
					// console.log("birdPoints:", this.scorecard.birdPoints)
					this.level.counter++;
					// console.log("counter:", this.level.counter)
					// console.log("indexCounter:", this.level.indexCounter)
					this.bird.down();
					this.correct = false;
					return this;
				};
			}
		}, {
			key: "prepareForNext",
			value: function prepareForNext() {
				if (this.correct) {
					// console.log("right!, preparing...")
					// console.log("birdPoints:", this.scorecard.birdPoints)
					// console.log("counter:", this.level.counter)
					// console.log("indexCounter:", this.level.indexCounter)
					return this;
				} else if (this.char === "Backspace") {
					// console.log("backspace!, preparing...")
					// console.log("birdPoints:", this.scorecard.birdPoints)
					// console.log("counter:", this.level.counter)
					// console.log("indexCounter:", this.level.indexCounter)
					return this;
				} else {
					// console.log("wrong!, preparing...")
					// console.log("birdPoints:", this.scorecard.birdPoints)
					// console.log("counter:", this.level.counter)
					// console.log("indexCounter:", this.level.indexCounter)
					return this;
				}
			}
		}]);

		return KeyStroke;
	})();

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

/***/ }
/******/ ]);