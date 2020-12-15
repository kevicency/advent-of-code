import { max, min, sum, tail } from 'lodash/fp'
import { asSequence } from 'sequency'
import { Problem } from '../Problem'
import inputTxt from './input.txt'
import description from './PROBLEM.md'

const input = parseInput(inputTxt)
const PREAMBLE_LENGTH = 25

export default new (class Problem09 implements Problem {
  input = input
  description = description

  solve = (cipher: number[] = input, preambleLength = PREAMBLE_LENGTH) => {
    let pointer = 0

    while (pointer + preambleLength < cipher.length) {
      const n = cipher[pointer + preambleLength]
      const preamble = cipher.slice(pointer, pointer + preambleLength)

      if (!isValidPreambleFor(n, preamble)) {
        return n
      }

      pointer += 1
    }

    return 0
  }

  solveBonus = (cipher: number[] = input, preambleLength = PREAMBLE_LENGTH) => {
    const n = this.solve(cipher, preambleLength)

    return findEncryptionWeakness(n, cipher)
  }
})()

export function findEncryptionWeakness(n: number, cipher: number[]): number {
  if (cipher.length < 2) {
    return 0
  }

  const result = asSequence(subsets(cipher))
    .map((subset) => [sum(subset), min(subset) + max(subset)])
    .takeWhile(([sum]) => sum <= n)
    .filter(([sum]) => sum === n)
    .toArray()[0]

  return result ? result[1] : findEncryptionWeakness(n, tail(cipher))
}

export function parseInput(contents: string): number[] {
  return contents.split('\n').map(Number)
}

export function isValidPreambleFor(n: number, preamble: number[]): boolean {
  return asSequence(allThePairs(preamble)).any(([x, y]) => n === x + y)
}

export function* subsets(
  numbers: number[],
  minLength = 2
): Generator<number[]> {
  let list = []
  for (const n of numbers) {
    list = [...list, n]
    if (list.length >= minLength) {
      yield list
    }
  }
}

export function* allThePairs(numbers: number[]): Generator<[number, number]> {
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      yield [numbers[i], numbers[j]]
    }
  }
}
