import problem13, { parseInput, parseInputBonus } from '../13_Shuttle-Search'
import inputTxt from './data/13_input.txt'

describe('Problem 13', () => {
  test.todo(`answer is ${problem13.solve()}`)

  test(`bonus answer is`, () => {
    const r = problem13.solveBonus()
    expect(r).toBe(760171380521445)
  })

  test('solve test input', () => {
    const input = parseInput(inputTxt)

    expect(problem13.solve(input)).toBe(295)
  })

  test('solve bonus test input', () => {
    const input = parseInputBonus(inputTxt)

    expect(problem13.solveBonus(input)).toBe(1068781)
  })

  // test('fo', () => {
  //   let i = 0
  //   do {
  //     // 3 5 7
  //     const x = i * 3 + 1
  //     const y = i * 3 + 2

  //     if (x % 5 === 0) {
  //       console.log(i, x, x / 5)
  //     }

  //     if (x % 5 === 0 && y % 7 === 0) {
  //       console.log(i, x - 1, x / 5, y / 7)
  //       break
  //     }
  //     i += 1
  //   } while (i < 99999999)
  // })
})
