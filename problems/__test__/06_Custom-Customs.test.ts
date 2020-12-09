import problem06, {
  collectAnswers,
  collectAnswersBonus,
  parseInput,
} from '../06_Custom-Customs'
import inputTxt from './data/06_input.txt'

describe('Problem 06', () => {
  test.todo(`answer is ${problem06.solve()}`)
  test.todo(`bonus answer is ${problem06.solveBonus()}`)

  test('solve test input', () => {
    expect(problem06.solve(parseInput(inputTxt))).toBe(11)
  })
  describe('helpers', () => {
    test('parseInput', () => {
      expect(parseInput(inputTxt)).toStrictEqual([
        ['abc'],
        ['a', 'b', 'c'],
        ['ab', 'ac'],
        ['a', 'a', 'a', 'a'],
        ['b'],
      ])
    })
    test('collectAnswers', () => {
      expect(collectAnswers(['abc'])).toStrictEqual({
        a: 1,
        b: 1,
        c: 1,
      })
      expect(collectAnswers(['ab', 'ac', 'a'])).toStrictEqual({
        a: 1,
        b: 1,
        c: 1,
      })
    })
    test('collectAnswersBonus', () => {
      expect(collectAnswersBonus(['abc'])).toStrictEqual({
        a: 1,
        b: 1,
        c: 1,
      })
      expect(collectAnswersBonus(['ab', 'ac', 'a'])).toStrictEqual({
        a: 1,
      })
    })
  })
})
