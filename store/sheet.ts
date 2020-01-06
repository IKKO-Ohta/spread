import { Mutation, Action, VuexModule, Module } from 'vuex-module-decorators'
import firebase from 'firebase/app'
import { SheetInfo } from '~/models/@types/sheet-info'

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

  @Action({ rawError: true })
  async CURRENT_SHEET(sheetName: string): Promise<SheetInfo> {
    const db = firebase.firestore()
    const querySnapshot = await db
      .collection('sheet')
      .where('sheetName', '==', sheetName)
      .get()
    const data: SheetInfo[] = []
    console.log('here?')
    querySnapshot.docs.forEach((elem) => {
      data.push(elem.data() as SheetInfo)
    })
    return data[0]
  }

  @Action({ rawError: true })
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

  @Action({ rawError: true })
  async CREATE_SHEET(sheetInfo: SheetInfo) {
    const db = firebase.firestore()
    await db
      .collection('sheet')
      .doc(sheetInfo.sheetName)
      .set(sheetInfo)
  }
}
