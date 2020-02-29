import { PerformanceByDeckHelper } from '@/lib/performance-by-deck-helper'
import { initialState, appliedOnce, miniBo3Game, exampleBo3Games } from '@/models/const/example-game-bo3'
import { defaultDisplayConfig } from '@/models/const/default-display-config'

const helper = new PerformanceByDeckHelper(defaultDisplayConfig)

describe('PerformanceByDeckHelper', () => {
  describe('#applyGame', () => {
    test('should return v-data-table-items', () => {
      const received = helper.applyGame(initialState, miniBo3Game[0])
      expect(received).toEqual(appliedOnce)
    })
  })
  describe('#calcPerformanceByDeck', () => {
    test('should return v-data-table-items', () => {
      const received = helper.calcPerformanceByDeck(exampleBo3Games)
      expect(received[0].name).toBe('A')
      expect(received[0].total).toBe('4-1')
      expect(received[0].totalWithoutMirror).toBe('3-0')
      expect(received[0].winByMain).toBe('2-1')
      expect(received[0].winBySided).toBe('4-0')
    })
  })
})
