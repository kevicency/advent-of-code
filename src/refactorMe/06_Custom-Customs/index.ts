import { Dictionary } from 'lodash'
import {
  assign,
  flatMap,
  flow,
  map,
  mapValues,
  mergeWith,
  omitBy,
  reduce,
  sum,
  values,
} from 'lodash/fp'
import { Problem } from '../../Problem'
import inputTxt from './input.txt'
import description from './PROBLEM.md'

const input = parseInput(inputTxt)

export default new (class Problem06 implements Problem {
  input = input
  description = description

  solve = (chunks: string[][] = input, collect = collectAnswers) =>
    flow(map(collect), flatMap(values), sum)(chunks)
  solveBonus = (chunks: string[][] = input) =>
    this.solve(chunks, collectAnswersBonus)
})()

export function parseInput(contents: string): string[][] {
  return contents
    .split('\n\n')
    .map((chunk) => chunk.split('\n').map((line) => line.trim()))
}

export function collectAnswers(input: string[]): Dictionary<number> {
  return flow(map(occurences), reduce(assign, {}))(input)
}

export function collectAnswersBonus(input: string[]): Dictionary<number> {
  return flow(
    map(occurences),
    reduce(
      mergeWith((x, y) => (x || 0) + (y || 0)),
      {}
    ),
    omitBy((value) => value != input.length),
    mapValues(() => 1)
  )(input)
}
export const occurences: (str: string) => Dictionary<number> = reduce(
  (memo, char: string) => ({ [char]: 1, ...memo }),
  {}
)
export const occurencesCount: (str: string) => Dictionary<number> = reduce(
  (memo, char: string) => ({ [char]: 1, ...memo }),
  {}
)
