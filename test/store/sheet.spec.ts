import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { getModule } from 'vuex-module-decorators'
import Sheet from '@/store/sheet'
import { SheetInfo } from '@/models/@types/sheet-info'
import { GameTitle, BestOf } from '@/models/const/enums'
import { DeckHelper } from '@/lib/deck-helper'

const localVue = createLocalVue()
localVue.use(Vuex)
const store = new Vuex.Store({ modules: { sheet: Sheet } })
const sheetStore = getModule(Sheet, store)

describe('store/sheet.ts', () => {
  const exampleSheet: SheetInfo = {
    id: '12345678',
    members: ['samayotta@gmail.com'],
    sheetName: 'example-sheet',
    gameTitle: GameTitle.mtg,
    decks: DeckHelper.getDefaultDecks(GameTitle.mtg),
    bestOf: BestOf.Bo3
  }

  describe('#ADD_SHEET', () => {
    test('currentSheetInfo should be set ', () => {
      sheetStore.ADD_SHEET(exampleSheet)
      expect(sheetStore.currentSheetInfos[0].gameTitle).toBe(GameTitle.mtg)
    })
  })

  describe('#CLEAR_SHEET', () => {
    test('currentSheetInfo should be clear ', () => {
      sheetStore.CLEAR_SHEET()
      expect(sheetStore.currentSheetInfos.length).toBe(0)
    })
  })

  // TODO: Actionについてのテストコードを書く
})
