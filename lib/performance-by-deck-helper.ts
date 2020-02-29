import { GameInfo } from '@/models/@types/game'
import { VTableRow } from '@/models/@types/matrix'
import { Result, Bw } from '~/models/const/enums'
import { PerformanceByDeckHelperBase } from '@/lib/performance-by-deck-helper-base'

export class PerformanceByDeckHelper extends PerformanceByDeckHelperBase {
  applyGame(state: VTableRow[], game: GameInfo): VTableRow[] {
    let resultState = [...state]

    // mirror
    if (game.myDeck === game.oppDeck) {
      resultState = resultState.map((row) => {
        if (row.name === game.myDeck) {
          const [totalWin, totalLose] = row.total.split('-').map((elem) => parseInt(elem))
          return { ...row, total: `${totalWin + 1}-${totalLose + 1}` }
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
        return { ...row, totalWithoutMirror: this.applyWinOrLose(row.totalWithoutMirror, Result.win), total: this.applyWinOrLose(row.total, Result.win) }
      } else if (row.name === loseSide) {
        return { ...row, totalWithoutMirror: this.applyWinOrLose(row.totalWithoutMirror, Result.lose), total: this.applyWinOrLose(row.total, Result.lose) }
      } else {
        return row
      }
    })

    // if BO1, should return here
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
      resultState = this.applyBo1Game(resultState, oppResult)
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
      resultState = this.applyRound(resultState, oppResult, i)
    }

    return resultState
  }
}
