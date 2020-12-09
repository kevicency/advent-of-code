import * as _ from 'lodash'
import { Problem } from '../Problem'
import inputTxt from './input.txt'
import description from './PROBLEM.md'

const input = inputTxt.split('\n')

export default {
  input,
  description,

  solve: () => _.chain(input).map(computeSeatId).max().value(),
  solveBonus: () => {
    return _.map(input, computeSeatId)
      .sort()
      .reduce(
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
      ).result
  },
} as Problem

export function computeSeatId(seatOrIdentifier: Seat | string): number {
  if (typeof seatOrIdentifier === 'string') {
    return computeSeatId(computeSeat(seatOrIdentifier))
  }
  return seatOrIdentifier.row * 8 + seatOrIdentifier.col
}
export function computeSeat(identifier: string): Seat {
  const pows = _.countBy(
    identifier,
    (x) =>
      ({
        F: 'row',
        B: 'row',
        L: 'col',
        R: 'col',
      }[x])
  )

  return _.chain(
    reduceBoundaries(
      { row: [0, 2 ** pows.row - 1], col: [0, 2 ** pows.col - 1] },
      identifier
    )
  )
    .mapValues((boundary) => _.mean(boundary))
    .value()
}
export function reduceBoundaries(
  { row, col }: Boundaries,
  identifier: string
): Boundaries {
  if (!identifier) {
    return { row, col }
  }

  const [head, tail] = [identifier[0], identifier.slice(1)]

  switch (head) {
    case 'F':
      return reduceBoundaries({ row: takeLowerHalf(row), col }, tail)
    case 'B':
      return reduceBoundaries({ row: takeUpperHalf(row), col }, tail)
    case 'L':
      return reduceBoundaries({ row, col: takeLowerHalf(col) }, tail)
    case 'R':
      return reduceBoundaries({ row, col: takeUpperHalf(col) }, tail)
    default:
      reduceBoundaries({ row, col }, tail)
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
