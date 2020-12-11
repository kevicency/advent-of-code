import * as _ from 'lodash'
import problem10, {
  adapterConnections,
  countPaths,
  getAdapterGraph,
  parseInput,
} from '../10_Adapter-Array'
import inputTxt from './data/10_input.txt'
import input2Txt from './data/10_input2.txt'

describe('Problem 10', () => {
  test.todo(`answer is ${problem10.solve()}`)
  test.todo(`xxx bonus answer is ${problem10.solveBonus()}`)

  test('solve test input', () => {
    expect(problem10.solve(parseInput(inputTxt))).toBe(35)
  })
  test('solve test input 2', () => {
    expect(problem10.solve(parseInput(input2Txt))).toBe(220)
  })

  describe('helpers', () => {
    test('joltConnections', () => {
      const connections = Array.from(adapterConnections([1, 4, 5, 7, 10]))

      expect(connections).toStrictEqual([
        [0, 1],
        [1, 4],
        [4, 5],
        [4, 7],
        [5, 7],
        [7, 10],
        [10, 13],
      ])
    })

    _.forEach(
      [
        [1, getAdapterGraph([1, 4])],
        [2, getAdapterGraph([3, 4, 5])],
        [4, getAdapterGraph([3, 4, 5, 6])],
        [8, getAdapterGraph(parseInput(inputTxt))],
        [19208, getAdapterGraph(parseInput(input2Txt))],
      ],
      ([expected, graph]) => {
        test(`countPaths ${expected}`, () => {
          expect(countPaths(graph)).toBe(expected)
        })
      }
    )
  })
})
