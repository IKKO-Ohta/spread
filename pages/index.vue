<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-card-title> {{ hello }}</v-card-title>
        <v-spacer />
        <v-card-text v-if="isLoggedIn" class="body-2"> 左上の <v-icon>mdi-menu</v-icon>から、対戦成績をつけ始められます。</v-card-text>
        <v-card-text v-else class="body-2"> Googleアカウントで利用できます。</v-card-text>

        <v-card-subtitle class="headline"> 使い方 </v-card-subtitle>
        <v-card-text>
          <iframe
            width="560"
            height="315"
            style="max-width:100%"
            src="https://www.youtube.com/embed/NJjMChN4rKc"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </v-card-text>
        <v-card-subtitle class="headline">
          詳しい説明
        </v-card-subtitle>
        <v-card-text>
          <a href="https://note.com/samayotta/n/n21f3a59c8b4f" target="_blank" rel="noopener">対戦管理・分析アプリケーション spreadを作りました | Note</a>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <div v-show="!isLoggedIn" id="firebaseui-auth-container" />
          <v-btn v-show="isLoggedIn" @click="signOut">
            ログアウト
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
import 'firebaseui-ja/dist/firebaseui.css'

@Component({})
export default class IndexPage extends Mixins<PageMixin>(PageMixin) {
  mounted() {
    this.stores.user.LOGIN()
  }

  signOut() {
    this.stores.user.LOGOUT()
  }

  get isLoggedIn(): boolean {
    return this.stores.user.currentUserInfo !== null
  }

  get hello(): string {
    if (this.stores.user.currentUserInfo !== null) {
      return `こんにちは ${this.stores.user.currentUserInfo.displayName} !`
    } else {
      return `Spreadへようこそ！`
    }
  }
}
</script>
