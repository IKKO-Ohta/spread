import { Mutation, Action, VuexModule, Module } from 'vuex-module-decorators'
import firebase from 'firebase/app'
import 'firebaseui/dist/firebaseui.css'

interface SheetInfo {
  member: string[]
  sheetName: string
  gameTitle: string
}

@Module({ name: 'sheet', namespaced: true, stateFactory: true })
export default class Sheet extends VuexModule {
  currentSheetInfos: SheetInfo[] = []

  @Mutation
  ADD_SHEET(sheetInfos: SheetInfo) {
    this.currentSheetInfos.push(sheetInfos)
  }

  @Mutation
  CLEAR_SHEET() {
    this.currentSheetInfos = []
  }

  @Action
  async FETCH_SHEET() {
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
  }
}
