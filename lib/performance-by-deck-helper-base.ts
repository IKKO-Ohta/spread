import { GameInfo } from '@/models/@types/game'
import { VTableRow } from '@/models/@types/matrix'
import { Result, Bw } from '~/models/const/enums'
import { DisplayConfig } from '@/models/@types/display-config'

export interface Round {
  deck: string | null
  result: Result
  bw: Bw
}

export abstract class PerformanceByDeckHelperBase {
  config: DisplayConfig

  constructor(displayConfig: DisplayConfig) {
    this.config = displayConfig
  }

  abstract applyGame(_state: VTableRow[], _game: GameInfo): VTableRow[]

  getAllDecks(games: GameInfo[]): string[] {
    const allDecks: string[] = []
    games.forEach((game) => {
      allDecks.push(game.myDeck!)
      allDecks.push(game.oppDeck!)
    })
    return allDecks.filter(this.distinct).sort()
  }

  calcPerformanceByDeck(games: GameInfo[]): VTableRow[] {
    const initialState: VTableRow[] = this.getAllDecks(games).map((deck) => {
      return {
        name: deck,
        winByMain: '0-0',
        winByMainBlack: '0-0',
        winByMainWhite: '0-0',
        winBySided: '0-0',
        winBySidedBlack: '0-0',
        winBySidedWhite: '0-0',
        totalWithoutMirror: '0-0',
        total: '0-0'
      }
    })
    return this.applyGames(initialState, games)
  }

  applyGames(state: VTableRow[], games: GameInfo[]): VTableRow[] {
    let resultState = [...state]
    for (const game of games) {
      resultState = this.applyGame(resultState, game)
    }
    return resultState
  }

  applyBo1Game(state: VTableRow[], round: Round) {
    return state.map((row) => {
      if (row.name === round.deck) {
        if (round.bw === Bw.black) {
          return { ...row, winByMain: this.applyWinOrLose(row.winByMain, round.result), winByMainBlack: this.applyWinOrLose(row.winByMainBlack, round.result) }
        } else if (round.bw === Bw.white) {
          return { ...row, winByMain: this.applyWinOrLose(row.winByMain, round.result), winByMainWhite: this.applyWinOrLose(row.winByMainWhite, round.result) }
        } else {
          throw new Error('#applyBo1Game unexpected BO1 game data')
        }
      } else {
        return row
      }
    })
  }

  protected applyRound(state: VTableRow[], round: Round, roundNumber: Number): VTableRow[] {
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

  protected applyWinOrLose(str: string, result: Result) {
    const arr = str.split('-')
    const win = parseInt(arr[0])
    const lose = parseInt(arr[1])
    if (result === Result.win) {
      return `${(win + 1).toString()}-${lose.toString()}`
    } else {
      return `${win.toString()}-${(lose + 1).toString()}`
    }
  }

  protected distinct<T>(value: T, index: number, self: T[]): boolean {
    return self.indexOf(value) === index
  }
}
