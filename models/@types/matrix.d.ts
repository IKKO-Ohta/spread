export interface MatrixElem {
  win: number
  lose: number
  draw: number
}

export type Matrix = MatrixElem[][]

export interface Header {
  text: string
  value: string
  align?: string
  sortable: false
}

export interface VTableRow {
  name: string
  total: string
  [key: string]: string
}

export enum ShowDraw {
  show = 1,
  hidden = 2
}
