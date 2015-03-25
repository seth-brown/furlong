var m = require('./metrics.js')

var errorVectorLength = function() {
  throw new Error('Vectors must be of equivalent length')
}

var distance = function(df) {

  if ((typeof df === 'string') && (df in m)) {
    df = m[df]
  }

  var fx, fy;
  var g = function(v1, v2) { 
    if (arguments.length === 1) {
      x = v1, y = v1
      return g._value(x, y)
    } else {
      if (v1.length !== v2.length) { 
        errorVectorLength()
      }
      x = v1, y = v2
      return g._value(x, y)
    }
  }

  g.x = function(fn) { 
    if (arguments.length) {
      fx = fn
      return this;
    } 
  }
  g.y = function(fn) { 
    if (arguments.length) {
      fy = fn
      return this;
    } 
  }

  g._value = function(v1, v2) {
    if ((fx) && (fy)) {
      return df(v1.map(fx), v2.map(fy)) 
    } else {
      return df(v1, v2)
    }
  }

  return g
}

module.exports.distance = distance;
