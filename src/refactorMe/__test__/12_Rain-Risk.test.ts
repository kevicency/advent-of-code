import { last } from 'lodash/fp'
import problem12, { Boat, parseInput, WaypointBoat } from '../12_Rain-Risk'

describe('Problem 12', () => {
  test.todo(`answer is ${problem12.solve()}`)
  test.todo(`bonus answer is ${problem12.solveBonus()}`)

  describe('Boat', () => {
    test('execute', () => {
      const commands = parseInput(
        ['F10', 'N3 ', 'F7 ', 'R90', 'F11'].join('\n')
      )
      const boats = commands.reduce(
        (boats, command) => {
          boats.push(Boat.execute(last(boats), command))
          return boats
        },
        [new Boat()]
      )

      let i = 0
      expect(boats[i++]).toMatchObject({ x: 0, y: 0, angle: 90 })
      expect(boats[i++]).toMatchObject({ x: 10, y: 0, angle: 90 })
      expect(boats[i++]).toMatchObject({ x: 10, y: 3, angle: 90 })
      expect(boats[i++]).toMatchObject({ x: 17, y: 3, angle: 90 })
      expect(boats[i++]).toMatchObject({ x: 17, y: 3, angle: 180 })
      expect(boats[i++]).toMatchObject({ x: 17, y: -8, angle: 180 })
    })
  })

  describe('WaypointBoat', () => {
    test('execute', () => {
      const commands = parseInput(
        ['F10', 'N3 ', 'F7 ', 'R90', 'L90', 'L90', 'R180', 'F11'].join('\n')
      )
      const boats = commands.reduce(
        (boats, command) => {
          boats.push(WaypointBoat.execute(last(boats), command))
          return boats
        },
        [new WaypointBoat()]
      )

      let i = 0
      expect(boats[i++]).toMatchObject({ x: 0, y: 0, wx: 10, wy: 1 })
      expect(boats[i++]).toMatchObject({ x: 100, y: 10, wx: 10, wy: 1 }) // F10
      expect(boats[i++]).toMatchObject({ x: 100, y: 10, wx: 10, wy: 4 }) // N3
      expect(boats[i++]).toMatchObject({ x: 170, y: 38, wx: 10, wy: 4 }) // F7
      expect(boats[i++]).toMatchObject({ x: 170, y: 38, wx: 4, wy: -10 }) // R90
      expect(boats[i++]).toMatchObject({ x: 170, y: 38, wx: 10, wy: 4 }) // L90
      expect(boats[i++]).toMatchObject({ x: 170, y: 38, wx: -4, wy: 10 }) // L90
      expect(boats[i++]).toMatchObject({ x: 170, y: 38, wx: 4, wy: -10 }) // R180
      expect(boats[i++]).toMatchObject({ x: 214, y: -72, wx: 4, wy: -10 }) // F11
    })
  })
})
