import { noop } from 'lodash'
import { curry } from 'lodash/fp'
import { performance, PerformanceObserver } from 'perf_hooks'

export function result<T>(name: string, fn: () => T, optional = false): T {
  const { result, duration } =
    optional && process.env.OPTIONAL !== 'true'
      ? {
          result: "Optional test (slow). Run jest with 'OPTIONAL=true yarn test'" as any,
          duration: 0,
        }
      : measure(fn)

  console.log({ result, duration })

  describe(`${name}: ${result} (${
    Math.round(duration * 100) / 100
  } ms) `, () => {
    it('', noop)
  })

  return result
}

export const resultPart1 = curry(result)('Part 1')
export const resultPart2 = <T>(fn: () => T, optional = false) =>
  result('Part 2', fn, optional)

function measure<T>(fn: () => T) {
  // Wrap the solver for performance measurment
  const wrapped = performance.timerify(fn)

  let duration = 0
  const obs = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      duration += entry.duration
    }
  })
  obs.observe({
    entryTypes: ['function'],
    buffered: false,
  })

  const result = wrapped()

  obs.disconnect()

  return { result, duration: duration }
}
