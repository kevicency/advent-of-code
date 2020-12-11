import problem08, { BootProcess, parseInput } from '../08_Handheld-Halting'
import inputTxt from './data/08_input.txt'

describe('Problem 08', () => {
  beforeEach(() => {
    BootProcess.ID = 0
  })
  test.todo(`answer is ${problem08.solve()}`)
  test.todo(`bonus answer is ${problem08.solveBonus()}`)

  test('solve bonus test input', () => {
    expect(problem08.solveBonus(parseInput(inputTxt))).toBe(8)
  })
})
