import defaultList from '@/./default-archtype-list'
import { GameTitle } from '~/models/const/enums'

export class DeckHelper {
  static getDefaultDecks(gameTitle: GameTitle): string[] {
    switch (gameTitle) {
      case GameTitle.mtg:
        return defaultList.mtg
      case GameTitle.pcg:
        return defaultList.pcg
      case GameTitle.ocg:
        return defaultList.ocg
      case GameTitle.ws:
        return defaultList.ws
      default:
        return []
    }
  }
}
