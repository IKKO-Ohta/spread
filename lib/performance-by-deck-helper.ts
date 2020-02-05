import { GameInfo } from '@/models/@types/game'
import { VTableRow } from '@/models/@types/matrix'

export class PerformanceByDeckHelpr {
  static applyGame(state: VTableRow[], _game: GameInfo): VTableRow[] {
    return state
  }
}
