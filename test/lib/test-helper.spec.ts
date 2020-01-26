import { TestHelper } from '@/lib/test-helper'
import { PerfomanceColor } from '@/models/const/color'

describe('Test-Helper', () => {
  describe('#execTest', () => {
    test('should return red', () => {
      expect(TestHelper.execTest(6, 20)).toBe(PerfomanceColor.MINUS_HIGH_COLOR)
    })
  })

  describe('#getZ', () => {
    test('X=20, n=6, p=1/2 => z=-1.788', () => {
      const z = TestHelper._getZ(6, 20, 0.5)
      expect(z).toBeCloseTo(-1.788, 2)
    })

    test('X=12000, n=2200, p=1/6 => z=4.898', () => {
      const z = TestHelper._getZ(2200, 12000, 1 / 6)
      expect(z).toBeCloseTo(4.898, 2)
    })
  })

  describe('#_getResult', () => {
    test('should return PerfomanceColor.HIGH_COLOR ', () => {
      const res = TestHelper._getZ(22, 33, 0.5)
      expect(TestHelper._getResult(res)).toBe(PerfomanceColor.HIGH_COLOR)
    })

    test('should return PerfomanceColor.MID_COLOR ', () => {
      const res = TestHelper._getZ(29, 49, 0.5)
      expect(TestHelper._getResult(res)).toBe(PerfomanceColor.MID_COLOR)
    })

    test('should return green PerfomanceColor.LOW_COLOR', () => {
      const res = TestHelper._getZ(11, 17, 0.5)
      expect(TestHelper._getResult(res)).toBe(PerfomanceColor.LOW_COLOR)
    })

    test('should return PerfomanceColor.NOT_REJECT_COLOR', () => {
      const res = TestHelper._getZ(14, 25, 0.5)
      expect(TestHelper._getResult(res)).toBe(PerfomanceColor.NOT_REJECT_COLOR)
    })

    test('should return PerfomanceColor.NOT_REJECT_COLOR', () => {
      const res = TestHelper._getZ(0, 0, 0.5)
      expect(TestHelper._getResult(res)).toBe(PerfomanceColor.NOT_REJECT_COLOR)
    })

    test('should return red PerfomanceColor.MINUS_LOW_COLOR', () => {
      const res = TestHelper._getZ(6, 17, 0.5)
      expect(TestHelper._getResult(res)).toBe(PerfomanceColor.MINUS_LOW_COLOR)
    })

    test('should return perfomanceColor.MINUS_MID_COLOR', () => {
      const res = TestHelper._getZ(1, 6, 0.5)
      expect(TestHelper._getResult(res)).toBe(PerfomanceColor.MINUS_MID_COLOR)
    })

    test('should return PerfomanceColor.MINUS_HIGH_COLOR', () => {
      const res = TestHelper._getZ(2, 9, 0.5)
      expect(TestHelper._getResult(res)).toBe(PerfomanceColor.MINUS_HIGH_COLOR)
    })
  })
})
