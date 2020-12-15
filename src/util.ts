import { noop } from 'lodash'
import { performance, PerformanceObserver } from 'perf_hooks'

export function result<T>(name: string, fn: () => T): T {
  const { result, duration } = measure(fn)

  describe(`${name}: ${result} (${
    Math.round(duration * 100) / 100
  } ms) `, () => {
    it('', noop)
  })

  return result
}

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