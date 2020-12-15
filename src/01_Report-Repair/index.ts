import { filter, flatMap, flow, head, map } from 'lodash/fp'
import { pairWithIndexFn } from '../fp'
import { Problem } from '../Problem'
import inputTxt from './input.txt'
import description from './PROBLEM.md'

const input = inputTxt.split('\n').map((x) => +x)

export default {
  input,
  description,

  solve: () =>
    flow(
      pairWithIndexFn<number>(),
      flatMap(([x, i]) => input.slice(i + 1).map((y) => [x + y, x * y])),
      filter(([sum, _prod]) => sum === 2020),
      map(([_sum, prod]) => prod),
      head
    )(input),

  solveBonus: () =>
    flow(
      pairWithIndexFn<number>(),
      flatMap(([x, i]) =>
        input
          .slice(i + 1)
          .flatMap((y, j) =>
            input.slice(i + 1 + j + 1).map((z) => [x + y + z, x * y * z])
          )
      ),
      filter(([sum, _prod]) => sum === 2020),
      map(([_sum, prod]) => prod),
      head
    )(input),
} as Problem
