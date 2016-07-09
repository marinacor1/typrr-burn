const assert = require('chai').assert;
const Level = require('../lib/level')

describe ("Level", function(){
  context('with default attributes', function(){
    var level = new Level(1, 1);

    it('should assign a number', function(){
      assert.equal(level.number, 1);
    })

    it('should assign a challenge', function(){
      assert.equal(level.challenge[0],  'abcdf');
    })

    it('should assign a score', function(){
      assert.equal(level.score, 1)
    })

    it('should assign start the index counter', function(){
      assert.equal(level.indexCounter, 0)
    })

    it('should assign a score', function(){
      assert.equal(level.score, 1)
    })


  })
})
