import { furlong } from './../src/index';

const v1 = [1, 2, 3];
const v2 = [2, 4, 6];

const metricData = [
  { name: 'euclidean', value: '3.74' },
  { name: 'manhattan', value: '6.00' },
  { name: 'braycurtis', value: '0.33' },
  { name: 'chebyshev', value: '3.00' },
  { name: 'canberra', value: '1.00' },
  { name: 'hamming', value: '1.00' },
] as const;

test('incompatible vector length', () => {
  expect(() => {
    furlong().distance([1], [1, 2]);
  }).toThrow(RangeError);
});

test('distances calculations', () => {
  const t = metricData.map((d) => d.value);
  const res = metricData.map((d) => {
    return furlong(d.name).distance(v1, v2).toFixed(2);
  });
  expect(t).toEqual(res);
});

test('custom function', () => {
  type O = { x: number; y: number };
  const dis = (v1: number[], v2: number[]) => 1;
  const res = furlong()
    .func(dis)
    .x((d: O) => d.x)
    .y((d: O) => d.y)
    .distance([{ x: 0, y: 0 }], [{ x: 0, y: 0 }]);
  expect(res).toEqual(1);
});
