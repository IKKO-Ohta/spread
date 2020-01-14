/* eslint-disable dot-notation */
import { Game } from '@/models/@types/game'
import { Result } from '@/models/const/enums'
import { Matrix, Header } from '@/models/@types/matrix'

export interface VTabledPerformanceElem {
  name: string
  deckA: number
  deckB: number
  // hogehoge...
  total: number
}

export class AnalyticsHelper {
  static createMatrix(length: number): Matrix {
    return Array(length).fill(
      Array(length).fill({
        win: 0,
        lose: 0,
        draw: 0
      })
    )
  }

  static extractData(games: Game[]): Matrix {
    const allDecks = this.getAllDecks(games)
    let matrix: Matrix = this.createMatrix(allDecks.length)

    for (const game of games) {
      matrix = this.applyGame(matrix, game, allDecks)
    }
    return matrix
  }

  static applyGame(matrix: Matrix, game: Game, decklist: string[]): Matrix {
    const myDeckIndex = decklist.indexOf(game.myDeck!)
    const oppDeckIndex = decklist.indexOf(game.oppDeck!)
    const winSideIndex = game.win === Result.win ? myDeckIndex : oppDeckIndex
    const loseSideIndex = winSideIndex === myDeckIndex ? oppDeckIndex : myDeckIndex

    // mirror-match
    if (winSideIndex === loseSideIndex) {
      let newMatrix = this.applyWin(winSideIndex, loseSideIndex, matrix)
      newMatrix = this.applyLose(loseSideIndex, winSideIndex, newMatrix)
      return newMatrix
    }

    // others
    const newMatrix = matrix.map((arr, i) => {
      return arr.map((elem, j) => {
        if (i === winSideIndex && j === loseSideIndex) {
          return { ...elem, win: elem.win + 1 }
        } else if (i === loseSideIndex && j === winSideIndex) {
          return { ...elem, lose: elem.lose + 1 }
        } else {
          return elem
        }
      })
    })
    return newMatrix
  }

  static applyWin(winSideIndex: number, loseSideIndex: number, matrix: Matrix): Matrix {
    const newMatrix = matrix.map((arr, i) => {
      return arr.map((elem, j) => {
        if (i === winSideIndex && j === loseSideIndex) {
          return { ...elem, win: elem.win + 1 }
        } else {
          return elem
        }
      })
    })
    return newMatrix
  }

  static applyLose(loseSideIndex: number, winSideIndex: number, matrix: Matrix): Matrix {
    const newMatrix = matrix.map((arr, i) => {
      return arr.map((elem, j) => {
        if (i === loseSideIndex && j === winSideIndex) {
          return { ...elem, lose: elem.lose + 1 }
        } else {
          return elem
        }
      })
    })
    return newMatrix
  }

  static extractHeader(games: Game[]): Header[] {
    const ans: Header[] = []
    const headerTitle: Header = {
      text: 'デッキ',
      align: 'left',
      value: 'name',
      sortable: false
    }
    const headerTail: Header = {
      text: '合計',
      align: 'left',
      value: 'total',
      sortable: false
    }

    // get an extinct deck list
    const allDecks = this.getAllDecks(games)

    // assemble
    ans.push(headerTitle)
    allDecks.forEach((deck) => {
      ans.push({
        text: deck,
        value: deck,
        sortable: false
      })
    })
    ans.push(headerTail)

    return ans
  }

  static getAllDecks(games: Game[]): string[] {
    const allDecks: string[] = []
    games.forEach((game) => {
      allDecks.push(game.myDeck!)
      allDecks.push(game.oppDeck!)
    })
    return allDecks.filter(this.distinct).sort()
  }

  private static distinct<T>(value: T, index: number, self: T[]): boolean {
    return self.indexOf(value) === index
  }
}
