import problem03, { Map } from '../03_Toboggan-Trajectory'
import testInput from './data/03_input.txt'

describe('Problem02', () => {
  test.todo(`answer is ${problem03.solve()}`)
  test.todo(`bonus answer is ${problem03.solveBonus()}`)

  test('solves test input', () => {
    const testMap = new Map(testInput.split('\n'))
    expect(problem03.solve(testMap)).toBe(7)
  })

  describe('Map', () => {
    test('charAt', () => {
      // prettier-ignore
      const sut = new Map([
        '123',
        '456',
        '789'
      ])

      expect(sut.charAt(0, 0)).toBe('1')
      expect(sut.charAt(1, 0)).toBe('2')
      expect(sut.charAt(2, 0)).toBe('3')
      expect(sut.charAt(2, 2)).toBe('9')

      expect(sut.charAt(1, 1)).toBe('5')
      expect(sut.charAt(4, 1)).toBe('5')

      expect(sut.charAt(0, 3)).toBe(null)
    })

    test('getPath', () => {
      // prettier-ignore
      const sut = new Map([
        '123',
        '456',
        '789',
        '123'
      ])

      expect(Array.from(sut.generatePath(2, 1))).toMatchObject(
        [1, 6, 8, 1].map(String)
      )
    })
  })
})
