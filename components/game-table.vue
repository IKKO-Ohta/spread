<template>
  <v-data-table :headers="headers" :options.sync="option" :items="items" :items-per-page="5" class="elevation-1 table">
    <template v-slot:item.describe="props">
      <v-edit-dialog :return-value.sync="props.item.describe" large persistent @save="save(props.item)" @open="open" @close="close">
        <div>{{ props.item.describe }}</div>
        <template v-slot:input>
          <div class="mt-4 title">Update describe</div>
        </template>
        <template v-slot:input>
          <v-text-field v-model="props.item.describe" label="ex. サイドは..." autofocus></v-text-field>
        </template>
      </v-edit-dialog>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import { Game } from '@/models/@types/game'

@Component
export default class GameTable extends Vue {
  @Prop() items!: Game[]
  @Prop() headers!: string[]
  @Emit() updateGame(_game: Game) {}
  text = ''

  option = {
    sortBy: ['timestamp'],
    sortDesc: [true]
  }

  save(game: Game) {
    this.updateGame(game)
  }

  open() {
    this.text = ''
  }

  close() {
    this.text = ''
  }
}
</script>
