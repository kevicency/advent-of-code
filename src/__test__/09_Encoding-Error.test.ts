import problem09, {
  allThePairs,
  isValidPreambleFor,
  parseInput,
  subsets,
} from '../09_Encoding-Error'
import inputTxt from './data/09_input.txt'

describe('Problem 08', () => {
  test.todo(`answer is ${problem09.solve()}`)
  test.todo(`bonus answer is ${problem09.solveBonus()}`)

  test('solve test input', () => {
    expect(problem09.solve(parseInput(inputTxt), 5)).toBe(127)
  })
  test('solve bonus test input', () => {
    expect(problem09.solveBonus(parseInput(inputTxt), 5)).toBe(62)
  })

  describe('helpers', () => {
    test('allThePairs', () => {
      expect(Array.from(allThePairs([1, 2, 3]))).toStrictEqual([
        [1, 2],
        [1, 3],
        [2, 3],
      ])
    })

    test('subsets', () => {
      expect(Array.from(subsets([1, 2, 3], 1))).toStrictEqual([
        [1],
        [1, 2],
        [1, 2, 3],
      ])
    })

    test('isValidPreambleFor', () => {
      expect(isValidPreambleFor(12, [3, 5, 4, 8, 7])).toBeTruthy()
      expect(isValidPreambleFor(14, [3, 5, 4, 8, 7])).toBeFalsy()
    })
  })
})
