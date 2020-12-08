import problem02, {
  parseInput,
  validateInput,
  validateInputBonus,
} from '../02_Password-Philosophy'

describe('Problem 2', () => {
  test(`answer is ${problem02.solve()}`, () => {
    // ok
  })
  test(`bonus answer is ${problem02.solveBonus()}`, () => {
    // ok
  })

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
