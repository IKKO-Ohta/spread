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

  async created() {
    this.sheetName = this.$route.params.slug
    await this.loadGames()
    this.sheet = await this.stores.sheet.CURRENT_SHEET(this.sheetName)
  }

  head(): NuxtConfigurationHead {
    return {
      title: this.sheetName
    }
  }

  sendMail(mail: string): void {
    if (this.sheet === null) {
      return
    }
    const newMemberList = [...this.sheet.member, mail]
    this.stores.sheet.UPDATE_SHEET({
      ...this.sheet,
      member: newMemberList
    })
  }

  addGame(game: Game) {
    this.games.push(game)
  }

  async loadGames() {
    try {
      const result = await this.$firestore
        .collection('sheet')
        .doc(`${this.$route.params.slug}`)
        .collection('games')
        .get()
      result.forEach((elem) => {
        this.games.push(elem.data() as Game)
      })
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('oops', e)
    }
  }
}
</script>

<style lang="scss">
.form {
  margin-bottom: 10px;
}
</style>
