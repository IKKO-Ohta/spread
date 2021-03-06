/* eslint-disable dot-notation */
import { GameInfo } from '@/models/@types/game'
import { Result } from '~/models/const/enums'
import { Matrix, Header, VTableRow, MatrixElem } from '@/models/@types/matrix'

export class PerformanceMatrixHelper {
  static createMatrix(length: number): Matrix {
    return Array(length).fill(
      Array(length).fill({
        win: 0,
        lose: 0
      })
    )
  }

  static extractData(games: GameInfo[]): Matrix {
    const allDecks = this.getAllDecks(games)
    let matrix: Matrix = this.createMatrix(allDecks.length)

    for (const game of games) {
      matrix = this.applyGame(matrix, game, allDecks)
    }
    return matrix
  }

  static applyGame(matrix: Matrix, game: GameInfo, decks: string[]): Matrix {
    const myDeckIndex = decks.indexOf(game.myDeck!)
    const oppDeckIndex = decks.indexOf(game.oppDeck!)
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

  static transformMatrixIntoVDataset(matrix: Matrix, decks: string[]): VTableRow[] {
    return matrix.map((row, index, _arr) => this.transformRowIntoVRow(row, decks, index))
  }

  static transformRowIntoVRow(row: MatrixElem[], decks: string[], deckIndex: number): VTableRow {
    const total = this.sumPerformance(row)
    const mirror = row[deckIndex].win
    const data: VTableRow = { name: decks[deckIndex], total, totalWithoutMirror: this.getTotalWithoutMirror(total, mirror) }
    for (let i = 0; i < decks.length; i++) {
      const accessor = decks[i]
      data[accessor] = this.convertMatrixElemToString(row[i])
    }
    return data
  }

  private static convertMatrixElemToString(elem: MatrixElem): string {
    return `${elem.win}-${elem.lose}`
  }

  private static sumPerformance(row: MatrixElem[]): string {
    let win = 0
    let lose = 0
    for (const elem of row) {
      win += elem.win
      lose += elem.lose
    }
    return `${win}-${lose}`
  }

  private static getTotalWithoutMirror(total: string, mirror: number) {
    const [win, lose] = total.split('-').map((elem) => parseInt(elem))
    return `${win - mirror}-${lose - mirror}`
  }

  static extractHeader(games: GameInfo[]): Header[] {
    const ans: Header[] = []
    const headerTitle: Header = {
      text: 'デッキ',
      align: 'left',
      value: 'name',
      sortable: false
    }
    const headerTotalWithoutMirror: Header = {
      text: 'ミラーを除く合計',
      value: 'totalWithoutMirror',
      sortable: false,
      align: 'left'
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
    ans.push(headerTotalWithoutMirror)
    ans.push(headerTail)

    return ans
  }

  static getAllDecks(games: GameInfo[]): string[] {
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
