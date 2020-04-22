import * as metrics from './metrics'

const metricNames = [ 'euclidean'
                    , 'manhattan'
                    , 'braycurtis'
                    , 'chebyshev'
                    , 'canberra'
                    , 'hamming'
                    ] as const;

type Distance = typeof metricNames[number] | void
type Vector = any[]
type PairwiseVectors = {v1: Vector, v2: Vector}

/* PairwiseDistance implements a closure over several free variables, namely, a
 * distance function and optional accessor functions, x and y.
 */ 
export function pairwiseDistance(d:Distance) {

  let distFn = d === undefined ? metrics['euclidean'] : metrics[d]
  let fx:any
  let fy:any

  function g(x:Vector, y:Vector) {
    return g.distance(x, y)
  }

  g.distance = function(x:Vector, y:Vector) {
    if (x.length !== y.length) 
      throw new RangeError('Vectors must be of equivalent length')
    return (fx && fy)
      ? distFn(x.map(fx), y.map(fy)) 
      : distFn(x, y)
  }

  g.x = function(fn:any) {
    fx = fn
    return g
  }

  g.y = function(fn:any) {
    fy = fn
    return g
  }

  g.func = function(fn:any) {
    distFn = fn
    return g
  }

  return g;
}
