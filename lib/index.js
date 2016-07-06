var birdCanvas = document.getElementById("birdWindow")
var playerInput = document.getElementById("player-input")
var counter = 0;
var birdPoints = 0;
var indexCounter = 0;
var birdContext = birdCanvas.getContext("2d");

function bird() {
	this.x = 10;
	this.y= 150;

	this.width = 10;
	this.height = 10;
}

// function text(string){
// 	this.content = string;
// }

var myBird = new bird();

bird.prototype.draw = function(){
	birdContext.fillStyle = "black";
	birdContext.fillRect(this.x, this.y, this.width, this.height);
	return this;
}

bird.prototype.move = function(){
	this.x++;
}

playerInput.addEventListener('keyup', function(event){
	var challengeText = $('#challenge-text').text()
	var currentKey = event.key;

  if (currentKey === challengeText[indexCounter]) {
    birdPoints++;
    counter++;
		indexCounter++;
	}else if (currentKey === "Backspace"){
		counter--;
	} else {
			birdPoints--;
			counter++;
		}
  console.log("Points:", birdPoints);
	console.log("Counter:", counter);
	console.log("Index Counter:", indexCounter);
	console.log("Correct key:", challengeText[indexCounter])
	console.log("Current Key", currentKey)
})

	// if (challengeText.indexOf(currentKey) >= 0){
	// 	console.log("yay!1")
	// } else {
	// 	console.log("noooo :(")
	// }

// })

window.addEventListener("keyup", function(event){
	myBird.draw();
	console.log(event.key);
	myBird.move();
	// console.log(myBird);
})
