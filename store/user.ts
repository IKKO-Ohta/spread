import { Mutation, VuexModule, Module } from 'vuex-module-decorators'
import firebase from 'firebase/app'

interface UserInfo {
  uid: string
  email: string
  displayName: string | null
}

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
}
