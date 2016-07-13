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

	var Bird = __webpack_require__(1);
	var Level = __webpack_require__(2);
	var KeyStroke = __webpack_require__(4);
	var Game = __webpack_require__(5);

	var bird = new Bird(1);
	var highScore = localStorage['high score'] || 0;
	var levelOne = new Level(1, highScore, bird);

	document.addEventListener('keyup', function startLevelOne(event) {
		levelOne.removeInstructions();
		levelOne.render(0);
		bird.fall();
		this.removeEventListener('keyup', startLevelOne);
	});

	document.addEventListener('keyup', function keyStore(event) {
		var currentText = $('#challenge-text').text();
		var char = event.key;
		var levelNumber = Number($('#level').text());
		var level = new Level(levelNumber, Number($('#score').text()), bird);
		var stroke = new KeyStroke(char, currentText, level);
		stroke.score().prepareForNext().updateScoreCard();
	});

	window.addEventListener('load', function startGame(event) {
		var game = new Game();
		game.start();
	});

	window.addEventListener('keydown', function () {
		if (event.which == 8) {
			event.preventDefault();
		};
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var birdCanvas = document.getElementById("birdWindow");
	var Level = __webpack_require__(2);

	var birds = ['https://s3-us-west-1.amazonaws.com/ideabox/bird-1.png', 'https://s3-us-west-1.amazonaws.com/ideabox/bird-2.png', 'https://s3-us-west-1.amazonaws.com/ideabox/bird-3.png', 'https://s3-us-west-1.amazonaws.com/ideabox/bird-4.png', 'https://s3-us-west-1.amazonaws.com/ideabox/bird-5.png'];
	var index;

	setInterval(function () {
		index = index + 1 || 1;
	}, 500);

	var Bird = (function () {
		function Bird(level) {
			_classCallCheck(this, Bird);

			this.x = 300;
			this.y = 200;
			this.width = 10;
			this.height = 10;
			this.paused = false;
			this.ctx = birdCanvas.getContext('2d') || {};
		}

		_createClass(Bird, [{
			key: 'callImage',
			value: function callImage() {
				return animator.frame;
			}
		}, {
			key: 'level',
			value: (function (_level) {
				function level() {
					return _level.apply(this, arguments);
				}

				level.toString = function () {
					return _level.toString();
				};

				return level;
			})(function () {
				return new Level(level, Number($('#score').text()), this);
			})
		}, {
			key: 'reset',
			value: function reset() {
				this.x = 300;
				this.y = 200;
				return this;
			}
		}, {
			key: 'birdFrame',
			value: function birdFrame() {
				var image = new Image();
				image.src = birds[index % 5];
				return image;
			}
		}, {
			key: 'fall',
			value: function fall() {
				var _this = this;
				requestAnimationFrame(function gameLoop() {
					_this.ctx.clearRect(0, 0, 600, 600);
					if (_this.y > 375) {
						_this.level().endGame();
					} else if (_this.paused) {
						_this.ctx.drawImage(_this.birdFrame(), _this.x, _this.y);
					} else {
						//dropping
						_this.ctx.drawImage(_this.birdFrame(), _this.x, _this.y);
						_this.ctx.drawImage(_this.birdFrame(), _this.x, _this.y += _this.levelSpeed(level));
						requestAnimationFrame(gameLoop);
					}
				});
				return this;
			}
		}, {
			key: 'levelSpeed',
			value: function levelSpeed(level) {
				if (level === 1) {
					return 0.01;
				} else if (level === 2) {
					return 0.2;
				} else if (level === 3) {
					return 0.3;
				} else if (level === 4) {
					return 0.4;
				} else if (level === 5) {
					return 0.5;
				} else {
					return 0.6;
				}
			}
		}, {
			key: 'up',
			value: function up() {
				if (this.y > 20) {
					this.y -= 15;
				} else if (this.y < 10) {
					this.y = 11;
				} else {
					this.y = 20;
					this.y -= 1;
				}
			}
		}, {
			key: 'down',
			value: function down() {
				this.y += 10;
			}
		}]);

		return Bird;
	})();

	module.exports = Bird;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var texts = __webpack_require__(3);

	var Level = (function () {
		function Level(number, accumulatedScore, bird) {
			_classCallCheck(this, Level);

			this.number = number;
			this.challenge = texts.levelText[number];
			this.score = accumulatedScore || 0;
			this.indexCounter = 0;
			this.bird = bird;
		}

		_createClass(Level, [{
			key: 'endGame',
			value: function endGame() {
				// remove the keyup event listener-need to name it and move it to do this.
				if (this.number === 6) {
					$('#challenge-text').text("You won the game!!! Press enter to play again");
				} else {
					$('#challenge-text').text("Your bird fell. Press enter to try again");
				}
				if (this.score > localStorage['high score']) {
					$('.you-have-high-score').text("Congratulations! You now have the highest score!");
					localStorage['high score'] = this.score;
				}
				$(".high-score-box").text("Highest Score: " + localStorage['high score']);
				document.addEventListener('keyup', function (event) {
					if (event.keyCode === 13) {
						location.reload();
					};
				});
			}
		}, {
			key: 'removeInstructions',
			value: function removeInstructions() {
				$('.instructions').fadeOut(300, function () {
					$(this).text("");
				});
			}
		}, {
			key: 'preparedLine',
			value: function preparedLine(i) {
				var chars = this.challenge[i].split('');
				var wrapped = chars.map(function (char, index) {
					return "<span class='letter challenge-text my-grey' id='" + index + "'>" + char + "</span>";
				});
				return wrapped.join('');
			}
		}, {
			key: 'renderNewLine',
			value: function renderNewLine(prepared) {
				$("#challenge-text").html(prepared);
				$('#0').addClass('my-underline');
			}
		}, {
			key: 'render',
			value: function render(i) {
				this.renderNewLine(this.preparedLine(i));
				return this;
			}
		}, {
			key: 'indexOfNextLine',
			value: function indexOfNextLine(currentLine) {
				return this.challenge.indexOf(currentLine) + 1;
			}
		}, {
			key: 'thereIsAnotherLineInTheLevel',
			value: function thereIsAnotherLineInTheLevel(i) {
				if (this.challenge[i]) {
					return true;
				}
			}
		}, {
			key: 'thereIsAnotherLevel',
			value: function thereIsAnotherLevel() {
				if (this.number < 6) {
					return true;
				}
			}
		}, {
			key: 'nextLevelMessage',
			value: function nextLevelMessage() {
				$('#challenge-text').text("You finished level " + this.number + ", press spacebar to play level " + (this.number + 1));
				return this;
			}
		}, {
			key: 'bonusPoints',
			value: function bonusPoints() {
				this.score += 100;
				return this;
			}
		}, {
			key: 'bonusPointsMessage',
			value: function bonusPointsMessage() {
				$('#stats-message').text("You earned 100 points! ").fadeOut(3000, function () {
					$(this).text("");
				});
				return this;
			}
		}, {
			key: 'startLevel',
			value: function startLevel(nextLevel) {
				document.addEventListener('keyup', function newLevel(event) {
					if (event.keyCode === 32) {
						nextLevel.render(0);
						nextLevel.bird.paused = false;
						nextLevel.bird.fall();
						this.removeEventListener('keyup', newLevel);
					}
				});
			}
		}, {
			key: 'nextLine',
			value: function nextLine(line) {
				if (this.thereIsAnotherLineInTheLevel(this.indexOfNextLine(line))) {
					this.render(this.indexOfNextLine(line));
					return this;
				} else if (this.thereIsAnotherLevel()) {
					this.nextLevelMessage().bonusPoints().bonusPointsMessage();
					var nextLevel = new Level(this.number + 1, this.score, this.bird);
					this.bird.paused = true;
					this.startLevel(nextLevel);
					$('#level').text(nextLevel.number);
					return nextLevel;
				} else {
					// the game is complete!
					this.endGame();
				}
			}
		}]);

		return Level;
	})();

	module.exports = Level;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	exports.levelText = {
	  // __for developement__
	  // 1: [ "ab", "cd", "ef", "gh"],
	  // 2: [ "ij", "kl", "mn", "op"],
	  // 3: [ "qr", "st", "uv", "wx"],
	  // 4: [ "yz", "ba", "dc", "fe"],
	  // 5: [ "ji", "lk", "vn", "kd"],
	  // 6: [ "ha", "uh", "mq", "yb"]

	  //__actual challenge texts__

	  1: ["ene ite nee inet one ene ite etee tent at", "eat anne tea oat tea oat neat tea oat ina", "too toon too enot not enot not anot enota", "reat ran arrai errit aar tarie erren airo"],

	  2: ["asdir lne ndarh ardlo rleit iehn ecnt rth", "das ohds tdlo ocd irtd ascio set toln cde", "hao asr hresd tlera sah hdc deal ictea sn", "ither htd eihar cih tilsn orcse dliah tli"],

	  3: ["yug ltyrn ydlf lnm sen lys mwoy lhd cwlfu", "mtyhs glhmu fuwc hong secol olgw iua ghle", "hias mci dlyat mcg ahn hfa asmhf dal gumc", "ywio nho ewas mar fle mroew frey ahsd cwo"],

	  4: ["uenf svgme tcdfl agkuy hsp juf yel ynm nix", "ewiut hwtpm tdhjv vymn djkgo gjpc cymwv cj", "vdrd irmof rkn uvpxk ltdy vfin jikgu joh m", "dni kwu ncroi ehjxs dpek tsd vwldj kxd ntw"],

	  5: ["vel aut pariatur maxime reprehenderit amet", "repellendus et asperiores illo itaque quis", "facere quisquam officia et labore voluptas", "magnam iste architecto reprehenderit rerum"],

	  6: ["the quick brown fox jumps over the lazy dog", "woven silk pyjamas exchanged for blue quartz", "brawny gods flocked up to quiz and vex him", "waxy and quivering, jocks fumble the pizza", "quilt frenzy jackdaws gave them best pox"]

	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var currentIndex;

	var KeyStroke = (function () {
		function KeyStroke(char, currentText, level) {
			_classCallCheck(this, KeyStroke);

			this.char = char;
			this.currentText = currentText;
			this.level = level;
		}

		_createClass(KeyStroke, [{
			key: "scoreCorrect",
			value: function scoreCorrect() {
				this.level.score++;
				currentIndex = currentIndex + 1 || 0;
				this.correct = true;
			}
		}, {
			key: "scoreIncorrect",
			value: function scoreIncorrect() {
				this.level.score--;
				this.correct = false;
			}
		}, {
			key: "scoreBackspace",
			value: function scoreBackspace() {
				this.currentIndex--;
			}
		}, {
			key: "checkIfEndOfLine",
			value: function checkIfEndOfLine() {
				if (currentIndex == this.currentText.length) {
					this.level.nextLine(this.currentText);
					currentIndex = 0;
				};
			}
		}, {
			key: "score",
			value: function score() {
				currentIndex = currentIndex || 0;
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
			}
		}, {
			key: "updateScoreCard",
			value: function updateScoreCard() {
				$("#score").text(this.level.score);
			}
		}, {
			key: "prepareForNext",
			value: function prepareForNext() {
				currentIndex = currentIndex || 0;
				if (currentIndex === 0 && !this.char.match(/[a-z]/i)) {
					var thisLetter = "#" + currentIndex;
					$(thisLetter).fadeIn(100).fadeOut(80).fadeIn(80).fadeIn(80).fadeOut(80).fadeIn(80);
				} else if (this.correct && currentIndex < this.currentText.length) {
					var nextLetter = "#" + currentIndex;
					var thisLetter = "#" + (currentIndex - 1);
					$(thisLetter).removeClass('my-underline').removeClass('my-grey').removeClass('my-red');
					$(nextLetter).addClass('my-underline').removeClass('my-red');
				} else if (!this.correct && currentIndex < this.currentText.length) {
					var sameLetter = "#" + currentIndex;
					$(sameLetter).addClass('my-red').removeClass('my-underline').removeClass('my-grey');
					$(sameLetter).fadeIn(100).fadeOut(80).fadeIn(80).fadeIn(80).fadeOut(80).fadeIn(80);
				}
				return this;
			}
		}]);

		return KeyStroke;
	})();

	module.exports = KeyStroke;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var backgroundCanvas = document.getElementById("background");

	var Game = (function () {
			function Game() {
					_classCallCheck(this, Game);

					this.background = new Image();
					this.background.src = 'https://s3-us-west-1.amazonaws.com/ideabox/cloud-pic.png';
					this.backgroundPosition = 0;
					this.ctx = backgroundCanvas.getContext('2d');
					this.canvas = backgroundCanvas;
					this.canvas.width = 600;
					this.canvas.height = 400;
					this.renderScore();
			}

			_createClass(Game, [{
					key: 'start',
					value: function start() {
							var _this = this;
							var velocityX = 0;
							window.requestAnimationFrame(function cloudLoop() {
									requestAnimationFrame(cloudLoop);
									_this.ctx.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
									_this.ctx.drawImage(_this.background, velocityX, 0);
									_this.ctx.drawImage(_this.background, _this.background.width - Math.abs(velocityX), 0);
									if (Math.abs(velocityX) > _this.background.width) {
											velocityX = 0;
									}
									velocityX -= 1;
							});
					}
			}, {
					key: 'renderScore',
					value: function renderScore() {
							$(".high-score-box").text("Highest Score: " + localStorage['high score']);
					}
			}]);

			return Game;
	})();

	module.exports = Game;

/***/ }
/******/ ]);