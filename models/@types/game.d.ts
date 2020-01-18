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

export interface Match {
  game1: {
    win: Result
    bw: Bw
  }
  game2: {
    win: Result
    bw: Bw
  }
  game3?: {
    win: Result
    bw: Bw
  }
}

export type GameNumber = 'game1' | 'game2' | 'game3'
