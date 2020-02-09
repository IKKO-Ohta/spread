export enum Result {
  win = '勝利',
  lose = '敗北'
}

export enum Bw {
  black = '先手',
  white = '後手'
}

export enum BestOf {
  Bo3 = 'BO3',
  Bo1 = 'BO1'
}

export enum GameTitle {
  ocg = '遊戯王 OCG',
  dm = 'デュエル・マスターズ',
  mtg = 'マジック・ザ・ギャザリング',
  pcg = 'ポケモンカードゲーム',
  ws = 'ヴァイスシュヴァルツ',
  vg = 'カードファイト!! ヴァンガード',
  bs = 'Battle Spirits',
  bf = 'フューチャーカード バディファイト',
  zx = 'Z/X',
  wx = 'WIXOSS -ウィクロス-',
  otherBo1 = 'BO1ゲーム',
  otherBo3 = 'BO3ゲーム'
}

export const AllGameTitles = [
  GameTitle.ocg,
  GameTitle.dm,
  GameTitle.mtg,
  GameTitle.pcg,
  GameTitle.ws,
  GameTitle.vg,
  GameTitle.bf,
  GameTitle.bs,
  GameTitle.zx,
  GameTitle.wx,
  GameTitle.otherBo1,
  GameTitle.otherBo3
]
