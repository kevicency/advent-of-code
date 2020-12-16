import { flow, map, minBy } from 'lodash/fp'
import { asSequence } from 'sequency'
import { Problem } from '../../Problem'
import inputTxt from './input.txt'
import description from './PROBLEM.md'

const input = parseInput(inputTxt)

export function parseInput(contents: string): Timetable {
  const lines = contents.split('\n')

  return {
    timestamp: +lines[0],
    busses: lines[1]
      .split(',')
      .filter((x) => x !== 'x')
      .map((x) => +x),
  }
}

type Bus = { id: number; offset: number }
export function parseInputBonus(contents: string): Bus[] {
  const line = contents.split('\n')[1]

  return line
    .split(',')
    .map((id, i) => ({ id: +id, offset: i }))
    .filter((bus) => !isNaN(bus.id))
}

export type Timetable = {
  timestamp: number
  busses: number[]
}

export default {
  input,
  description,

  solve: ({ timestamp, busses }: Timetable = input) =>
    flow(
      map((bus: number) => [
        bus,
        Math.round((Math.ceil(timestamp / bus) - timestamp / bus) * bus),
      ]),
      minBy(([_bus, wait]) => wait),
      ([bus, wait]) => bus * wait
    )(busses),
  solveBonus: (busses: Bus[] = parseInputBonus(inputTxt)) => {
    let time = 0
    let step = 1

    for (const bus of busses) {
      time = asSequence(generate(time, step)).find(
        (n) => (n + bus.offset) % bus.id === 0
      )
      step *= bus.id
    }

    return time
  },
} as Problem

function* generate(start: number, step: number) {
  let next = start

  while (Number.MAX_SAFE_INTEGER - start > step) {
    next += step
    yield next
  }
}
