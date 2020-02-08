import { Result, Bw } from '@/models/const/enums'
import { GameInfo } from '@/models/@types/game'
import { VTableRow } from '@/models/@types/matrix'

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

export const miniBo3Game: GameInfo[] = [
  { myDeck: 'A', oppDeck: 'B', win: Result.win, black: Bw.black, timestamp: 'xxx', user: 'who', describe: '', id: 'A', wins: [Result.win, Result.win], blacks: [Bw.black, Bw.white] }
]

export const initialState: VTableRow[] = [
  {
    name: 'A',
    winByMain: '0-0',
    winByMainBlack: '0-0',
    winByMainWhite: '0-0',
    winBySided: '0-0',
    winBySidedBlack: '0-0',
    winBySidedWhite: '0-0',
    totalWithoutMirror: '0-0',
    total: '0-0'
  },
  {
    name: 'B',
    winByMain: '0-0',
    winByMainBlack: '0-0',
    winByMainWhite: '0-0',
    winBySided: '0-0',
    winBySidedBlack: '0-0',
    winBySidedWhite: '0-0',
    totalWithoutMirror: '0-0',
    total: '0-0'
  }
]

export const appliedOnce: VTableRow[] = [
  {
    name: 'A',
    winByMain: '1-0',
    winByMainBlack: '1-0',
    winByMainWhite: '0-0',
    winBySided: '1-0',
    winBySidedBlack: '0-0',
    winBySidedWhite: '1-0',
    totalWithoutMirror: '1-0',
    total: '1-0'
  },
  {
    name: 'B',
    winByMain: '0-1',
    winByMainBlack: '0-0',
    winByMainWhite: '0-1',
    winBySided: '0-1',
    winBySidedBlack: '0-1',
    winBySidedWhite: '0-0',
    totalWithoutMirror: '0-1',
    total: '0-1'
  }
]
