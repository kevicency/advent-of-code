import { isEmpty, map } from 'lodash'

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

export const log = <T>(obj: T): T => {
  // eslint-disable-next-line no-console
  console.log(obj)
  return obj
}
export const logEach = <T>(arr: T[]): T[] => map(arr, log)
export const logEachWithIndex = <T>(arr: T[]): T[] =>
  map(arr, (x, i) => log([i, x]) && x)

export const lines = (contents: string): string[] =>
  contents
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => !isEmpty(line))

export const length = (collection: any[]): number => collection.length
