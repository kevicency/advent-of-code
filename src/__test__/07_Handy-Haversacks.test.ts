import problem07, {
  generateGraph,
  generateGraphBonus,
  getOutermostBags,
  getTotalInnerBagCount,
  parseInput,
} from '../07_Handy-Haversacks'
import inputTxt from './data/07_input.txt'

describe('Problem 07', () => {
  test.todo(`answer is ${problem07.solve()}`)
  test.todo(`bonus answer is ${problem07.solveBonus()}`)

  test('solve test input', () => {
    // expect(problem07.solve(parseInput(inputTxt))).toBe(11)
  })

  describe('helpers', () => {
    test('parseInput', () => {
      expect(
        parseInput(
          `
light red bags contain 1 bright white bag, 2 muted yellow bags.
bright white bags contain 1 shiny gold bag.
dotted black bags contain no other bags.
        `
        )
      ).toStrictEqual([
        {
          bag: 'light red',
          children: [
            { bag: 'bright white', count: 1 },
            { bag: 'muted yellow', count: 2 },
          ],
        },
        { bag: 'bright white', children: [{ bag: 'shiny gold', count: 1 }] },
        { bag: 'dotted black', children: [] },
      ])
    })

    test('generateGraph', () => {
      expect(generateGraph(parseInput(inputTxt)).nodes()).toHaveLength(9)
    })

    test('getOutermostBags', () => {
      const graph = generateGraph(parseInput(inputTxt))

      expect(getOutermostBags(graph)).toEqual(
        new Set(['bright white', 'muted yellow', 'dark orange', 'light red'])
      )
    })

    test('getTotalInnerBagCount', () => {
      const graph = generateGraphBonus(parseInput(inputTxt))

      expect(getTotalInnerBagCount(graph, 'shiny gold')).toBe(32)
    })
  })
})
