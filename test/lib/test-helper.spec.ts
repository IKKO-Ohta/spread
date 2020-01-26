import { TestHelper } from '@/lib/test-helper'
describe('Test-Helper', () => {
  describe('#execTest', () => {
    test('should return red', () => {
      expect(TestHelper.execTest(6, 20)).toBe('deep red')
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
    test('should return deep green ', () => {
      const res = TestHelper._getZ(22, 33, 0.5)
      expect(TestHelper._getResult(res)).toBe('deep green')
    })

    test('should return green ', () => {
      const res = TestHelper._getZ(29, 49, 0.5)
      expect(TestHelper._getResult(res)).toBe('green')
    })

    test('should return light green ', () => {
      const res = TestHelper._getZ(11, 17, 0.5)
      expect(TestHelper._getResult(res)).toBe('light green')
    })

    test('should return empty ', () => {
      const res = TestHelper._getZ(14, 25, 0.5)
      expect(TestHelper._getResult(res)).toBe('')
    })

    test('should return light red ', () => {
      const res = TestHelper._getZ(6, 17, 0.5)
      expect(TestHelper._getResult(res)).toBe('light red')
    })

    test('should return red ', () => {
      const res = TestHelper._getZ(1, 6, 0.5)
      expect(TestHelper._getResult(res)).toBe('red')
    })

    test('should return deep red ', () => {
      const res = TestHelper._getZ(2, 9, 0.5)
      expect(TestHelper._getResult(res)).toBe('deep red')
    })
  })
})
