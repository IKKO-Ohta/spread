<template>
  <section>
    <sheet-toolbar :sheet="sheet" :sheet-name="sheetName" @send-mail="sendMail" />
    <submit-game-form :decklist="decklist" @submit="addGame" />
    <v-data-table :headers="headers" :options.sync="option" :items="games" :items-per-page="5" class="elevation-1 table" />
  </section>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import { Mixins } from 'vue-mixin-decorator'
import { NuxtConfigurationHead } from '@nuxt/types/config/head'
import PageMixin from '@/mixins/page-mixins'
import SubmitGameForm from '@/components/submit-game-form.vue'
import SheetToolbar from '@/components/sheet-toolbar.vue'
import recordHeader from '@/models/const/record-header'
import archtypes from '@/models/const/archtypes'
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
  sheetName = ''
  sheet: SheetInfo | null = null
  headers = recordHeader()
  games: Game[] = []
  decklist?: string[] = archtypes()
  tabs = 0

  option = {
    sortBy: ['timestamp'],
    sortDesc: [true]
  }

  head(): NuxtConfigurationHead {
    return {
      title: this.sheetName
    }
  }

  created() {
    this.load()
  }

  async load() {
    this.sheetName = this.$route.params.slug
    this.stores.sheet.SET_CURRENT_SHEET_NAME(this.sheetName)
    this.sheet = this.stores.sheet.currentSheet
    this.games = await this.stores.sheet.LOAD_GAMES()
  }

  async sendMail(mail: string): Promise<void> {
    const newMemberList = [...this.sheet!.member, mail]
    await this.stores.sheet.UPDATE_SHEET({
      ...this.sheet!,
      member: newMemberList
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
}
</script>

<style lang="scss">
.form {
  margin-bottom: 10px;
}
</style>
