import { Result, Bw } from '@/models/const/enums'
import { Game } from '@/models/@types/game'
import { Matrix } from '@/models/@types/matrix'

export const exampleGames: Game[] = [
  { myDeck: 'A', oppDeck: 'B', win: Result.win, black: Bw.black, timestamp: 'xxx', user: 'who', describe: '' },
  { myDeck: 'B', oppDeck: 'C', win: Result.win, black: Bw.black, timestamp: 'xxx', user: 'who', describe: '' },
  { myDeck: 'A', oppDeck: 'C', win: Result.win, black: Bw.black, timestamp: 'xxx', user: 'who', describe: '' },
  { myDeck: 'C', oppDeck: 'A', win: Result.lose, black: Bw.black, timestamp: 'xxx', user: 'who', describe: '' },
  { myDeck: 'A', oppDeck: 'A', win: Result.lose, black: Bw.black, timestamp: 'xxx', user: 'who', describe: '' }
]

export const examplePerfomanceMatrix: Matrix = [
  [{ win: 1, lose: 1, draw: 0 }, { win: 1, lose: 0, draw: 0 }, { win: 2, lose: 0, draw: 0 }],
  [{ win: 0, lose: 1, draw: 0 }, { win: 0, lose: 0, draw: 0 }, { win: 1, lose: 0, draw: 0 }],
  [{ win: 0, lose: 2, draw: 0 }, { win: 0, lose: 1, draw: 0 }, { win: 0, lose: 0, draw: 0 }]
]

export const AppliedOnce: Matrix = [
  [{ win: 0, lose: 0, draw: 0 }, { win: 1, lose: 0, draw: 0 }, { win: 0, lose: 0, draw: 0 }],
  [{ win: 0, lose: 1, draw: 0 }, { win: 0, lose: 0, draw: 0 }, { win: 0, lose: 0, draw: 0 }],
  [{ win: 0, lose: 0, draw: 0 }, { win: 0, lose: 0, draw: 0 }, { win: 0, lose: 0, draw: 0 }]
]
