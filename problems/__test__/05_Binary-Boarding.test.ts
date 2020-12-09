import problem05, {
  computeSeat,
  computeSeatId,
  takeLowerHalf,
  takeUpperHalf,
} from '../05_Binary-Boarding'

describe('Problem 05', () => {
  test.todo(`answer is ${problem05.solve()}`)
  test.todo(`answer is ${problem05.solveBonus()}`)

  describe('helpers', () => {
    test('takeLowerHalf', () => {
      expect(takeLowerHalf([0, 127])).toMatchObject([0, 63])
      expect(takeLowerHalf([32, 63])).toMatchObject([32, 47])
      expect(takeLowerHalf([44, 47])).toMatchObject([44, 45])
      expect(takeLowerHalf([44, 45])).toMatchObject([44, 44])
    })

    test('takeUpperHalf', () => {
      expect(takeUpperHalf([0, 63])).toMatchObject([32, 63])
      expect(takeUpperHalf([32, 47])).toMatchObject([40, 47])
      expect(takeUpperHalf([40, 47])).toMatchObject([44, 47])
      expect(takeUpperHalf([46, 47])).toMatchObject([47, 47])
    })

    test('computeSeat', () => {
      expect(computeSeat('FBFBBFFRLR')).toMatchObject({ row: 44, col: 5 })
      expect(computeSeat('BFFFBBFRRR')).toMatchObject({ row: 70, col: 7 })
      expect(computeSeat('FFFBBBFRRR')).toMatchObject({ row: 14, col: 7 })
      expect(computeSeat('BBFFBBFRLL')).toMatchObject({ row: 102, col: 4 })
    })

    test('computeSeatId', () => {
      expect(computeSeatId({ row: 44, col: 5 })).toBe(357)
      expect(computeSeatId({ row: 70, col: 7 })).toBe(567)
      expect(computeSeatId('FFFBBBFRRR')).toBe(119)
      expect(computeSeatId('BBFFBBFRLL')).toBe(820)
    })
  })
})
