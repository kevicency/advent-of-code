import { curryRight } from 'lodash'
import {
  countBy,
  flow,
  identity,
  map,
  mapValues,
  max,
  mean,
  reduce,
  sortBy,
} from 'lodash/fp'
import { Problem } from '../../Problem'
import inputTxt from './input.txt'
import description from './PROBLEM.md'

const input = inputTxt.split('\n')

export default {
  input,
  description,

  solve: () => flow(map(computeSeatId), max)(input),
  solveBonus: () =>
    flow(
      map(computeSeatId),
      sortBy(identity),
      reduce(
        ({ last, result }, seatId) => {
          return seatId === last + 2 && !result
            ? {
                last: seatId,
                result: seatId - 1,
              }
            : {
                last: seatId,
                result,
              }
        },
        { last: Number.MIN_VALUE, result: 0 }
      )
    )(input).result,
} as Problem

export function computeSeatId(seatOrIdentifier: Seat | string): number {
  if (typeof seatOrIdentifier === 'string') {
    return computeSeatId(computeSeat(seatOrIdentifier))
  }
  return seatOrIdentifier.row * 8 + seatOrIdentifier.col
}
export function computeSeat(identifier: string): Seat {
  return flow(
    countBy(
      (x: string) =>
        ({
          F: 'row',
          B: 'row',
          L: 'col',
          R: 'col',
        }[x])
    ),
    mapValues((pow) => 2 ** pow - 1),
    mapValues((max) => [0, max]),
    curryRight(divideAndConquer)(identifier)
  )(identifier)
}

export function divideAndConquer(
  { row, col }: Boundaries,
  identifier: string
): Seat {
  if (!identifier) {
    return { row: mean(row), col: mean(col) }
  }

  const [head, tail] = [identifier[0], identifier.slice(1)]

  switch (head) {
    case 'F':
      return divideAndConquer({ row: takeLowerHalf(row), col }, tail)
    case 'B':
      return divideAndConquer({ row: takeUpperHalf(row), col }, tail)
    case 'L':
      return divideAndConquer({ row, col: takeLowerHalf(col) }, tail)
    case 'R':
      return divideAndConquer({ row, col: takeUpperHalf(col) }, tail)
    default:
      divideAndConquer({ row, col }, tail)
  }
}

export const takeLowerHalf = ([min, max]: Boundary): Boundary => [
  min,
  max - Math.ceil((max - min) / 2),
]
export const takeUpperHalf = ([min, max]: Boundary): Boundary => [
  min + Math.ceil((max - min) / 2),
  max,
]

export type Seat = { row: number; col: number }
export type Boundary = [number, number]
export interface Boundaries {
  row: Boundary
  col: Boundary
}
