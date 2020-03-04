import { GameInfo } from '@/models/@types/game'
import { VTableRow } from '@/models/@types/matrix'
import { Result, Bw } from '~/models/const/enums'
import { DisplayConfig } from '@/models/@types/display-config'

export interface Round {
  deck: string | null
  result: Result
  bw: Bw
}
export class PerformanceByDeckHelper {
  config: DisplayConfig

  constructor(displayConfig: DisplayConfig) {
    this.config = displayConfig
  }

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

  applyGame(state: VTableRow[], game: GameInfo): VTableRow[] {
    let resultState = [...state]

    if (game.myDeck === game.oppDeck) {
      return this.config.countBothSide ? this.applyMirrorGame(resultState, game) : this.applyMirrorGameWithOnlyMyDeck(resultState, game)
    }

    resultState = this.config.countBothSide ? this.applyToTotal(resultState, game) : this.applyToTotalWithOnlyMyDeck(resultState, game)

    // return here if BO1
    if (!game.wins) {
      const myResult = {
        deck: game.myDeck,
        result: game.win,
        bw: game.black
      }
      const oppResult = {
        deck: game.oppDeck,
        result: game.win === Result.win ? Result.lose : Result.win,
        bw: game.black === Bw.black ? Bw.white : Bw.black
      }

      resultState = this.applyBo1Game(resultState, myResult)
      if (this.config.countBothSide) {
        resultState = this.applyBo1Game(resultState, oppResult)
      }
      return resultState
    }

    // BO3
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
      if (this.config.countBothSide) {
        resultState = this.applyRound(resultState, oppResult, i)
      }
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

  private applyRound(state: VTableRow[], round: Round, roundNumber: Number): VTableRow[] {
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

  private applyWinOrLose(str: string, result: Result) {
    const arr = str.split('-')
    const win = parseInt(arr[0])
    const lose = parseInt(arr[1])
    if (result === Result.win) {
      return `${(win + 1).toString()}-${lose.toString()}`
    } else {
      return `${win.toString()}-${(lose + 1).toString()}`
    }
  }

  private distinct<T>(value: T, index: number, self: T[]): boolean {
    return self.indexOf(value) === index
  }

  private applyToTotal(state: VTableRow[], game: GameInfo): VTableRow[] {
    const winSide = game.win === Result.win ? game.myDeck : game.oppDeck
    const loseSide = game.win === Result.win ? game.oppDeck : game.myDeck
    return state.map((row) => {
      if (row.name === winSide) {
        return { ...row, totalWithoutMirror: this.applyWinOrLose(row.totalWithoutMirror, Result.win), total: this.applyWinOrLose(row.total, Result.win) }
      } else if (row.name === loseSide) {
        return { ...row, totalWithoutMirror: this.applyWinOrLose(row.totalWithoutMirror, Result.lose), total: this.applyWinOrLose(row.total, Result.lose) }
      } else {
        return row
      }
    })
  }

  private applyToTotalWithOnlyMyDeck(state: VTableRow[], game: GameInfo): VTableRow[] {
    return state.map((row) => {
      if (row.name === game.myDeck) {
        return { ...row, totalWithoutMirror: this.applyWinOrLose(row.totalWithoutMirror, game.win), total: this.applyWinOrLose(row.total, game.win) }
      } else {
        return row
      }
    })
  }

  private applyMirrorGame(state: VTableRow[], game: GameInfo): VTableRow[] {
    return state.map((row) => {
      if (row.name === game.myDeck) {
        const [totalWin, totalLose] = row.total.split('-').map((elem) => parseInt(elem))
        return { ...row, total: `${totalWin + 1}-${totalLose + 1}` }
      } else {
        return row
      }
    })
  }

  private applyMirrorGameWithOnlyMyDeck(state: VTableRow[], game: GameInfo): VTableRow[] {
    return state.map((row) => {
      if (row.name === game.myDeck) {
        return { ...row, total: this.applyWinOrLose(row.total, game.win) }
      } else {
        return row
      }
    })
  }
}
