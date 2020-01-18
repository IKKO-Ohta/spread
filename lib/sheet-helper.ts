import { GameTitle, BestOf } from '@/models/const/enums'

export class SheetHelper {
  static getDBestOf(gameTitle: GameTitle): BestOf {
    switch (gameTitle) {
      case GameTitle.mtg:
        return BestOf.Bo3
      case GameTitle.pcg:
        return BestOf.Bo1
      case GameTitle.ocg:
        return BestOf.Bo3
      case GameTitle.ws:
        return BestOf.Bo1
      case GameTitle.hs:
        return BestOf.Bo1
      case GameTitle.sv:
        return BestOf.Bo1
      case GameTitle.otherBo3:
        return BestOf.Bo3
      case GameTitle.otherBo1:
        return BestOf.Bo1
      default:
        return BestOf.Bo1
    }
  }
}
