/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { Problem } from '../Problem'
import inputTxt from './input.txt'
import description from './PROBLEM.md'

const input = inputTxt.split('\n').map(parseInput)

export default {
  input,
  description,

  solve: () => input.filter(validateInput).length,
  solveBonus: () => input.filter(validateInputBonus).length,
} as Problem

export function validateInputBonus({
  min,
  max,
  char,
  pwd,
}: ReturnType<typeof parseInput>) {
  return +(pwd[min - 1] === char) + +(pwd[max - 1] === char) === 1
}

export function validateInput({
  min,
  max,
  char,
  pwd,
}: ReturnType<typeof parseInput>) {
  const diff = pwd.length - pwd.replace(new RegExp(char, 'g'), '').length

  return min <= diff && max >= diff
}

export function parseInput(line: string) {
  const match = line.match(/^(\d+)-(\d+) (\w): (\w+)$/)

  return match
    ? {
        min: +match[1],
        max: +match[2],
        char: match[3],
        pwd: match[4],
      }
    : null
}
