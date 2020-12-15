import { flow, map, reduce, sum, zip } from 'lodash/fp'
import { lines } from '../fp'

describe('Day 14', () => {
  type Instruction =
    | {
        type: 'mask'
        mask: string
      }
    | {
        type: 'mem'
        address: number
        value: number
      }

  function parseInput(contents: string): Instruction[] {
    return flow(
      lines,
      map((line) => line.trim().split('=')),
      map(
        ([type, value]): Instruction =>
          type.startsWith('mem')
            ? {
                type: 'mem',
                address: +type.match(/\d+/)[0],
                value: +value,
              }
            : {
                type: 'mask',
                mask: value.trim(),
              }
      )
    )(contents)
  }

  const testInstructions = parseInput(`
    mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
    mem[8] = 11
    mem[7] = 101
    mem[8] = 0
  `)

  test('parseInput', () =>
    expect(testInstructions.slice(0, 2)).toStrictEqual([
      {
        type: 'mask',
        mask: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X',
      },
      {
        type: 'mem',
        address: 8,
        value: 11,
      },
    ]))

  function getMaskedValue(n: number, mask: string): number {
    const bin = n.toString(2).padStart(mask.length, '0')

    return flow(
      Array.from,
      zip(Array.from(mask)),
      reduce(
        (memo: string, [m, v]: [string, string]) => memo + (m === 'X' ? v : m),
        ''
      ),
      (bin) => Number.parseInt(bin, 2)
    )(bin)
  }

  test('getMaskedValue', () => {
    expect(getMaskedValue(9 /* 1001 */, '0X1X')).toBe(3)
  })

  type Memory = Map<number, number>

  function runInstructionsPart1(
    instructions: Instruction[],
    mask = '',
    memory = new Map<number, number>()
  ): Memory {
    if (instructions.length === 0) {
      return memory
    }

    const [instruction, ...rest] = instructions

    switch (instruction.type) {
      case 'mask':
        return runInstructionsPart1(rest, instruction.mask, memory)
      case 'mem':
        memory.set(instruction.address, getMaskedValue(instruction.value, mask))
        return runInstructionsPart1(rest, mask, memory)
    }
  }

  const memory = runInstructionsPart1(testInstructions)

  test('runInstructions', () => {
    expect(memory.get(7)).toBe(101)
    expect(memory.get(8)).toBe(64)
  })

  function memSum(memory: Map<number, number>): number {
    return sum(Array.from(memory.values()))
  }

  test('memSum', () => {
    expect(memSum(memory)).toBe(165)
  })

  describe('Part 1:', () => {
    it('result', () => {
      const result = flow(
        parseInput,
        runInstructionsPart1,
        memSum
      )(require('./data/14.txt'))

      expect(result).toBeDefined()

      console.log({ part1: result })
    })
  })

  function runInstructionsPart2(
    instructions: Instruction[]
  ): Map<number, number> {
    let mask = ''
    const memory = new Map<number, number>()

    function generateAddressMasks(start: number): string[] {
      let addressMasks = [
        Array.from(start.toString(2).padStart(mask.length, '0')),
      ]

      Array.from(mask).forEach((m, i) => {
        switch (m) {
          case '1':
            addressMasks.forEach((addressMask) => (addressMask[i] = '1'))
            break
          case 'X':
            addressMasks.forEach((addressMask) => (addressMask[i] = '1'))
            addressMasks = addressMasks.concat(
              addressMasks.map((addressMask) => [
                ...addressMask.slice(0, i),
                '0',
                ...addressMask.slice(i + 1),
              ])
            )
        }
      })

      return addressMasks.map((bits) => bits.join(''))
    }

    for (const instruction of instructions) {
      if (instruction.type === 'mask') {
        mask = instruction.mask
      }
      if (instruction.type == 'mem') {
        for (const addressMask of generateAddressMasks(instruction.address)) {
          memory.set(Number.parseInt(addressMask, 2), instruction.value)
        }
      }
    }
    return memory
  }

  const testInstructions2 = parseInput(`
    mask = 000000000000000000000000000000X1001X
    mem[42] = 100
    mask = 00000000000000000000000000000000X0XX
    mem[26] = 1
  `)

  const memory2 = runInstructionsPart2(testInstructions2)

  test('runInstructions2', () => {
    expect(memSum(memory2)).toBe(208)
  })

  describe('Part 2:', () => {
    it('result', () => {
      const result = flow(
        parseInput,
        runInstructionsPart2,
        memSum
      )(require('./data/14.txt'))

      expect(result).toBeDefined()

      console.log({ part2: result })
    })
  })
})
