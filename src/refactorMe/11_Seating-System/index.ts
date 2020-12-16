import { all, flatten, map, range, sum } from 'lodash/fp'
import { Problem } from '../../Problem'
import inputTxt from './input.txt'
import description from './PROBLEM.md'

const input = inputTxt.split('\n')

export default {
  input,
  description,

  solve: (cells: Cells = input) => {
    const equilibrium = Automata.findEquilibrium(cells, Automata.evolve)

    return Grid.count(equilibrium, '#')
  },
  solveBonus: (cells: Cells = input) => {
    const equilibrium = Automata.findEquilibrium(cells, Automata.evolveBonus)

    return Grid.count(equilibrium, '#')
  },
} as Problem

export type Cells = string[]

export const Grid = {
  // prettier-ignore
  directions: [
    [-1, -1],
    [ 0, -1],
    [ 1, -1],
    [-1,  0],
    [ 1,  0],
    [-1,  1],
    [ 0,  1],
    [ 1,  1],
  ] as [number, number][],

  get: (cells: Cells, x: number, y: number) => (cells[y] || [])[x],
  getVisibleNonFloor: (
    cells: Cells,
    x: number,
    y: number,
    dx: number,
    dy: number
  ) => {
    const cell = Grid.get(cells, x, y)

    switch (cell) {
      case '.':
        return Grid.getVisibleNonFloor(cells, x + dx, y + dy, dx, dy)
      case 'L':
      case '#':
        return cell
      default:
        return null
    }
  },

  neighbours: (cells: Cells, x: number, y: number): string[] =>
    Grid.directions
      .map(([dx, dy]) => Grid.get(cells, x + dx, y + dy))
      .filter((c) => c !== null),

  visibleNeighbours: (cells: Cells, x: number, y: number): Cells => {
    return Grid.directions
      .map(([dx, dy]) => Grid.getVisibleNonFloor(cells, x + dx, y + dy, dx, dy))
      .filter((c) => c !== null)
  },

  clone: (cells: Cells) => [...cells].map((row) => [...row]),

  map: <T>(cells: Cells, fn: (cell: string, x: number, y: number) => T) =>
    cells.map((row, y) =>
      range(0, row.length).map((x) => {
        return fn(cells[y][x], x, y)
      })
    ),

  count: (cells: Cells, cell: string) =>
    sum(flatten(Grid.map(cells, (c) => +(c === cell)))),
}

export const Automata = {
  evolve: (cells: Cells): Cells =>
    Automata.evolveCore(cells, Grid.neighbours, 4),
  evolveBonus: (cells: Cells): Cells =>
    Automata.evolveCore(cells, Grid.visibleNeighbours, 5),

  evolveCore: (
    cells: Cells,
    neighboursFn: typeof Grid.neighbours,
    maxNeighbourCount
  ): Cells =>
    Grid.clone(cells).map((row, y) =>
      range(0, row.length)
        .map((x) => {
          const cell = cells[y][x]
          const neighbours = neighboursFn(cells, x, y)

          switch (cell) {
            case 'L':
              return all((c) => c !== '#', neighbours) ? '#' : 'L'
            case '#':
              return sum(map((c) => +(c === '#'), neighbours)) >=
                maxNeighbourCount
                ? 'L'
                : '#'
            default:
              return cell
          }
        })
        .join('')
    ),

  findEquilibrium: (cells: Cells, evolve: (cells: Cells) => Cells): Cells => {
    let currentGen: Cells = cells
    let nextGen: Cells = null
    let nextGenHasChanges = true

    let i = 0

    do {
      nextGen = evolve(currentGen)

      nextGenHasChanges = nextGen.join('') !== currentGen.join('')

      currentGen = nextGen

      i += 1

      if (i > 9999) {
        throw new Error('too many iterations')
      }
    } while (nextGenHasChanges)

    return nextGen
  },
}
