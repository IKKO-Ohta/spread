import { GameInfo } from '@/models/@types/game'
import { VTableRow } from '@/models/@types/matrix'
import { Result, Bw } from '~/models/const/enums'

interface Unit {
  deck: string | null
  result: Result
  bw: Bw
}

export class PerformanceByDeckHelpr {
  static applyGame(state: VTableRow[], game: GameInfo): VTableRow[] {
    let resultState = { ...state }

    if (!game.wins) {
      return state
    }

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

      resultState = this.applyUnit(resultState, myResult)
      resultState = this.applyUnit(resultState, oppResult)
    }

    return resultState
  }

  private static applyUnit(state: VTableRow[], _result: Unit): VTableRow[] {
    return state
  }
}
