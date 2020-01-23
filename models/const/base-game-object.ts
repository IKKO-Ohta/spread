import { GameInfo, Match } from '@/models/@types/game'
import { Result, Bw } from '@/models/const/enums'

export const baseGameObj: GameInfo = {
  win: Result.win,
  black: Bw.black,
  myDeck: null,
  oppDeck: null,
  user: '',
  timestamp: '',
  describe: '',
  id: ''
}

export const baseMatchObj: Match = {
  game1: {
    win: Result.win,
    bw: Bw.black
  },
  game2: {
    win: Result.lose,
    bw: Bw.white
  },
  game3: {
    win: Result.win,
    bw: Bw.black
  }
}
