import { all, any, flatten, without } from 'lodash/fp'
import { lines, toMap } from '../fp'
import { resultPart1, resultPart2 } from '../util'
import inputTxt from './data/16.txt'

describe('Day 16', () => {
  type Range = [min: number, max: number]
  interface Field {
    name: string
    ranges: Range[]
  }
  type Fields = Map<string, Field>
  type Ticket = number[]
  interface Input {
    fields: Fields
    myTicket: Ticket
    otherTickets: Ticket[]
  }

  function parseInput(contents: string): Input {
    return contents
      .split('\n\n')
      .map(lines)
      .reduce((input, chunk, i) => {
        switch (i) {
          case 0:
            input.fields = parseFields(chunk)
            break
          case 1:
            input.myTicket = parseTicket(chunk[1])
            break
          case 2:
            input.otherTickets = chunk.slice(1).map(parseTicket)
        }

        return input
      }, {} as Input)
  }

  function parseTicket(line: string) {
    return line.split(',').map(Number)
  }

  function parseFields(lines: string[]) {
    return lines.reduce((fields, line) => {
      const [name, rest] = line.split(':')
      const rangeMatch = rest.match(/(\d+)-(\d+) or (\d+)-(\d+)/)

      fields.set(name, {
        name,
        ranges: [
          [+rangeMatch[1], +rangeMatch[2]],
          [+rangeMatch[3], +rangeMatch[4]],
        ],
      })

      return fields
    }, new Map<string, Field>())
  }

  test('parseFields', () => {
    /* prettier-ignore */
    expect(parseFields(lines(`
        class: 1-3 or 5-7
        row: 6-11 or 33-44
        seat: 13-40 or 45-50
    `))).toStrictEqual(toMap<Field>({
      class: {
        name: 'class',
        ranges: [ [1, 3], [5, 7], ],
      },
      row: {
        name: 'row',
        ranges: [ [6, 11], [33, 44], ],
      },
      seat: {
        name: 'seat',
        ranges: [ [13, 40], [45, 50], ],
      },
    }))
  })

  const testInput = parseInput(`
    class: 1-3 or 5-7
    row: 6-11 or 33-44
    seat: 13-40 or 45-50

    your ticket:
    7,1,14

    nearby tickets:
    7,3,47
    40,4,50
    55,2,20
    38,6,12
  `)

  test('parseTickets', () => {
    // prettier-ignore
    expect(testInput).toStrictEqual({
      fields: toMap({
        class: { name: 'class', ranges: [ [1, 3], [5, 7], ], },
        row: { name: 'row', ranges: [ [6, 11], [33, 44], ], },
        seat: { name: 'seat', ranges: [ [13, 40], [45, 50], ], },
      }),
      myTicket: [7,1,14],
      otherTickets: [
        [7,3,47],
        [40,4,50],
        [55,2,20],
        [38,6,12]
      ]
    })
  })

  function isInRange(value: number, [min, max]: Range) {
    return value >= min && value <= max
  }

  function getInvalidTicketValues(ticket: Ticket, fields: Fields): number[] {
    return ticket.filter((value) => {
      const ranges = Array.from(fields.values()).flatMap(
        (field) => field.ranges
      )

      return all((range: Range) => !isInRange(value, range))(ranges)
    })
  }

  resultPart1(() => {
    const input = parseInput(inputTxt)

    return input.otherTickets
      .flatMap((ticket) => getInvalidTicketValues(ticket, input.fields))
      .reduce((sum, n) => sum + n)
  })

  function validTickets(tickets: Ticket[], fields: Fields) {
    return tickets.filter(
      (ticket) => getInvalidTicketValues(ticket, fields).length === 0
    )
  }

  test('validTickets', () => {
    expect(
      validTickets(testInput.otherTickets, testInput.fields)
    ).toStrictEqual([testInput.otherTickets[0]])
  })

  const testInputPart2 = parseInput(`
    class: 0-1 or 4-19
    row: 0-5 or 8-19
    seat: 0-13 or 16-19

    your ticket:
    11,12,13

    nearby tickets:
    3,9,18
    15,1,5
    5,14,9
  `)

  function isInAnyRange(value: number, ranges: Range[]) {
    return any((range: Range) => isInRange(value, range))(ranges)
  }

  function allValuesInAnyRange(values: number[], ranges: Range[]) {
    return all((value: number) => isInAnyRange(value, ranges))(values)
  }

  test('allValuesInAnyRange', () => {
    // prettier-ignore
    expect( allValuesInAnyRange(
        [1, 5, 10],
        [ [0, 4], [5, 15], ]
    ) ).toBeTruthy()
  })

  function getFieldPositions(input: Input) {
    const fieldNames = Array.from(input.fields.keys())

    let allCandidates = input.myTicket.map(() => [...fieldNames])
    const tickets = validTickets(input.otherTickets, input.fields).concat([
      input.myTicket,
    ])
    const getRanges = (fieldName: string) => input.fields.get(fieldName).ranges

    let safety = 0

    do {
      allCandidates = allCandidates.map((candidates, i) => {
        const values = tickets.map((ticket) => ticket[i])

        return candidates.filter((fieldName) =>
          allValuesInAnyRange(values, getRanges(fieldName))
        )
      })

      // remove fields which is the only remaining candidate from all others
      for (const candidates of [...allCandidates]) {
        if (candidates.length === 1) {
          allCandidates = allCandidates.map((c) =>
            c.length !== 1 ? without(candidates)(c) : c
          )
        }
      }

      safety += 1
    } while (
      any((candidates: string[]) => candidates.length > 1)(allCandidates) &&
      safety < 100
    )

    return flatten(allCandidates)
  }

  test('getFieldPositions', () => {
    expect(getFieldPositions(testInputPart2)).toStrictEqual([
      'row',
      'class',
      'seat',
    ])
  })

  resultPart2(() => {
    const input = parseInput(inputTxt)
    const fieldPositions = getFieldPositions(input)

    console.log({ fieldPositions })

    return fieldPositions
      .map((fieldName, i) =>
        fieldName.startsWith('departure') ? input.myTicket[i] : 1
      )
      .reduce((prod, n) => prod * n)
  })
})
