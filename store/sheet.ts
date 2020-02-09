import { Mutation, Action, VuexModule, Module } from 'vuex-module-decorators'
import firebase from 'firebase/app'
import { SheetInfo } from '~/models/@types/sheet-info'
import { GameInfo } from '@/models/@types/game'
import { BestOf } from '~/models/const/enums'

@Module({ name: 'sheet', namespaced: true, stateFactory: true })
export default class Sheet extends VuexModule {
  currentSheetInfos: SheetInfo[] = []
  currentSheetId: string = ''

  @Mutation
  ADD_SHEET(sheetInfos: SheetInfo) {
    this.currentSheetInfos.push(sheetInfos)
  }

  @Mutation
  CLEAR_SHEET() {
    this.currentSheetInfos = []
  }

  @Mutation
  SET_CURRENT_SHEET_ID(sheetId: string) {
    this.currentSheetId = sheetId
  }

  @Action({ rawError: true })
  async FETCH_ONLY_CURRENT_SHEET(sheetId: string): Promise<SheetInfo> {
    try {
      const db = firebase.firestore()
      const querySnapshot = await db
        .collection('sheet')
        .where('id', '==', sheetId)
        .get()
      const data: SheetInfo[] = []
      querySnapshot.docs.forEach((elem) => {
        data.push(elem.data() as SheetInfo)
      })
      return data[0]
    } catch (e) {
      throw new Error('#CURRENT_SHEET ERROR')
    }
  }

  @Action({ rawError: true })
  async FETCH_SHEET(email: string) {
    try {
      this.CLEAR_SHEET()
      const db = firebase.firestore()
      const querySnapshot = await db
        .collection('sheet')
        .where('members', 'array-contains', email)
        .get()
      querySnapshot.forEach((doc) => {
        const data = doc.data()
        this.ADD_SHEET({
          id: data.id,
          members: data.member,
          sheetName: data.sheetName,
          gameTitle: data.gameTitle,
          decks: data.decks,
          bestOf: data.bestOf
        })
      })
    } catch {
      throw new Error('#FETCH_SHEET ERROR')
    }
  }

  @Action({ rawError: true })
  async SET_GAME(game: GameInfo) {
    const db = firebase.firestore()
    await db
      .collection('sheet')
      .doc(`${this.currentSheetId}`)
      .collection('games')
      .doc(game.id)
      .set(game)
  }

  @Action({ rawError: true })
  async LOAD_GAMES(): Promise<GameInfo[]> {
    try {
      const games: GameInfo[] = []
      const db = firebase.firestore()
      const result = await db
        .collection('sheet')
        .doc(`${this.currentSheetId}`)
        .collection('games')
        .get()
      result.forEach((elem) => {
        games.push(elem.data() as GameInfo)
      })
      return games
    } catch {
      throw new Error('#LOAD_GAMES ERROR')
    }
  }

  @Action({ rawError: true })
  async SET_SHEET(sheetInfo: SheetInfo) {
    try {
      const db = firebase.firestore()
      await db
        .collection('sheet')
        .doc(sheetInfo.id)
        .set(sheetInfo)
    } catch {
      throw new Error('#SET_SHEET ERROR')
    }
  }

  public get currentSheet(): SheetInfo | null {
    const sheet = this.currentSheetInfos.find((sheet) => sheet.id === this.currentSheetId)
    return sheet || null
  }

  public get currentSheetIsBo3(): boolean {
    return this.currentSheet ? this.currentSheet.bestOf === BestOf.Bo3 : true
  }
}
