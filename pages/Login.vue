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
          <div v-show="!isLoggedIn" id="firebaseui-auth-container" />
          <v-btn v-show="isLoggedIn" text small @click="signOut">
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
import PageMixin from '@/mixins/page-mixins'
import 'firebaseui/dist/firebaseui.css'

@Component({})
export default class LoginPage extends Mixins<PageMixin>(PageMixin) {
  mounted() {
    this.stores.user.LOGIN()
    this.stores.sheet.FETCH_SHEET()
  }

  signOut() {
    this.stores.user.LOGOUT()
  }

  get isLoggedIn(): boolean {
    return this.stores.user.isLogin
  }
}
</script>
