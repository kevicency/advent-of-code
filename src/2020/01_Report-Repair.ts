import { flow } from 'lodash'
import { filter, flatMap, head, map } from 'lodash/fp'
import { pairWithIndexFn } from '../fp'
import { resultPart1, resultPart2 } from '../util'
import inputTxt from './data/01.txt'

describe('Day 01', () => {
  const parseInput = (contents: string) => contents.split('\n').map(Number)

  const input = parseInput(inputTxt)

  resultPart1(() =>
    flow(
      pairWithIndexFn<number>(),
      flatMap(([x, i]) => input.slice(i + 1).map((y) => [x + y, x * y])),
      filter(([sum, _prod]) => sum === 2020),
      map(([_sum, prod]) => prod),
      head
    )(input)
  )

  resultPart2(() =>
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
    )(input)
  )
})
