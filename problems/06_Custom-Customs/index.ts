import * as _ from 'lodash'
import { Dictionary } from 'lodash'
import { Problem } from '../Problem'
import inputTxt from './input.txt'
import description from './PROBLEM.md'

const input = parseInput(inputTxt)

export default new (class Problem06 implements Problem {
  input = input
  description = description

  solve = (chunks: string[][] = input, collect = collectAnswers) =>
    _.chain(chunks)
      .map(collect)
      .map((dict) => _.chain(dict).values().sum())
      .sum()
      .value()
  solveBonus = (chunks: string[][] = input) =>
    this.solve(chunks, collectAnswersBonus)
})()

export function parseInput(contents: string): string[][] {
  return contents
    .split('\n\n')
    .map((chunk) => chunk.split('\n').map((line) => line.trim()))
}

export function collectAnswers(input: string[]): Dictionary<number> {
  return input
    .map((line) => _.reduce(line, (memo, char) => ({ [char]: 1, ...memo }), {}))
    .reduce((memo, map) => _.assign(memo, map))
}

export function collectAnswersBonus(input: string[]): Dictionary<number> {
  return _.chain(input)
    .map((line) =>
      _.reduce(
        line,
        (memo, char) => ({ [char]: 1, ...memo }),
        {} as Dictionary<number>
      )
    )
    .reduce((memo, map) =>
      _.mergeWith(memo, map, (x, y) => (x || 0) + (y || 0))
    )
    .omitBy((value) => value != input.length)
    .mapValues(() => 1)
    .value()
}
