const assert = require('chai').assert;
const Bird = require('../lib/bird');

describe ("Bird", function(){
  context('with default attributes', function(){
    var bird = { x: 300, y: 200, width: 10, height: 10, paused: false}

    it('should assign an x value', function(){
      assert.equal(bird.x, 300);
    });

    it('should assign a y value', function(){
      assert.equal(bird.y, 200);
    });

    it('should assign a width', function(){
      assert.equal(bird.width, 10);
    });

    it('should assign a height', function(){
      assert.equal(bird.height, 10);
    });
  });

  });
