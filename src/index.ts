import * as metrics from './metrics'

import { Distance, Vector } from './protocols'

import { isVec } from './utils'
import { metricNames } from './metrics'

export const furlong = (d: Distance) => {
  let distFn = d === undefined ? metrics['euclidean'] : metrics[d]
  let fx: unknown
  let fy: unknown

  function g<
    VecObj1 extends Record<VecKey1, number>,
    VecKey1 extends keyof VecObj1,
    VecObj2 extends Record<VecKey2, number>,
    VecKey2 extends keyof VecObj2
  >(x: VecObj1[], y: VecObj2[]) {
    return g.distance(x, y)
  }

  g.distance = function <
    VecObj1 extends Record<VecKey1, number>,
    VecKey1 extends keyof VecObj1,
    VecObj2 extends Record<VecKey2, number>,
    VecKey2 extends keyof VecObj2
  >(x: VecObj1[] | Vector, y: VecObj2[] | Vector) {
    type Accessor1 = (v: VecObj1) => number
    type Accessor2 = (v: VecObj2) => number
    if (x.length !== y.length)
      throw new RangeError('Vectors must be of equivalent length')
    const hasAccessors = fx !== undefined && fy !== undefined
    const isVecs = isVec(x) && isVec(y)
    const notVecs = !isVec(x) && !isVec(y)
    if (isVecs) {
      x = x as Vector
      y = y as Vector
      return distFn(x as Vector, y as Vector)
    } else if (hasAccessors && notVecs) {
      x = x as VecObj1[]
      y = y as VecObj2[]
      fx = fx as Accessor1
      fy = fy as Accessor2
      return distFn(x.map(fx as Accessor1), y.map(fy as Accessor2))
    } else return 0
  }

  g.x = function <
    VecObj extends Record<VecKey, number>,
    VecKey extends keyof VecObj
  >(fn: (v: VecObj) => number) {
    fx = fn
    return g
  }

  g.y = function <
    VecObj extends Record<VecKey, number>,
    VecKey extends keyof VecObj
  >(fn: (v: VecObj) => number) {
    fy = fn
    return g
  }

  g.func = function (fn: (v1: number[], v2: number[]) => number) {
    distFn = fn
    return g
  }

  return g
}
