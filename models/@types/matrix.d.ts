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
