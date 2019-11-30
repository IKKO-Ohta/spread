<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-card-title class="headline">
          Welcome to the Vuetify + Nuxt.js template
        </v-card-title>
        <v-card-text>spread helps to record your battles.</v-card-text>
        <v-card-actions>
          <v-spacer />
          <div v-show="!isLogin" id="firebaseui-auth-container" />
          <v-btn v-show="isLogin" text small @click="signOut">
            signOut
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { Mixins } from 'vue-mixin-decorator'
import firebase, { User } from 'firebase/app'
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import PageMixin from '@/mixins/page-mixins'

@Component({})
export default class LoginPage extends Mixins<PageMixin>(PageMixin) {
  user: User | null = null
  isLogin = false

  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.isLogin = true
      } else {
        const ui =
          firebaseui.auth.AuthUI.getInstance() ||
          new firebaseui.auth.AuthUI(firebase.auth())
        ui.start('#firebaseui-auth-container', {
          signInSuccessUrl: '/login',
          signInFlow: 'popup',
          signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
          callbacks: {
            signInSuccessWithAuthResult: (_authResult) => {
              return true
            }
          }
        })
      }
    })
  }

  success() {
    if (this.stores.user.currentUserInfo === null) {
      // this.stores.user.SET_USER(firebase.auth().currentUser!)
    }
    return true
  }

  async signOut() {
    try {
      await firebase.auth().signOut()
      this.stores.user.CLEAR_USER()
    } catch (e) {
      // TODO: error handling
    }
  }
}
</script>
