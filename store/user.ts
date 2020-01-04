import { Mutation, Action, VuexModule, Module } from 'vuex-module-decorators'
import firebase from 'firebase/app'
import * as firebaseui from 'firebaseui'
import { UserInfo } from '@/models/@types/user-info'

@Module({ name: 'user', namespaced: true, stateFactory: true })
export default class User extends VuexModule {
  currentUserInfo: UserInfo | null = null
  isLogin: boolean = false

  @Mutation
  SET_USER(userinfo: UserInfo) {
    this.currentUserInfo = userinfo
  }

  @Mutation
  CLEAR_USER() {
    this.isLogin = false
    this.currentUserInfo = null
  }

  @Mutation
  SET_LOGIN() {
    this.isLogin = true
  }

  @Action
  LOGIN() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.SET_LOGIN()
      } else {
        const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth())
        ui.start('#firebaseui-auth-container', {
          signInSuccessUrl: '/login',
          signInFlow: 'popup',
          signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
          callbacks: {
            signInSuccessWithAuthResult: (_authResult) => {
              this.SET_LOGIN()
              return true
            }
          }
        })
      }
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
