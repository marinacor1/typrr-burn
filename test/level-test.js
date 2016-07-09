const assert = require('chai').assert;
const Level = require('../lib/level')

describe ("Level", function(){
  context('with default attributes', function(){
    var level = new Level(1, 1);
    arrayTexts = [ "abcdf", "cd", "ef", "gh"]
    // var levelTexts = {	1: [ "abcdf", "cd", "ef", "gh"],
    	// 2: [ "ij", "kl", "mn", "op"],
    	// 3: [ "qr", "st", "uv", "wx"],
    	// 4: [ "yz", "ba", "dc", "fe"],
    	// 5: [ "ji", "lk", "vn", "kd"],
    	// 6: [ "ha", "uh", "mq", "yz"]}

    it('should assign a number', function(){
      assert.equal(level.number, 1);
    })

    it('should assign a challenge', function(){
      assert.equal(level.challenge, arrayTexts)
    })
  })
})
