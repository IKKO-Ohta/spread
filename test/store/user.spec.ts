import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { getModule } from 'vuex-module-decorators'
import User from '@/store/user'
import { UserInfo } from '@/models/@types/user-info'

const localVue = createLocalVue()
localVue.use(Vuex)
const store = new Vuex.Store({ modules: { user: User } })
const UserStore = getModule(User, store)

describe('store/sheet.ts', () => {
  const exampleUser: UserInfo = {
    uid: 'xx',
    email: 'samayotta@gmail.com',
    displayName: 'samayotta'
  }

  describe('#SET_USER', () => {
    test('currentSheetInfo should be set ', () => {
      UserStore.SET_USER(exampleUser)
      expect(UserStore.currentUserInfo).toEqual(exampleUser)
    })
  })

  describe('#SET_LOGIN', () => {
    test('isLogin should be true ', () => {
      UserStore.SET_LOGIN()
      expect(UserStore.isLogin).toBeTruthy()
    })
  })

  describe('#CLEAR_USER', () => {
    test('currentUserInfo should be clear ', () => {
      UserStore.CLEAR_USER()
      expect(UserStore.currentUserInfo).toBeNull()
      expect(UserStore.isLogin).toBeFalsy()
    })
  })

  // TODO: Actionについてのテストコードを書く
})
