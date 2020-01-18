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
import SheetPageMixin from '@/mixins/sheet-page-mixins'
import SubmitGameForm from '@/components/submit-game-form.vue'
import SheetToolbar from '@/components/sheet-toolbar.vue'
import { Game } from '@/models/@types/game'
import { TimeUtil } from '@/lib/time-util'
import { BestOf } from '@/models/const/enums'

@Component({
  components: {
    SubmitGameForm,
    SheetToolbar
  }
})
export default class RecordPage extends Mixins<SheetPageMixin>(SheetPageMixin) {
  option = {
    sortBy: ['timestamp'],
    sortDesc: [true]
  }

  async addGame(game: Game) {
    await this.stores.sheet.ADD_GAME({
      ...game,
      timestamp: TimeUtil.getNow(),
      user: this.stores.user.currentUserInfo!.displayName!
    })
    this.stores.snackbar.SET_MESSAGE('対戦を記録しました。')
    await this.load()
  }

  get decklist(): string[] {
    if (this.sheet) {
      return this.sheet.decks
    } else {
      return []
    }
  }

  get bestOf(): BestOf {
    if (this.sheet) {
      return this.sheet.bestOf
    } else {
      return BestOf.Bo1
    }
  }
}
</script>

<style lang="scss">
.form {
  margin-bottom: 1rem;
}
</style>
