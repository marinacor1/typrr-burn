const assert = require('chai').assert;
const Level = require('../lib/level')

describe ("Level", function(){
  context('with default attributes', function(){
    var level = new Level(1, 1);
    var level6 = new Level(6, 60);

    it('should assign a number', function(){
      assert.equal(level.number, 1);
    })

    it('should assign a challenge', function(){
      assert.equal(level.challenge[0],  "abcdf");
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

    xit('should prepare a line', function(){
      var prepared = level.preparedLine(0)
     var expected = ''
      assert.equal(prepared,expected)
    })

    it('finds the index of the next line', function(){
      assert.equal(level.indexOfNextLine("abcdf"), 1)
    })

    it('knows if there is another line', function(){
      assert.equal(level.thereIsAnotherLineInTheLevel(1), true)
      assert.equal(level.thereIsAnotherLineInTheLevel(100), undefined)
    })

    it("knows if there is another level", function(){
      assert.equal(level.thereIsAnotherLevel(), true)
      assert.equal(level6.thereIsAnotherLevel(), undefined)
    })

    it("adds bonus points at end of another level", function(){
      assert.equal(level.score, 1 )
      level.bonusPoints();
      assert.equal(level.score, 101 )
    })
  })
})
