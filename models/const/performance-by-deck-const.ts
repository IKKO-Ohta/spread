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
    text: 'ミラーを除く合計',
    align: 'left',
    sortable: true,
    value: 'totalWithoutMirror'
  },
  {
    text: '合計',
    value: 'total',
    sortable: false
  }
]

export const PerformanceByDeckBo1Header: Header[] = [
  {
    text: 'デッキ',
    align: 'left',
    sortable: true,
    value: 'name'
  },
  {
    text: '先手',
    value: 'winByMainBlack',
    sortable: false
  },
  {
    text: '後手',
    value: 'winByMainWhite',
    sortable: false
  },
  {
    text: 'ミラーを除く合計',
    align: 'left',
    sortable: true,
    value: 'totalWithoutMirror'
  },
  {
    text: '合計',
    value: 'total',
    sortable: false
  }
]
