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
  mtg = 'Magic: the Gathering',
  pcg = 'Pokemon Card Game',
  ocg = 'Yu-Gi-Oh! Official Card Game',
  ws = 'Weiss Schwaltz',
  hs = 'Harth Stone',
  sv = 'Shadowverse',
  otherBo1 = 'Other BO1',
  otherBo3 = 'Other BO3'
}

export const AllGameTitles = [GameTitle.mtg, GameTitle.pcg, GameTitle.ocg, GameTitle.ws, GameTitle.hs, GameTitle.sv, GameTitle.otherBo1, GameTitle.otherBo3]
