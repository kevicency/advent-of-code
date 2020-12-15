import { Problem } from '../Problem'
import inputTxt from './input.txt'
import description from './PROBLEM.md'

const input = inputTxt.split('\n')

const problem = {
  input,
  description,

  solve: (map: Map = new Map(input), dx = 3, dy = 1) => {
    return map
      .getPath(dx, dy)
      .map((char) => +(char === '#')) // count trees
      .reduce((memo, n) => memo + n, 0) // sum tree count
  },

  solveBonus: (map: Map = new Map(input)) =>
    [
      problem.solve(map, 1, 1),
      problem.solve(map, 3, 1),
      problem.solve(map, 5, 1),
      problem.solve(map, 7, 1),
      problem.solve(map, 1, 2),
    ].reduce((memo, n) => memo * n, 1),
}

export default problem as Problem

export class Map {
  private template: string[]

  constructor(template: string[]) {
    this.template = template
  }

  getPath(dx: number, dy: number): string[] {
    return Array.from(this.generatePath(dx, dy))
  }

  *generatePath(dx: number, dy: number): Generator<string> {
    let x = 0,
      y = 0,
      char: string = null

    do {
      char = this.charAt(x, y)

      if (char !== null) yield char

      x += dx
      y += dy
    } while (char != null)
  }

  charAt(x: number, y: number): string {
    if (y >= this.template.length) return null

    return this.template[y][x % this.template[0].length]
  }
}
