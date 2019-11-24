<template>
  <div>
    <submit-game-form :decklist="decklist" @submit="addGame" />
    <v-data-table :headers="headers" :items="games" :items-per-page="5" class="elevation-1 table"></v-data-table>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import SubmitGameForm from '@/components/SubmitGameForm.vue'
import recordHeader from '@/models/const/record-header'
import archtypes from '@/models/const/archtypes'
import { Result, Bw } from '@/models/const/Enums'
import Game from '@/models/const/Game'

@Component({
  components: {
    SubmitGameForm
  },
  head: {
    title: '対戦記録'
  }
})
export default class RecordPage extends Vue {
  headers = recordHeader()
  games: Game[] = []
  decklist?: string[] = archtypes()

  async created() {
    await this.loadGames()
  }

  addGame(game: Game) {
    this.games.push(game)
  }

  async loadGames() {
    try {
      const result = await this.$firestore
        .collection(`${this.$route.params.slug}`)
        .get()

      result.forEach((elem) => {
        this.games.push(elem.data() as Game)
      })
    } catch (e) {
      console.log('oops', e)
    }
  }
}
</script>

<style lang="scss">
.form {
  margin-bottom: 10px;
}
</style>