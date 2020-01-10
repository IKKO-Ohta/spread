import { Mutation, Action, VuexModule, Module } from 'vuex-module-decorators'
import firebase from 'firebase/app'
import { SheetInfo } from '~/models/@types/sheet-info'
import { Game } from '@/models/@types/game'

@Module({ name: 'sheet', namespaced: true, stateFactory: true })
export default class Sheet extends VuexModule {
  currentSheetInfos: SheetInfo[] = []
  currentSheetName: string = ''

  @Mutation
  ADD_SHEET(sheetInfos: SheetInfo) {
    this.currentSheetInfos.push(sheetInfos)
  }

  @Mutation
  CLEAR_SHEET() {
    this.currentSheetInfos = []
  }

  @Mutation
  SET_CURRENT_SHEET_NAME(sheetName: string) {
    this.currentSheetName = sheetName
  }

  @Action({ rawError: true })
  async CURRENT_SHEET(sheetName: string): Promise<SheetInfo> {
    try {
      const db = firebase.firestore()
      const querySnapshot = await db
        .collection('sheet')
        .where('sheetName', '==', sheetName)
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
  async FETCH_SHEET() {
    try {
      this.CLEAR_SHEET()
      const db = firebase.firestore()
      const querySnapshot = await db
        .collection('sheet')
        .where('member', 'array-contains', 'samayotta@gmail.com')
        .get()
      querySnapshot.forEach((doc) => {
        const data = doc.data()
        this.ADD_SHEET({
          member: data.member,
          sheetName: data.sheetName,
          gameTitle: data.gameTitle
        })
      })
    } catch {
      throw new Error('#FETCH_SHEET ERROR')
    }
  }

  @Action({ rawError: true })
  async ADD_GAME(game: Game) {
    const db = firebase.firestore()
    await db
      .collection('sheet')
      .doc(`${this.currentSheetName}`)
      .collection('games')
      .add(game)
  }

  @Action({ rawError: true })
  async LOAD_GAMES(): Promise<Game[]> {
    try {
      const games: Game[] = []
      const db = firebase.firestore()
      const result = await db
        .collection('sheet')
        .doc(`${this.currentSheetName}`)
        .collection('games')
        .get()
      result.forEach((elem) => {
        games.push(elem.data() as Game)
      })
      return games
    } catch {
      throw new Error('#LOAD_GAMES ERROR')
    }
  }

  @Action({ rawError: true })
  async CREATE_SHEET(sheetInfo: SheetInfo) {
    try {
      const db = firebase.firestore()
      await db
        .collection('sheet')
        .doc(sheetInfo.sheetName)
        .set(sheetInfo)
    } catch {
      throw new Error('#CREATE_SHEET ERROR')
    }
  }

  @Action({ rawError: true })
  UPDATE_SHEET(sheetInfo: SheetInfo) {
    try {
      const db = firebase.firestore()
      const sheetRef = db.collection('sheet').doc(sheetInfo.sheetName)
      sheetRef.update({
        sheetInfo
      })
    } catch {
      throw new Error('#UPDATE_SHEET ERROR')
    }
  }

  public get currentSheet(): SheetInfo {
    const sheet = this.currentSheetInfos.find((sheet) => sheet.sheetName === this.currentSheetName)
    if (sheet) {
      return sheet
    } else {
      throw new Error('NOT FOUND: CURRENT SHEET')
    }
  }
}
