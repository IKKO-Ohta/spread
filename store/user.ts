import { Mutation, Action, VuexModule, Module } from 'vuex-module-decorators'
import firebase from 'firebase/app'
import * as firebaseui from 'firebaseui'
import { UserInfo } from '@/models/@types/user-info'

@Module({ name: 'user', namespaced: true, stateFactory: true })
export default class User extends VuexModule {
  currentUserInfo: UserInfo | null = null

  @Mutation
  SET_USER(userinfo: UserInfo) {
    this.currentUserInfo = userinfo
  }

  @Mutation
  CLEAR_USER() {
    this.currentUserInfo = null
  }

  @Action
  LOGIN() {
    firebase.auth().onAuthStateChanged((_user) => {
      const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth())
      ui.start('#firebaseui-auth-container', {
        signInSuccessUrl: '/',
        signInFlow: 'popup',
        signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
        callbacks: {
          signInSuccessWithAuthResult: (_authResult) => {
            return true
          }
        }
      })
    })
  }

  @Action
  async LOGOUT() {
    try {
      await firebase.auth().signOut()
      this.CLEAR_USER()
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
      throw new Error('Logout Failed.')
    }
  }
}
