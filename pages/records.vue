<template>
  <div>
    <submitGameForm :decklist="decklist" @submit="addGame" />
    <v-data-table :headers="headers" :items="games" :items-per-page="5" class="elevation-1 table"></v-data-table>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import submitGameForm from '@/components/submit-game-form.vue'
import recordHeader from '@/models/const/record-header'
import spams from '@/models/const/spams'
import archtypes from '@/models/const/archtypes'
import { Result, Bw } from '@/models/const/Enums'
import Game from '@/models/const/Game'

@Component({
  components: {
    submitGameForm
  },
  head: {
    title: '対戦記録'
  }
})
export default class RecordPage extends Vue {
  headers = recordHeader()
  games?: Game[] = spams()
  decklist?: string[] = archtypes()

  addGame(game: Game) {
    this.games!.push(game)
  }
}
</script>

<style lang="scss">
.form {
  margin-bottom: 10px;
}
</style>