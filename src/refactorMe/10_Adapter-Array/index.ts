import Graph from 'graph-data-structure'
import { countBy, flow, identity, map, max, sortBy, sum, zip } from 'lodash/fp'
import { Problem } from '../../Problem'
import inputTxt from './input.txt'
import description from './PROBLEM.md'

export function parseInput(contents: string): number[] {
  return contents.split('\n').map(Number)
}

const input = parseInput(inputTxt)

export default {
  input,
  description,

  solve: (adapters: number[] = input) => {
    const counts = flow(
      sortBy(identity),
      toPairs,
      countBy(([x, y]) => y - x)
    )([...adapters, 0, max(adapters) + 3])

    return counts[1] * counts[3]
  },
  solveBonus: (adapters: number[] = input) => {
    const graph = getAdapterGraph(adapters)

    return countPaths(graph)
  },
} as Problem

export const toPairs = (arr: number[]): [number, number][] =>
  zip(arr.slice(0, -1), arr.slice(1))

export function countPaths(
  graph: typeof Graph,
  node = '0',
  cache = {}
): number {
  const adjacent = graph.adjacent(node)

  return adjacent.length === 0
    ? 1
    : (cache[node] =
        cache[node] ||
        flow(
          map((adj: string) => countPaths(graph, adj, cache)),
          sum
        )(adjacent))
}

export function getAdapterGraph(adapters: number[]): typeof Graph {
  const connections = Array.from(adapterConnections(adapters))

  return connections.reduce((graph, [from, to]) => {
    graph.addEdge(`${from}`, `${to}`, to - from)

    return graph
  }, new Graph())
}

export function* adapterConnections(
  adapters: number[],
  dMax = 3
): Generator<[number, number]> {
  const arr = sortBy(identity, [0, ...adapters, max(adapters) + 3])

  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      const delta = arr[j] - arr[i]

      if (delta <= dMax) {
        yield [arr[i], arr[j]]
      } else {
        break
      }
    }
  }
}
