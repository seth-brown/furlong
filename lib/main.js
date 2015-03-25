var d = require('./modules/distance.js')
  , m = require('./modules/metrics.js')
  , u = require('./modules/utility.js');

module.exports = (function() {
  var furlong = { version: "1.0.0" };
  furlong.distance      = d.distance
  furlong.euclidean     = m.euclidean
  furlong.manhattan     = m.manhattan
  furlong.braycurtis    = m.braycurtis
  furlong.chebyshev     = m.chebyshev
  furlong.canberra      = m.canberra                                     
  return furlong
}())
