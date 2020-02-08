import { PerformanceMatrixHelper } from '~/lib/performance-matrix-helper'
import { exampleGames, examplePerfomanceMatrix, AppliedOnce, miniAppliedOnce, miniVDataset, exampleVDataset } from '@/models/const/example-games'

describe('PerformanceMatrixHelper', () => {
  describe('#createMatrix', () => {
    const createMatrix = PerformanceMatrixHelper.createMatrix
    test('should return an empty performanceMatrix', () => {
      const receivedMatrix = createMatrix(3)
      expect(receivedMatrix.length).toBe(3)
      expect(receivedMatrix[0].length).toBe(3)
      expect(receivedMatrix[2][2]).toEqual({
        win: 0,
        lose: 0
      })
    })
  })

  describe('#applyWin', () => {
    const applyWin = PerformanceMatrixHelper.applyWin
    const createMatrix = PerformanceMatrixHelper.createMatrix
    describe('should count win correctly', () => {
      test('emptyMatrix 2x2', () => {
        const matrix = createMatrix(2)
        const modifiedMatrix = applyWin(0, 1, matrix)
        expect(modifiedMatrix[0][0].win).toBe(0)
        expect(modifiedMatrix[0][1].win).toBe(1)
        expect(modifiedMatrix[1][0].win).toBe(0)
        expect(modifiedMatrix[1][1].win).toBe(0)
      })

      test('notEmptyMatrix', () => {
        const matrix = examplePerfomanceMatrix
        const modifiedMatrix = applyWin(0, 1, matrix)
        expect(modifiedMatrix[0][0].win).toBe(1)
        expect(modifiedMatrix[0][1].win).toBe(2) // added
        expect(modifiedMatrix[0][2].win).toBe(2)
        expect(modifiedMatrix[1][0].win).toBe(0)
        expect(modifiedMatrix[1][1].win).toBe(0)
        expect(modifiedMatrix[1][2].win).toBe(1)
        expect(modifiedMatrix[2][0].win).toBe(0)
        expect(modifiedMatrix[2][1].win).toBe(0)
        expect(modifiedMatrix[2][2].win).toBe(0)
      })
    })
  })

  describe('#lose', () => {
    const applyLose = PerformanceMatrixHelper.applyLose
    const createMatrix = PerformanceMatrixHelper.createMatrix
    describe('should count lose correctly', () => {
      test('emptyMatrix 2x2', () => {
        const matrix = createMatrix(2)
        const modifiedMatrix = applyLose(0, 1, matrix)
        expect(modifiedMatrix[0][0].lose).toBe(0)
        expect(modifiedMatrix[0][1].lose).toBe(1)
        expect(modifiedMatrix[1][0].lose).toBe(0)
        expect(modifiedMatrix[1][1].lose).toBe(0)
      })

      test('notEmptyMatrix', () => {
        const matrix = examplePerfomanceMatrix
        const modifiedMatrix = applyLose(0, 1, matrix)
        expect(modifiedMatrix[0][0].lose).toBe(1)
        expect(modifiedMatrix[0][1].lose).toBe(1) // lose
        expect(modifiedMatrix[0][2].lose).toBe(0)
        expect(modifiedMatrix[1][0].lose).toBe(1)
        expect(modifiedMatrix[1][1].lose).toBe(0)
        expect(modifiedMatrix[1][2].lose).toBe(0)
        expect(modifiedMatrix[2][0].lose).toBe(2)
        expect(modifiedMatrix[2][1].lose).toBe(1)
        expect(modifiedMatrix[2][2].lose).toBe(0)
      })
    })
  })

  describe('#applyGame', () => {
    const createMatrix = PerformanceMatrixHelper.createMatrix
    const decklist = PerformanceMatrixHelper.getAllDecks(exampleGames)
    test('should apply a game record correctly', () => {
      const matrix = createMatrix(3)
      const firstGame = exampleGames[0]
      expect(PerformanceMatrixHelper.applyGame(matrix, firstGame, decklist)).toEqual(AppliedOnce)
    })
  })

  describe('#extractData', () => {
    const games = exampleGames
    test('should return a complete perfomanceMatrix', () => {
      const expectedMatrix = examplePerfomanceMatrix
      const receivedMatrix = PerformanceMatrixHelper.extractData(games)
      expect(receivedMatrix).toEqual(expectedMatrix)
    })
  })

  describe('#transformMatrixIntoVdataset', () => {
    test('should return dataset with v-table data format', () => {
      const receivedMiniDataset = PerformanceMatrixHelper.transformMatrixIntoVDataset(miniAppliedOnce, ['A', 'B'])
      expect(receivedMiniDataset).toEqual(miniVDataset)
      const receivedMatrix = PerformanceMatrixHelper.transformMatrixIntoVDataset(examplePerfomanceMatrix, ['A', 'B', 'C'])
      expect(receivedMatrix).toEqual(exampleVDataset)
    })
  })
})
