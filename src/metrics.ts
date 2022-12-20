import * as uf from './utils';

import { Vector } from './protocols';

export const euclidean = (v1: Vector, v2: Vector) => {
  return Math.sqrt(
    v1
      .map((el, i) => {
        return Math.pow(el - v2[i], 2);
      })
      .reduce(uf.psum, 0)
  );
};

export const manhattan = (v1: Vector, v2: Vector) => {
  return v1
    .map((el, i) => {
      return Math.abs(el - v2[i]);
    })
    .reduce(uf.psum);
};

export const braycurtis = (v1: Vector, v2: Vector) => {
  const n = v1
    .map((el, i) => {
      return Math.abs(el - v2[i]);
    })
    .reduce(uf.psum);
  const d = uf.asum(v1) + uf.asum(v2);
  return n / d;
};

export const chebyshev = (v1: Vector, v2: Vector) => {
  return v1
    .map((el, i) => {
      return Math.abs(el - v2[i]);
    })
    .reduce(uf.pmax);
};

export const canberra = (v1: Vector, v2: Vector) => {
  return v1
    .reduce(function (acc, el, i) {
      const n = Math.abs(el - v2[i]);
      const d = Math.abs(el) + Math.abs(v2[i]);
      if (d !== 0) {
        acc.push(n / d);
      }
      return acc;
    }, [] as number[])
    .reduce(uf.psum);
};

export const hamming = (v1: Vector, v2: Vector) => {
  var cnts = v1.reduce(
    function (acc, el, i) {
      let si = el !== v2[i] ? 1 : 0;
      acc.s += si;
      acc.t += 1;
      return acc;
    },
    { s: 0, t: 0 }
  );
  return cnts.s / cnts.t;
};

export const metricNames = [
  'euclidean',
  'manhattan',
  'braycurtis',
  'chebyshev',
  'canberra',
  'hamming',
] as const;
