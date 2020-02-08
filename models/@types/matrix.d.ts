export interface MatrixElem {
  win: number
  lose: number
}

export type Matrix = MatrixElem[][]

export interface Header {
  text: string
  value: string
  class?: string
  align?: string
  divider?: boolean
  sortable?: boolean
}

export interface VTableRow {
  name: string
  totalWithoutMirror: string
  total: string
  [key: string]: string
}

export enum ShowDraw {
  show = 1,
  hidden = 2
}
