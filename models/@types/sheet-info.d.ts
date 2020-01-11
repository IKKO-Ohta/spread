import { GameTitle } from '~/models/const/enums'

export interface SheetInfo {
  id: string
  members: string[]
  sheetName: string
  gameTitle: GameTitle
  decks: string[]
}
