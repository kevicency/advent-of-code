import { filter, flow } from 'lodash/fp'
import { length } from '../fp'
import { resultPart1, resultPart2 } from '../util'
import inputTxt from './data/02.txt'

describe('Day 02', () => {
  type Input = { min: number; max: number; char: string; pwd: string }

  function parseInput(contents: string): Input[] {
    return contents
      .split('\n')
      .map((line) => line.trim())
      .map((line) => {
        const match = line.match(/^(\d+)-(\d+) (\w): (\w+)$/)

        return match
          ? {
              min: +match[1],
              max: +match[2],
              char: match[3],
              pwd: match[4],
            }
          : null
      })
  }
  test('parse input', () => {
    expect(parseInput('2-11 v: mhrvdkgsxvvvdxvhgv')).toStrictEqual([
      {
        min: 2,
        max: 11,
        char: 'v',
        pwd: 'mhrvdkgsxvvvdxvhgv',
      },
    ])
  })

  function validateInput({ min, max, char, pwd }: Input) {
    const diff = pwd.length - pwd.replace(new RegExp(char, 'g'), '').length

    return min <= diff && max >= diff
  }

  test('validate input', () => {
    expect(
      validateInput({ min: 1, max: 3, char: 'a', pwd: 'bab' })
    ).toBeTruthy()
    expect(
      validateInput({ min: 1, max: 3, char: 'a', pwd: 'baaab' })
    ).toBeTruthy()
    expect(validateInput({ min: 1, max: 3, char: 'a', pwd: 'bb' })).toBeFalsy()
    expect(
      validateInput({ min: 1, max: 3, char: 'a', pwd: 'baaaab' })
    ).toBeFalsy()
  })

  resultPart1(() => flow(parseInput, filter(validateInput), length)(inputTxt))

  function validateInputPart2({ min, max, char, pwd }: Input) {
    return +(pwd[min - 1] === char) + +(pwd[max - 1] === char) === 1
  }

  test('validateInputPart2', () => {
    expect(
      validateInputPart2({ min: 1, max: 3, char: 'a', pwd: 'abbb' })
    ).toBeTruthy()
    expect(
      validateInputPart2({ min: 1, max: 3, char: 'a', pwd: 'bbab' })
    ).toBeTruthy()
    expect(
      validateInputPart2({ min: 1, max: 3, char: 'a', pwd: 'aba' })
    ).toBeFalsy()
    expect(
      validateInputPart2({ min: 1, max: 3, char: 'a', pwd: 'bab' })
    ).toBeFalsy()
  })

  resultPart2(() =>
    flow(parseInput, filter(validateInputPart2), length)(inputTxt)
  )
})
