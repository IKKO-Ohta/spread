<template>
  <section>
    <sheet-toolbar :sheet="sheet" @send-mail="sendMail" @submit-deck="submitDeck" />
    <submit-game-form :decklist="decklist" @submit="addGame" />
    <v-data-table :headers="headers" :options.sync="option" :items="games" :items-per-page="5" class="elevation-1 table" />
  </section>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import { Mixins } from 'vue-mixin-decorator'
import { FirestoreHelper } from '@/lib/firestore-helper'
import PageMixin from '@/mixins/page-mixins'
import SubmitGameForm from '@/components/submit-game-form.vue'
import SheetToolbar from '@/components/sheet-toolbar.vue'
import recordHeader from '@/models/const/record-header'
import { Game } from '@/models/@types/game'
import { SheetInfo } from '@/models/@types/sheet-info'
import { TimeUtil } from '@/lib/time-util'

@Component({
  components: {
    SubmitGameForm,
    SheetToolbar
  }
})
export default class RecordPage extends Mixins<PageMixin>(PageMixin) {
  sheetId = ''
  sheet: SheetInfo | null = null
  headers = recordHeader()
  games: Game[] = []
  tabs = 0

  option = {
    sortBy: ['timestamp'],
    sortDesc: [true]
  }

  created() {
    this.load()
  }

  async load() {
    this.sheetId = this.$route.params.slug
    this.stores.sheet.SET_CURRENT_SHEET_ID(this.sheetId)
    this.sheet = await this.stores.sheet.FETCH_ONLY_CURRENT_SHEET(this.sheetId)
    this.games = await this.stores.sheet.LOAD_GAMES()
  }

  async sendMail(mail: string): Promise<void> {
    const newMemberList = [...this.sheet!.members, mail]
    await this.stores.sheet.UPDATE_SHEET({
      ...this.sheet!,
      members: newMemberList
    })
    await FirestoreHelper.sendMail(mail, window.location.href)
    await this.load()
  }

  async submitDeck(deck: string): Promise<void> {
    const newDeckList = [...this.sheet!.decks, deck]
    await this.stores.sheet.UPDATE_SHEET({
      ...this.sheet!,
      decks: newDeckList
    })
    await this.load()
  }

  async addGame(game: Game) {
    await this.stores.sheet.ADD_GAME({
      ...game,
      timestamp: TimeUtil.getNow(),
      user: this.stores.user.currentUserInfo!.displayName!
    })
    await this.load()
  }

  get decklist(): string[] {
    if (this.sheet) {
      return this.sheet.decks
    } else {
      return []
    }
  }
}
</script>

<style lang="scss">
.form {
  margin-bottom: 1rem;
}
</style>
