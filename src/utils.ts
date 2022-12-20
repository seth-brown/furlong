import { Vector } from './protocols'

// partial functions
export const psum = (acc: number, el: number) => {
  return acc + el
}
export const psqd = (el: number) => {
  return Math.pow(el, 2)
}
export const pmax = (acc: number, el: number) => {
  return (acc = el < acc ? acc : el)
}

// array functions
export const asum = (a: number[]) => a.reduce(psum)
export const norm = (a: number[]) => Math.sqrt(a.map(psqd).reduce(psum))

// type guards
export const isVec = (value: unknown): value is Vector => {
  if (!Array.isArray(value)) {
    return false
  }

  if (value.some((v) => typeof v !== 'number')) {
    return false
  }

  return true
}
