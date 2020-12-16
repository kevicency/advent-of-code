import { assign } from 'lodash'
import { Problem } from '../../Problem'
import inputTxt from './input.txt'
import description from './PROBLEM.md'

const input = parseInput(inputTxt)

export default {
  input,
  description,

  solve: (instructions = input) =>
    new BootProcess(instructions).run().accumulator,

  solveBonus: (instructions = input) => {
    const process = new BootProcess(instructions).runBonus()
    return process.stopCode === 'terminate' ? process.accumulator : undefined
  },
} as Problem

export interface Instruction {
  op: 'acc' | 'jmp' | 'nop'
  arg: number
}
export function parseInput(contents: string): Instruction[] {
  const instructionRegex = /^(\w{3}) ([+-]\d+)$/

  return contents
    .split('\n')
    .map((line) => line.trim())
    .map((line) => {
      const match = line.match(instructionRegex)

      return match
        ? ({
            op: match[1] as any,
            arg: +match[2],
          } as Instruction)
        : null
    })
    .filter(Boolean)
}

export class BootProcess {
  static ID = 0
  static FORKS: BootProcess[] = []

  id = 0
  instructions: Instruction[]
  accumulator = 0
  pointer = 0
  visited: Record<number, boolean> = {}
  stopCode: 'loop' | 'terminate'
  runContext: {
    forked: Record<number, boolean>
    forkQueue: BootProcess[]
  }

  constructor(instructions: Instruction[]) {
    this.id = BootProcess.ID++
    this.instructions = instructions
  }

  run(): BootProcess {
    do {
      this.visited[this.pointer] = true

      const instruction = this.instructions[this.pointer]

      this.handle(instruction)
    } while (
      this.visited[this.pointer] !== true &&
      this.pointer < this.instructions.length
    )

    this.stopCode = this.visited[this.pointer] ? 'loop' : 'terminate'

    return this
  }

  runBonus(): BootProcess {
    const ctx = (this.runContext = this.runContext || {
      forkQueue: [],
      forked: {},
    })

    do {
      this.visited[this.pointer] = true

      const { op, arg } = this.instructions[this.pointer]

      if (!ctx.forked[this.pointer] && (op == 'nop' || op == 'jmp')) {
        ctx.forked[this.pointer] = true

        const fork = this.clone()

        fork.instructions[this.pointer] = {
          op: op === 'nop' ? 'jmp' : 'nop',
          arg,
        }

        ctx.forkQueue.push(fork)
      }

      this.handle({ op, arg })
    } while (
      this.visited[this.pointer] !== true &&
      this.pointer < this.instructions.length
    )

    this.stopCode = this.visited[this.pointer] ? 'loop' : 'terminate'

    if (this.stopCode === 'loop' && ctx.forkQueue.length) {
      return ctx.forkQueue.splice(0, 1)[0].runBonus()
    }

    return this
  }

  handle(instruction: Instruction): void {
    switch (instruction.op) {
      case 'acc':
        this.accumulator += instruction.arg
        this.pointer += 1
        break
      case 'jmp':
        this.pointer += instruction.arg
        break
      case 'nop':
      default:
        this.pointer += 1
    }
  }

  clone(): BootProcess {
    const clone = new BootProcess([...this.instructions])

    clone.accumulator = this.accumulator
    clone.pointer = this.pointer
    clone.visited = assign({}, this.visited)
    clone.runContext = this.runContext // share the run context

    return clone
  }
}
