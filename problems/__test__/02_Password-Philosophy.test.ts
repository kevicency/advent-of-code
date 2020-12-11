import problem02, {
  parseInput,
  validateInput,
  validateInputBonus,
} from '../02_Password-Philosophy'

describe('Problem 02', () => {
  test.todo(`answer is ${problem02.solve()}`)
  test.todo(`bonus answer is ${problem02.solveBonus()}`)

  describe('helpers', () => {
    test('parse input', () => {
      expect(parseInput('2-11 v: mhrvdkgsxvvvdxvhgv')).toMatchObject({
        min: 2,
        max: 11,
        char: 'v',
        pwd: 'mhrvdkgsxvvvdxvhgv',
      })
    })

    test('validate input', () => {
      expect(
        validateInput({ min: 1, max: 3, char: 'a', pwd: 'bab' })
      ).toBeTruthy()
      expect(
        validateInput({ min: 1, max: 3, char: 'a', pwd: 'baaab' })
      ).toBeTruthy()
      expect(
        validateInput({ min: 1, max: 3, char: 'a', pwd: 'bb' })
      ).toBeFalsy()
      expect(
        validateInput({ min: 1, max: 3, char: 'a', pwd: 'baaaab' })
      ).toBeFalsy()
    })
    test('validate input bonus', () => {
      expect(
        validateInputBonus({ min: 1, max: 3, char: 'a', pwd: 'abbb' })
      ).toBeTruthy()
      expect(
        validateInputBonus({ min: 1, max: 3, char: 'a', pwd: 'bbab' })
      ).toBeTruthy()
      expect(
        validateInputBonus({ min: 1, max: 3, char: 'a', pwd: 'aba' })
      ).toBeFalsy()
      expect(
        validateInputBonus({ min: 1, max: 3, char: 'a', pwd: 'bab' })
      ).toBeFalsy()
    })
  })
})
