import { PerformanceByDeckHelpr } from '@/lib/performance-by-deck-helper'
import { initialState, appliedOnce, miniBo3Game } from '@/models/const/example-game-bo3'
describe('PerformanceByDeck', () => {
  describe('#applyGame', () => {
    test('should return v-data-table-items', () => {
      const received = PerformanceByDeckHelpr.applyGame(initialState, miniBo3Game[0])
      expect(received).toBe(appliedOnce)
    })
  })
})
