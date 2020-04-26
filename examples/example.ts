//  NODE_PATH=src ts-node examples/example.ts

import { furlong } from './../src/index'

const v1 = [1,2,3]
const v2 = [2,4,6]
const metricData = [ 
                     {name: 'euclidean', value: '3.74'}
                   , {name: 'manhattan', value: '6.00'}
                   , {name: 'braycurtis', value: '0.33'}
                   , {name: 'chebyshev', value: '3.00'}
                   , {name: 'canberra', value: '1.00'}
                   , {name: 'hamming', value: '1.00'}
                   ] as const

const t = metricData.map(d => d.value)
const res1 = metricData.map(d => {
  return furlong(d.name)
           .distance(v1, v2)
})
console.log(res1)

///////////////////////////////////////////////////////////////////////////////

const distanceFunc = furlong('chebyshev')
                       .x((d:any) => d.foo)
                       .y((d:any) => d.bar)

const vectorA = [ {'foo': 12} , {'foo': 7} , {'foo': 0} ]
const vectorB = [ {'bar': 6} , {'bar': 32} , {'bar': 27} ]
const res2 = distanceFunc
              .distance(vectorA, vectorB)
              .toFixed(2)
console.log(res2)
