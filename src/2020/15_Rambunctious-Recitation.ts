// import input from './data/14.txt'

import { trim } from 'lodash/fp'
import { result } from '../util'

describe('Day 15', () => {
  const parseInput = (contents: string) =>
    contents.split(',').map(trim).map(Number)
  const testNumbers = parseInput('0,3,6')

  test('parseInput', () => expect(testNumbers).toStrictEqual([0, 3, 6]))

  function* speakNumbers(startingNumbers: number[]): Generator<number> {
    let turn = 0
    let next = -1
    const spoken = new Map<number, [number, number?]>()

    function addSpoken(n: number, t: number): [number, number?] {
      const history = spoken.get(n) || []

      spoken.set(n, [t, ...history].slice(0, 2) as [number, number])

      return spoken.get(n)
    }

    const nextSpoken = (last: number) => {
      const history = spoken.get(last) || []

      return history.length === 2 ? history[0] - history[1] : 0
    }

    do {
      if (turn < startingNumbers.length) {
        next = startingNumbers[turn]

        spoken.set(next, [turn])

        yield next
      } else {
        const last = next

        next = nextSpoken(last)

        addSpoken(next, turn)

        yield next
      }

      turn += 1
    } while (turn < Number.MAX_SAFE_INTEGER)
  }

  function* speakNumbers2(startingNumbers: number[]): Generator<number> {
    let turn = 0
    let next = -1
    const spoken = new Map<number, [number, number?]>()

    do {
      if (turn < startingNumbers.length) {
        next = startingNumbers[turn]

        spoken.set(next, [turn])
      } else {
        const history = spoken.get(next)
        next = history.length === 2 ? history[0] - history[1] : 0

        const nextHistory = spoken.get(next) || []

        spoken.set(next, [turn, ...nextHistory].slice(0, 2) as [number, number])
      }

      yield next

      turn += 1
    } while (turn < Number.MAX_SAFE_INTEGER)
  }

  test('speakNumbers', () => {
    const iter = speakNumbers(testNumbers)

    expect(iter.next().value).toBe(0)
    expect(iter.next().value).toBe(3)
    expect(iter.next().value).toBe(6)
    expect(iter.next().value).toBe(0)
    expect(iter.next().value).toBe(3)
    expect(iter.next().value).toBe(3)
    expect(iter.next().value).toBe(1)
    expect(iter.next().value).toBe(0)
    expect(iter.next().value).toBe(4)
    expect(iter.next().value).toBe(0)
  })

  function elementAt<T>(n: number, iter: IterableIterator<T>) {
    for (let i = 0; i < n; i++) {
      iter.next()
    }

    return iter.next().value
  }

  result('Part 1', () =>
    elementAt(2020 - 1, speakNumbers2([0, 20, 7, 16, 1, 18, 15]))
  )

  xtest('large turns', () => {
    const n = 30000000
    expect(elementAt(n - 1, speakNumbers2([0, 3, 6]))).toBe(175594)
    expect(elementAt(n - 1, speakNumbers2([3, 2, 1]))).toBe(18)
  })

  result('Part 2', () =>
    elementAt(30000000 - 1, speakNumbers2([0, 20, 7, 16, 1, 18, 15]))
  )
})
