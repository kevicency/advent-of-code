import { last } from 'lodash/fp'
import problem11, { Automata, Grid } from '../11_Seating-System'
import { default as inputTxt } from './data/11_input.txt'
import input2Txt from './data/11_input2.txt'

describe('Problem 11', () => {
  test.todo(`answer is ${problem11.solve()}`)
  test.todo(`bonus answer is ${problem11.solveBonus()}`)

  describe('Automata', () => {
    test('evolve', () => {
      const cells = inputTxt.split('\n')

      const gen1 = Automata.evolve(cells)
      expect(gen1).toStrictEqual([
        '#.##.##.##',
        '#######.##',
        '#.#.#..#..',
        '####.##.##',
        '#.##.##.##',
        '#.#####.##',
        '..#.#.....',
        '##########',
        '#.######.#',
        '#.#####.##',
      ])

      const gen2 = Automata.evolve(gen1)
      expect(gen2).toStrictEqual([
        '#.LL.L#.##',
        '#LLLLLL.L#',
        'L.L.L..L..',
        '#LLL.LL.L#',
        '#.LL.LL.LL',
        '#.LLLL#.##',
        '..L.L.....',
        '#LLLLLLLL#',
        '#.LLLLLL.L',
        '#.#LLLL.##',
      ])

      const gen3 = Automata.evolve(gen2)
      expect(gen3).toStrictEqual([
        '#.##.L#.##',
        '#L###LL.L#',
        'L.#.#..#..',
        '#L##.##.L#',
        '#.##.LL.LL',
        '#.###L#.##',
        '..#.#.....',
        '#L######L#',
        '#.LL###L.L',
        '#.#L###.##',
      ])
    })

    test('evolve bonus', () => {
      const allGenerations = input2Txt
        .split('\n\n')
        .map((chunk) => chunk.split('\n'))

      allGenerations.reduce((currentGen, nextGen) => {
        expect(Automata.evolve(currentGen) === nextGen)

        return nextGen
      })

      expect(
        Automata.findEquilibrium(allGenerations[0], (cells) =>
          Automata.evolveBonus(cells)
        )
      ).toStrictEqual(last(allGenerations))
    })
  })

  describe('Grid', () => {
    test('visibleNeighbours', () => {
      expect(
        Grid.visibleNeighbours(
          [
            '.......#.',
            '...#.....',
            '.#.......',
            '.........',
            '..#L....#',
            '....#....',
            '.........',
            '#........',
            '...#.....',
          ],
          3,
          4
        )
      ).toStrictEqual(['#', '#', '#', '#', '#', '#', '#', '#'])
      expect(
        Grid.visibleNeighbours(
          ['.............', '.L.L.#.#.#.#.', '.............'],
          1,
          1
        )
      ).toStrictEqual(['L'])

      expect(
        Grid.visibleNeighbours(
          [
            '.##.##.',
            '#.#.#.#',
            '##...##',
            '...L...',
            '##...##',
            '#.#.#.#',
            '.##.##.',
          ],
          3,
          3
        )
      ).toStrictEqual([])
    })
  })
  // test('solve bonus test input', () => {
  //   expect(problem11.solveBonus(parseInput(inputTxt))).toBe(8)
  // })
})
