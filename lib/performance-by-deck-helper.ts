import { GameInfo } from '@/models/@types/game'
import { VTableRow } from '@/models/@types/matrix'
import { Result, Bw } from '~/models/const/enums'
import { PerformanceByDeckHelperBase } from '@/lib/performance-by-deck-helper-base'

export class PerformanceByDeckHelper extends PerformanceByDeckHelperBase {
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
