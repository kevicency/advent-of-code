import { Problem } from '../../Problem'
import inputTxt from './input.txt'
import description from './PROBLEM.md'

const input = parseInput(inputTxt)

export function parseInput(contents: string): Command[] {
  return contents.split('\n').map(parseCommand).filter(Boolean)
}

export default {
  input,
  description,

  solve: (commands: Command[] = input) =>
    Boat.manhattanDistance(
      commands.reduce(
        (boat, command) => Boat.execute(boat, command),
        new Boat()
      )
    ),
  solveBonus: (commands: Command[] = input) =>
    WaypointBoat.manhattanDistance(
      commands.reduce(
        (boat, command) => WaypointBoat.execute(boat, command),
        new WaypointBoat()
      )
    ),
} as Problem

export interface Command {
  name: string
  arg: number
}
export function parseCommand(command: string): Command {
  const match = command.match(/(\w)(\d+)/)

  return match ? { name: match[1], arg: +match[2] } : null
}

export class Boat {
  angle = 90
  x = 0
  y = 0

  static execute(boat: Boat, { name: cmd, arg }: Command): Boat {
    switch (cmd) {
      case 'N':
        return { ...boat, y: boat.y + arg }
      case 'E':
        return { ...boat, x: boat.x + arg }
      case 'S':
        return { ...boat, y: boat.y - arg }
      case 'W':
        return { ...boat, x: boat.x - arg }
      case 'L':
        return { ...boat, angle: boat.angle - arg }
      case 'R':
        return { ...boat, angle: boat.angle + arg }
      case 'F':
        return {
          ...boat,
          x: boat.x + Math.round(Math.sin((boat.angle * Math.PI) / 180)) * arg,
          y: boat.y + Math.round(Math.cos((boat.angle * Math.PI) / 180)) * arg,
        }
    }
  }

  static manhattanDistance(boat: Boat): number {
    return Math.abs(boat.x) + Math.abs(boat.y)
  }
}

export class WaypointBoat {
  x = 0
  y = 0
  wx = 10
  wy = 1

  static execute(boat: WaypointBoat, { name, arg }: Command): WaypointBoat {
    const rad = (90 * Math.PI) / 180
    const sin = Math.round(Math.sin(rad))
    const cos = Math.round(Math.cos(rad))

    switch (name) {
      case 'N':
        return { ...boat, wy: boat.wy + arg }
      case 'E':
        return { ...boat, wx: boat.wx + arg }
      case 'S':
        return { ...boat, wy: boat.wy - arg }
      case 'W':
        return { ...boat, wx: boat.wx - arg }
      case 'L':
        return arg === 0
          ? boat
          : WaypointBoat.execute(
              {
                ...boat,
                wx: -cos * boat.wx + -sin * boat.wy,
                wy: cos * boat.wy + sin * boat.wx,
              },
              { name, arg: arg - 90 }
            )
      case 'R':
        return arg === 0
          ? boat
          : WaypointBoat.execute(
              {
                ...boat,
                wx: cos * boat.wx + sin * boat.wy,
                wy: -cos * boat.wy + -sin * boat.wx,
              },
              { name, arg: arg - 90 }
            )
      case 'F':
        return {
          ...boat,
          x: boat.x + boat.wx * arg,
          y: boat.y + boat.wy * arg,
        }
    }
  }

  static manhattanDistance(boat: WaypointBoat): number {
    return Math.abs(boat.x) + Math.abs(boat.y)
  }
}
