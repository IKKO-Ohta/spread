import { Result, Bw } from '@/models/const/enums'
import { GameInfo } from '@/models/@types/game'
import { Matrix, VTableRow } from '@/models/@types/matrix'

export const exampleGames: GameInfo[] = [
  { myDeck: 'A', oppDeck: 'B', win: Result.win, black: Bw.black, timestamp: 'xxx', user: 'who', describe: '', id: 'A' },
  { myDeck: 'B', oppDeck: 'C', win: Result.win, black: Bw.black, timestamp: 'xxx', user: 'who', describe: '', id: 'A' },
  { myDeck: 'A', oppDeck: 'C', win: Result.win, black: Bw.black, timestamp: 'xxx', user: 'who', describe: '', id: 'A' },
  { myDeck: 'C', oppDeck: 'A', win: Result.lose, black: Bw.black, timestamp: 'xxx', user: 'who', describe: '', id: 'A' },
  { myDeck: 'A', oppDeck: 'A', win: Result.lose, black: Bw.black, timestamp: 'xxx', user: 'who', describe: '', id: 'A' }
]

export const exampleBo3Games: GameInfo[] = [
  { myDeck: 'A', oppDeck: 'B', win: Result.win, black: Bw.black, timestamp: 'xxx', user: 'who', describe: '', id: 'A', wins: [Result.win, Result.win], blacks: [Bw.black, Bw.white] },
  {
    myDeck: 'B',
    oppDeck: 'C',
    win: Result.win,
    black: Bw.black,
    timestamp: 'xxx',
    user: 'who',
    describe: '',
    id: 'A',
    wins: [Result.win, Result.lose, Result.win],
    blacks: [Bw.black, Bw.white, Bw.black]
  },
  {
    myDeck: 'A',
    oppDeck: 'C',
    win: Result.win,
    black: Bw.white,
    timestamp: 'xxx',
    user: 'who',
    describe: '',
    id: 'A',
    wins: [Result.lose, Result.win, Result.win],
    blacks: [Bw.white, Bw.black, Bw.white]
  },
  { myDeck: 'C', oppDeck: 'A', win: Result.lose, black: Bw.black, timestamp: 'xxx', user: 'who', describe: '', id: 'A', wins: [Result.lose, Result.lose], blacks: [Bw.black, Bw.black] },
  {
    myDeck: 'A',
    oppDeck: 'A',
    win: Result.lose,
    black: Bw.black,
    timestamp: 'xxx',
    user: 'who',
    describe: '',
    id: 'A',
    wins: [Result.lose, Result.win, Result.lose],
    blacks: [Bw.white, Bw.black, Bw.white]
  }
]

export const examplePerfomanceMatrix: Matrix = [
  [{ win: 1, lose: 1 }, { win: 1, lose: 0 }, { win: 2, lose: 0 }],
  [{ win: 0, lose: 1 }, { win: 0, lose: 0 }, { win: 1, lose: 0 }],
  [{ win: 0, lose: 2 }, { win: 0, lose: 1 }, { win: 0, lose: 0 }]
]

export const exampleVDataset: VTableRow[] = [
  {
    name: 'A',
    A: '1-1',
    B: '1-0',
    C: '2-0',
    total: '4-1'
  },
  {
    name: 'B',
    A: '0-1',
    B: '0-0',
    C: '1-0',
    total: '1-1'
  },
  {
    name: 'C',
    A: '0-2',
    B: '0-1',
    C: '0-0',
    total: '0-3'
  }
]

export const AppliedOnce: Matrix = [
  [{ win: 0, lose: 0 }, { win: 1, lose: 0 }, { win: 0, lose: 0 }],
  [{ win: 0, lose: 1 }, { win: 0, lose: 0 }, { win: 0, lose: 0 }],
  [{ win: 0, lose: 0 }, { win: 0, lose: 0 }, { win: 0, lose: 0 }]
]

export const miniAppliedOnce: Matrix = [[{ win: 0, lose: 0 }, { win: 1, lose: 0 }], [{ win: 0, lose: 1 }, { win: 0, lose: 0 }]]

export const miniVDataset: VTableRow[] = [
  {
    name: 'A',
    A: '0-0',
    B: '1-0',
    total: '1-0'
  },
  {
    name: 'B',
    A: '0-1',
    B: '0-0',
    total: '0-1'
  }
]
