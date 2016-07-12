const assert = require('chai').assert;
const Bird = require('../lib/bird')

describe ("Bird", function(){
  context('with default attributes', function(){
    var bird = new Bird();

    it('should assign an x value', function(){
      assert.equal(bird.x, 10);
    })

    it('should assign a y value', function(){
      assert.equal(bird.y, 150);
    })

    it('should assign a width', function(){
      assert.equal(bird.width, 10);
    })

    it('should assign a height', function(){
      assert.equal(bird.height, 10);
    })
  })

  context('with game functionality', function(){
    var initial_bird = new Bird();

    it('will go up from default', function(){
      assert.equal(initial_bird.up.y, 135);
    });

    it('will go down from default', function(){
      assert.equal(initial_bird.down.y, 165)
    });
  });
});
