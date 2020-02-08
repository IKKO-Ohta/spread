import { GameInfo } from '@/models/@types/game'
import { VTableRow } from '@/models/@types/matrix'
import { Result, Bw } from '~/models/const/enums'

interface Round {
  deck: string | null
  result: Result
  bw: Bw
}

export class PerformanceByDeckHelper {
  static calcPerformanceByDeck(games: GameInfo[]): VTableRow[] {
    const initialState: VTableRow[] = this.getAllDecks(games).map((deck) => {
      return {
        name: deck,
        winByMain: '0-0',
        winByMainBlack: '0-0',
        winByMainWhite: '0-0',
        winBySided: '0-0',
        winBySidedBlack: '0-0',
        winBySidedWhite: '0-0',
        mirror: '0',
        total: '0-0'
      }
    })

    return this.applyGames(initialState, games)
  }

  static applyGames(state: VTableRow[], games: GameInfo[]): VTableRow[] {
    let resultState = [...state]
    for (const game of games) {
      resultState = this.applyGame(resultState, game)
    }
    return resultState
  }

  static applyGame(state: VTableRow[], game: GameInfo): VTableRow[] {
    let resultState = [...state]

    // mirror
    if (game.myDeck === game.oppDeck) {
      resultState = resultState.map((row) => {
        if (row.name === game.myDeck) {
          return { ...row, mirror: (parseInt(row.mirror) + 1).toString() }
        } else {
          return row
        }
      })
      return resultState
    }

    // total
    const winSide = game.win === Result.win ? game.myDeck : game.oppDeck
    const loseSide = game.win === Result.win ? game.oppDeck : game.myDeck
    resultState = resultState.map((row) => {
      if (row.name === winSide) {
        return { ...row, total: this.applyWinOrLose(row.total, Result.win) }
      } else if (row.name === loseSide) {
        return { ...row, total: this.applyWinOrLose(row.total, Result.lose) }
      } else {
        return row
      }
    })

    // if BO1, should return here
    if (!game.wins) {
      return state
    }

    // verbose
    for (let i = 0; i < game.wins.length; i++) {
      const myResult = {
        deck: game.myDeck,
        result: game.wins![i],
        bw: game.blacks![i]
      }
      const oppResult = {
        deck: game.oppDeck,
        result: game.wins![i] === Result.win ? Result.lose : Result.win,
        bw: game.blacks![i] === Bw.black ? Bw.white : Bw.black
      }

      resultState = this.applyRound(resultState, myResult, i)
      resultState = this.applyRound(resultState, oppResult, i)
    }

    return resultState
  }

  private static applyRound(state: VTableRow[], round: Round, roundNumber: Number): VTableRow[] {
    return state.map((row) => {
      // メインサイド後、先手後手、勝敗の３要素を場合分けする
      if (row.name === round.deck) {
        if (roundNumber === 0 && round.bw === Bw.black) {
          return { ...row, winByMain: this.applyWinOrLose(row.winByMain, round.result), winByMainBlack: this.applyWinOrLose(row.winByMainBlack, round.result) }
        } else if (roundNumber === 0 && round.bw === Bw.white) {
          return { ...row, winByMain: this.applyWinOrLose(row.winByMain, round.result), winByMainWhite: this.applyWinOrLose(row.winByMainWhite, round.result) }
        } else if (roundNumber !== 0 && round.bw === Bw.black) {
          return { ...row, winBySided: this.applyWinOrLose(row.winBySided, round.result), winBySidedBlack: this.applyWinOrLose(row.winBySidedBlack, round.result) }
        } else if (roundNumber !== 0 && round.bw === Bw.white) {
          return { ...row, winBySided: this.applyWinOrLose(row.winBySided, round.result), winBySidedWhite: this.applyWinOrLose(row.winBySidedWhite, round.result) }
        } else {
          throw new Error('#applyRound unexpected round data')
        }
      } else {
        return row
      }
    })
  }

  private static applyWinOrLose(str: string, result: Result) {
    const arr = str.split('-')
    const win = parseInt(arr[0])
    const lose = parseInt(arr[1])
    if (result === Result.win) {
      return `${(win + 1).toString()}-${lose.toString()}`
    } else {
      return `${win.toString()}-${(lose + 1).toString()}`
    }
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
