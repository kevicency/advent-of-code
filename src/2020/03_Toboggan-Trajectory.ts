import { lines } from '../fp'
import { resultPart1, resultPart2 } from '../util'
import inputTxt from './data/03.txt'

describe('Day 03', () => {
  const parseInput = lines

  class Map {
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

  test('Map#charAt', () => {
    // prettier-ignore
    const sut = new Map([
        '123',
        '456',
        '789'
      ])

    expect(sut.charAt(0, 0)).toBe('1')
    expect(sut.charAt(1, 0)).toBe('2')
    expect(sut.charAt(2, 0)).toBe('3')
    expect(sut.charAt(2, 2)).toBe('9')

    expect(sut.charAt(1, 1)).toBe('5')
    expect(sut.charAt(4, 1)).toBe('5')

    expect(sut.charAt(0, 3)).toBe(null)
  })

  test('Map#getPath', () => {
    // prettier-ignore
    const sut = new Map([
        '123',
        '456',
        '789',
        '123'
      ])

    expect(Array.from(sut.generatePath(2, 1))).toMatchObject(
      [1, 6, 8, 1].map(String)
    )
  })

  function countTreesOnPath(map: Map, dx: number, dy: number) {
    return map
      .getPath(dx, dy)
      .map((char) => +(char === '#')) // count trees
      .reduce((memo, n) => memo + n, 0) // sum tree count
  }

  const testMap = new Map(
    parseInput(`
      ..##.......
      #...#...#..
      .#....#..#.
      ..#.#...#.#
      .#...##..#.
      ..#.##.....
      .#.#.#....#
      .#........#
      #.##...#...
      #...##....#
      .#..#...#.#
    `)
  )

  test('countTreesOnPath', () => {
    expect(countTreesOnPath(testMap, 3, 1)).toBe(7)
  })

  const map = new Map(parseInput(inputTxt))

  resultPart1(() => countTreesOnPath(map, 3, 1))
  resultPart2(() =>
    [
      countTreesOnPath(map, 1, 1),
      countTreesOnPath(map, 3, 1),
      countTreesOnPath(map, 5, 1),
      countTreesOnPath(map, 7, 1),
      countTreesOnPath(map, 1, 2),
    ].reduce((memo, n) => memo * n, 1)
  )
})
