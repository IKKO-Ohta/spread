import { Result, Bw } from '@/models/const/enums'

export interface Game {
  win: Result
  black: Bw
  myDeck: string | null
  oppDeck: string | null
  timestamp: string
  user: string
  describe: string
}
