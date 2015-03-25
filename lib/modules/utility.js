// partial functions
var psum = function(acc, el) { return acc + el; }
var psqd = function(el) { return Math.pow(el, 2) }
var pmax = function(acc, el) { return acc = el < acc ? acc: el; }

// array functions
var asum = function(a) { return a.reduce(psum) }
// var asqd = function(a) { return a.map(psqd) }
var norm = function(a) { return Math.sqrt(a.map(psqd).reduce(psum)) }

module.exports = {
    psum: psum
  , norm: norm
  , asum: asum
  , pmax: pmax
}
