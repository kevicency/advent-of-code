import { map } from 'lodash'
export interface MapWithIndex<T = any, R = any> {
  (array: Array<T>): R[]
}

function mapWithIndex<T, R>(fn: (x: T, i: number) => R): MapWithIndex<T, R> {
  return (arr: T[]) => map(arr, (x, i) => fn(x, i))
}

export function pairWithIndexFn<T>(): MapWithIndex<T, [T, number]> {
  return (arr: T[]) => mapWithIndex<T, [T, number]>((x: T, i) => [x, i])(arr)
}

export const pairWithIndex = <T>(arr: T[]): [T, number][] =>
  pairWithIndexFn<T>()(arr)
