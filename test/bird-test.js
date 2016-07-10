const assert = require('chai').assert;
const Level = require('../lib/level')

describe ("Level", function(){
  context('with default attributes', function(){
    var level = new Level(1, 1);
    var level6 = new Level(6, 60);

    it('should assign a number', function(){
      assert.equal(level.number, 1);
    })
  }
}
