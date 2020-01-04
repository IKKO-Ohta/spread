<template>
  <section>
    <submit-game-form :decklist="decklist" @submit="addGame" />
    <v-data-table :headers="headers" :options.sync="option" :items="games" :items-per-page="5" class="elevation-1 table" />
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { NuxtConfigurationHead } from '@nuxt/types/config/head'
import SubmitGameForm from '@/components/SubmitGameForm.vue'
import recordHeader from '@/models/const/record-header'
import archtypes from '@/models/const/archtypes'
import Game from '@/models/const/Game'

@Component({
  components: {
    SubmitGameForm
  }
})
export default class RecordPage extends Vue {
  sheetName = ''
  headers = recordHeader()
  games: Game[] = []
  decklist?: string[] = archtypes()
  option = {
    sortBy: ['timestamp'],
    sortDesc: [true]
  }

  async created() {
    this.sheetName = this.$route.params.slug
    await this.loadGames()
  }

  head(): NuxtConfigurationHead {
    return {
      title: this.sheetName
    }
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
