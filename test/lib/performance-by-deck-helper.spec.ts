import { PerformanceByDeckHelper } from '@/lib/performance-by-deck-helper'
import { initialState, appliedOnce, miniBo3Game, exampleBo3Games } from '@/models/const/example-game-bo3'
describe('PerformanceByDeck', () => {
  describe('#applyGame', () => {
    test('should return v-data-table-items', () => {
      const received = PerformanceByDeckHelper.applyGame(initialState, miniBo3Game[0])
      expect(received).toEqual(appliedOnce)
    })
  })
  describe('#applyGames', () => {
    test('should return v-data-table-items', () => {
      const received = PerformanceByDeckHelper.applyGames(initialState, exampleBo3Games)
      expect(received[0].name).toBe('A')
      expect(received[0].total).toBe('4-1')
      expect(received[0].totalWithoutMirror).toBe('3-0')
      expect(received[0].winByMain).toBe('2-1')
      expect(received[0].winBySided).toBe('4-0')
    })
  })
})
