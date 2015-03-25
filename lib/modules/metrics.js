var uf = require('./utility.js');

var euclidean = function(v1, v2) {
  return Math.sqrt(v1.map(function(el, i) { 
    return Math.pow(el - v2[i], 2) 
  })
  .reduce(uf.psum, 0));
}

var manhattan = function(v1, v2) {
  return v1.map(function(el, i) { return Math.abs(el - v2[i]) }).reduce(uf.psum)
}

var braycurtis = function(v1, v2) {
  var n = v1.map(function(el, i) { return Math.abs(el - v2[i]) })
    .reduce(uf.psum)
    , d = uf.asum(v1) + uf.asum(v2)
  return n / d;
}

var chebyshev = function(v1, v2) {
  return v1.map(function(el, i) { return Math.abs(el - v2[i]) })
    .reduce(uf.pmax)
}

var canberra = function(v1, v2) {
  return v1.reduce(function(acc, el, i) { 
    var n = Math.abs(el - v2[i])
      , d = Math.abs(el) + Math.abs(v2[i])
    if (d !== 0) {
      acc.push(n / d)
    }
    return acc;
  }, [])
  .reduce(uf.psum)
}

// Hamming distance
var hamming = function(v1, v2) {
  var cnts = v1.reduce(function(acc, el, i) {
    si = el === v2[i] ? 1: 0
    acc.s += si
    acc.t += 1
    return acc
  }, {s: 0, t: 0});
  return cnts.s / cnts.t;
}

module.exports = {
    euclidean: euclidean
  , manhattan: manhattan
  , braycurtis: braycurtis
  , chebyshev: chebyshev
  , canberra: canberra
  , hamming: hamming
}
