<template>
  <section>
    <sheet-toolbar :sheet="sheet" @send-mail="sendMail" @submit-deck="submitDeck" />
    <submit-game-form :decks="decks" :best-of="bestOf" @submit="addGame" />
    <game-table :headers="headers" :items="games" :decks="decks" @update-game="update" />
  </section>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import { Mixins } from 'vue-mixin-decorator'
import { FirestoreHelper } from '@/lib/firestore-helper'
import SheetPageMixin from '@/mixins/sheet-page-mixins'
import SubmitGameForm from '@/components/submit-game-form.vue'
import GameTable from '@/components/game-table.vue'
import SheetToolbar from '@/components/sheet-toolbar.vue'
import { GameInfo } from '@/models/@types/game'
import { TimeUtil } from '@/lib/time-util'
import { BestOf } from '@/models/const/enums'

@Component({
  components: {
    SubmitGameForm,
    SheetToolbar,
    GameTable
  }
})
export default class RecordPage extends Mixins<SheetPageMixin>(SheetPageMixin) {
  option = {
    sortBy: ['timestamp'],
    sortDesc: [true]
  }

  async addGame(game: GameInfo) {
    await this.stores.sheet.SET_GAME({
      ...game,
      timestamp: TimeUtil.getNow(),
      user: this.stores.user.currentUserInfo!.displayName!,
      id: FirestoreHelper.generateId()
    })
    this.stores.snackbar.SET_MESSAGE('対戦を記録しました。')
    await this.load()
  }

  async update(game: GameInfo) {
    await this.stores.sheet.SET_GAME(game)
    this.stores.snackbar.SET_MESSAGE('記録を変更しました。')
    await this.load()
  }

  get decks(): string[] {
    return this.sheet ? this.sheet.decks : []
  }

  get bestOf(): BestOf {
    return this.sheet ? this.sheet.bestOf : BestOf.Bo1
  }
}
</script>

<style lang="scss">
.form {
  margin-bottom: 1rem;
}
</style>
