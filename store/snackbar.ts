import { Mutation, VuexModule, Module } from 'vuex-module-decorators'

@Module({ name: 'snackbar', namespaced: true, stateFactory: true })
export default class Snackbar extends VuexModule {
  message = ''
  isError = false

  @Mutation
  SET_MESSAGE(msg: string): void {
    this.message = msg
  }

  @Mutation
  SET_ERROR_MESSAGE(msg: string): void {
    this.message = msg
    this.isError = true
  }

  @Mutation
  CLEAR(): void {
    this.message = ''
    this.isError = false
  }
}
