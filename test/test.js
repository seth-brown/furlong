var assert = require("assert")
var m = require('../lib/modules/metrics.js')
var di = require('../lib/modules/distance.js').distance

  , arr3 = [0,1,4]

function vectorLengthError() {
  throw new Error('Vectors must be of equivalent length')
}

describe('furlong', function() {
  var a1 = [0,1,2]
  var a2 = [
             {'a': 72, 'b': 23}
           , {'a': 21, 'b': 90}
           , {'a': 0, 'b': 32}
           , {'a': 57, 'b': 14}
           ]

  var edv = di(m.euclidean)               // vector distances
  var edvn = di('euclidean')              // vector distances by name
  var eda = di(m.euclidean)               // accessor distance
    .x(function(d) { return d.a })
    .y(function(d) { return d.a })
  var stub = di(function(v1, v2) {        // custom func
      return 0;
    })
    .x(function(d) { return d.a })
    .y(function(d) { return d.b })

  describe('#distance()', function(){
    it('should return 0 or 100 with arity of 1', function() {
      var eda2 = eda.y(function(d) { return d.b })
      assert.equal(0, stub(a2))
      assert.equal(100, Math.round(eda2(a2)))
    })
  })

  describe('#distance()', function(){
    it('should return 0 or 100 with arity of 1 by name', function() {
      assert.equal(0, edvn(a1, a1))
      assert.equal(100, edvn([0,0,0],[0,0,100]))
    })
  })

  describe('#distance()', function(){
    it('should throw error with vectors of different lengths', function() {
      assert.throws(function() { edv(a1, a1.slice(1)) }, Error)
      assert.throws(function() { eda(a2, a2.slice(1)) }, Error)
    })
  })

  describe('#distance()', function(){
    it('should return a distance of 0', function() {
      assert.equal(0, stub([0, 0],[0, 0]))
    })
  })
})

describe('metrics', function() {
  var a1 = [0,1,2]
  var a2 = [
             {'a': 72, 'b': 23}
           , {'a': 21, 'b': 90}
           , {'a': 0, 'b': 32}
           , {'a': 61, 'b': 11}
           ]
  var edv = di(m.euclidean)
  var eda = di(m.euclidean)
    .x(function(d) { return d.a })
    .y(function(d) { return d.a })

  var mdv = di(m.manhattan)
  var mda = di(m.manhattan)
    .x(function(d) { return d.a })
    .y(function(d) { return d.a })

  var bdv = di(m.braycurtis)
  var bda = di(m.braycurtis)
    .x(function(d) { return d.a })
    .y(function(d) { return d.a })

  var chdv = di(m.chebyshev)
  var chda = di(m.chebyshev)
    .x(function(d) { return d.a })
    .y(function(d) { return d.a })

  var cadv = di(m.canberra)
  var cada = di(m.canberra)
    .x(function(d) { return d.a })
    .y(function(d) { return d.a })

  var hadv = di('hamming')
  var hada = di('hamming')
    .x(function(d) { return d.a })
    .y(function(d) { return d.a })

  describe('#hamming()', function(){
    it('should return 0', function() {
      assert.equal(0, hadv([0,0,0],[100,100,100]))
    })
    it('should return 1', function() {
      assert.equal(1, hadv(a1, a1))
      assert.equal(1, hada(a2, a2))
    })
  })

  describe('#manhattan()', function(){
    it('should return 100', function() {
      assert.equal(100, mdv([0,0,0],[0,0,100]))
    })
    it('should return 0', function() {
      assert.equal(0, mdv(a1, a1))
      assert.equal(0, mda(a2, a2))
    })
  })
  describe('#braycurtis()', function(){
    it('should return 1', function() {
      assert.equal(1, bdv([0,0,0],[0,0,100]))
    })
    it('should return 0', function() {
      assert.equal(0, bdv(a1, a1))
      assert.equal(0, bda(a2, a2))
    })
  })
  describe('#chebyshev()', function(){
    it('should return 100', function() {
      assert.equal(100, chdv([0,0,0],[0,0,100]))
    })
    it('should return 0', function() {
      assert.equal(0, chdv(a1, a1))
      assert.equal(0, chda(a2, a2))
    })
  })
  describe('#canberra()', function(){
    it('should return 1', function() {
      assert.equal(1, cadv([0,0,0],[0,0,100]))
    })
    it('should return 0', function() {
      assert.equal(0, cadv(a1, a1))
      assert.equal(0, cada(a2, a2))
    })
  })
})
