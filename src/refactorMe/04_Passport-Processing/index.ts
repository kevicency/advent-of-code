import * as _ from 'lodash'
import { Problem } from '../../Problem'
import inputTxt from './input.txt'
import description from './PROBLEM.md'

const input = parseInput(inputTxt)

export default {
  input,
  description,

  solve: (passports: string[][] = input) =>
    passports.map(isValidPassport).reduce((memo, b) => memo + +b, 0),
  solveBonus: (passports: string[][] = input) =>
    passports
      .map((passport) => isValidPassportBonus(passport))
      .reduce((memo, b) => memo + +b, 0),
} as Problem

export function parseInput(contents: string): string[][] {
  const chunks = contents.split('\n\n')

  return chunks.map((chunk) =>
    chunk
      .split('\n')
      .flatMap((line) => line.trim().split(' '))
      .map((data) => data.trim())
      .filter((x) => x !== '' && !x.startsWith('cid:'))
  )
}

export function isValidPassport(passport: string[]): boolean {
  return passport.length === 7
}

export const validator: { [key: string]: (val: string) => boolean } = {
  byr: (val) => +val >= 1920 && +val <= 2002,
  iyr: (val) => +val >= 2010 && +val <= 2020,
  eyr: (val) => +val >= 2020 && +val <= 2030,
  hgt: (val) =>
    val.endsWith('cm')
      ? ((cm) => cm >= 150 && cm <= 193)(+val.replace('cm', ''))
      : ((inch) => inch >= 59 && inch <= 76)(+val.replace('in', '')),
  hcl: (val) => /^#[a-f0-9]{6}$/.test(val),
  ecl: (val) => 'amb blu brn gry grn hzl oth'.split(' ').indexOf(val) !== -1,
  pid: (val) => /^\d{9}$/.test(val),
}
export function isValidPassportBonus(passport: string[]): boolean {
  const data = _.fromPairs(passport.map((data) => data.split(':')))

  return _.every(validator, (validate, prop) =>
    data[prop] ? validate(data[prop]) : false
  )
}
