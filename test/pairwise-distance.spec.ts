import { pairwiseDistance } from "./../src/index";

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

test("incompatible vector length", () => {
  expect(()=> {
    pairwiseDistance().distance([1],[1,2])
  })
  .toThrow(RangeError)
})

test("distances calculations", () => {
  const t = metricData.map(d => d.value)
  const res = metricData.map(d => {
    return pairwiseDistance(d.name)
             .distance(v1, v2)
             .toFixed(2)
  })
  expect(t).toEqual(res);
})

test("custom function", () => {
  const dis = (v1:number[], v2:number[]) => 1
  const res = pairwiseDistance()
              .func(dis)
              .x((d:any) => d.x)
              .y((d:any) => d.y)
              .distance([{x:0,y:0}], [{x:0,y:0}])
  expect(res).toEqual(1);
})
