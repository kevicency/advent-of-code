import Graph from 'graph-data-structure'
import { Problem } from '../Problem'
import inputTxt from './input.txt'
import description from './PROBLEM.md'

const input = parseInput(inputTxt)

export default {
  input,
  description,

  solve: () => getOutermostBags(generateGraph(input)).size,
  solveBonus: () => getTotalInnerBagCount(generateGraphBonus(input)),
} as Problem

export interface BagDefinition {
  bag: string
  children: Array<{ bag: string; count: number }>
}
export function parseInput(contents: string): BagDefinition[] {
  return contents
    .split('\n')
    .map((line) => {
      const outerBagMatch = line.match(/^(\w+ \w+) bags?/)
      const innerBagMatches = Array.from(
        line.matchAll(/(\d+) (\w+ \w+) bags?/g)
      )

      return outerBagMatch
        ? ({
            bag: outerBagMatch[1],
            children: innerBagMatches.map((match) => ({
              bag: match[2],
              count: +match[1],
            })),
          } as BagDefinition)
        : null
    })
    .filter(Boolean)
}

export function generateGraph(bagDefinitions: BagDefinition[]): typeof Graph {
  return bagDefinitions.reduce((graph, { bag, children }) => {
    if (children.length === 0) {
      graph.addNode(bag)
    } else {
      children.forEach((childBag) =>
        graph.addEdge(childBag.bag, bag, childBag.count)
      )
    }

    return graph
  }, new Graph())
}

// invert all edges from default graph
export function generateGraphBonus(
  bagDefinitions: BagDefinition[]
): typeof Graph {
  return bagDefinitions.reduce((graph, { bag, children }) => {
    if (children.length === 0) {
      graph.addNode(bag)
    } else {
      children.forEach((childBag) =>
        graph.addEdge(bag, childBag.bag, childBag.count)
      )
    }

    return graph
  }, new Graph())
}

export function getOutermostBags(
  graph: typeof Graph,
  bag = 'shiny gold'
): Set<string> {
  return new Set(graph.depthFirstSearch([bag], false))
}

export function getTotalInnerBagCount(
  graph: typeof Graph,
  startBag = 'shiny gold'
): number {
  let totalCount = 0

  function dsfVisit(bag: string, count: number) {
    totalCount += count

    graph
      .adjacent(bag)
      .forEach((adjacentBag) =>
        dsfVisit(adjacentBag, count * graph.getEdgeWeight(bag, adjacentBag))
      )
  }

  dsfVisit(startBag, 1)

  return totalCount - 1
}
