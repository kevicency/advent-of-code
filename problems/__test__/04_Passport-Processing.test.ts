/* eslint-disable @typescript-eslint/no-namespace */
import * as _ from 'lodash'
import problem04, {
  isValidPassport,
  parseInput,
  validator,
} from '../04_Passport-Processing'
import invalidBonusTxt from './data/04_bonus_invalid.txt'
import validBonusTxt from './data/04_bonus_valid.txt'
import inputTxt from './data/04_input.txt'

describe('Problem 04', () => {
  test.todo(`answer is ${problem04.solve()}`)
  test.todo(`bonus answer is ${problem04.solveBonus()}`)

  test('solves test input', () => {
    expect(problem04.solve(parseInput(inputTxt))).toBe(2)
  })

  test('solves bonus test input', () => {
    expect(problem04.solveBonus(parseInput(validBonusTxt))).toBe(4)
    expect(problem04.solveBonus(parseInput(invalidBonusTxt))).toBe(0)
  })

  describe('helpers', () => {
    test('parseInput', () => {
      const result = parseInput(inputTxt)
      expect(result).toHaveLength(4)
      expect(result.map((x) => x.length)).toMatchObject([7, 6, 7, 6])
    })

    test('isValidPassport', () => {
      expect(isValidPassport(createPassport(7))).toBeTruthy()
      expect(isValidPassport(createPassport(6))).toBeFalsy()
      expect(isValidPassport(createPassport(9))).toBeFalsy()
    })
  })

  describe('passport data validation', () => {
    _.map(
      {
        valid: [
          'byr:1920',
          'byr:1999',
          'byr:2002',
          'iyr:2010',
          'iyr:2015',
          'iyr:2020',
          'eyr:2022',
          'eyr:2030',
          'hgt:150cm',
          'hgt:193cm',
          'hgt:59in',
          'hgt:60in',
          'hgt:76in',
          'hcl:#123abc',
          `ecl:amb`,
          `pid:000123456`,
        ],
        invalid: [
          'byr:1919',
          'byr:1902',
          'byr:2005',
          'eyr:2019',
          'hgt:50cm',
          'hgt:170in',
          'hgt:180',
          'hcl:#123abz',
          'hcl:#123abff',
          'hcl:123abc',
          'ecl:any',
          'pid:00012345s',
          'pid:00123456',
          'pid:0001234567',
        ],
      },
      (values, type) => {
        _.chain(values)
          .groupBy((data) => data.split(':')[0])
          .forEach((data, _) => {
            data.forEach((item) => {
              const [prop, value] = item.split(':')
              if (type === 'valid') {
                test(`is valid ${prop}:${value}`, () => {
                  expect(validator[prop](value)).toBeTruthy()
                })
              } else {
                test(`is invalid ${prop}:${value}`, () => {
                  expect(validator[prop](value)).toBeFalsy()
                })
              }
            })
          })
          .value()
      }
    )
  })
})

function createPassport(length: number, ...args: string[]) {
  const passport = new Array(length).fill('')

  args.forEach((data, i) => (passport[i] = data))

  return passport
}
