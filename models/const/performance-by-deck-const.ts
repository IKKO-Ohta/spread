import { Header } from '@/models/@types/matrix'

export const PerformanceByDeckHeader: Header[] = [
  {
    text: 'デッキ',
    align: 'left',
    sortable: true,
    value: 'name'
  },
  {
    text: 'メイン戦成績',
    value: 'winByMain',
    sortable: false
  },
  {
    text: 'メイン戦-先手',
    value: 'winByMainBlack',
    sortable: false
  },
  {
    text: 'メイン戦-後手',
    value: 'winByMainWhite',
    sortable: false
  },
  {
    text: 'サイド戦成績',
    value: 'winBySided',
    sortable: false
  },
  {
    text: 'サイド戦-先手',
    value: 'winBySidedBlack',
    sortable: false
  },
  {
    text: 'サイド戦-後手',
    value: 'winBySidedWhite',
    sortable: false
  },
  {
    text: '合計',
    align: 'left',
    sortable: true,
    value: 'total'
  },
  {
    text: 'ミラー回数',
    value: 'mirror',
    sortable: false
  }
]
