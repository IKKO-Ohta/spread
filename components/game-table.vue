<template>
  <v-data-table :headers="headers" :options.sync="option" :items="items" :items-per-page="5" class="elevation-1 table">
    <template v-slot:item.win="props">
      <ul-tooltip :message="getWinColMessage(props.item)">
        <v-icon dark>{{ getIconEmotion(props.item.win) }}</v-icon>
      </ul-tooltip>
    </template>
    <template v-slot:item.black="props">
      <ul-tooltip :message="getBwColMessage(props.item)">
        <v-icon>{{ getIconBW(props.item.black) }} </v-icon>
      </ul-tooltip>
    </template>
    <template v-slot:item.describe="props">
      <ul-tooltip v-if="hasDescribe(props.item.describe)" :message="props.item.describe">
        <v-icon dark>mdi-file-document</v-icon>
      </ul-tooltip>
      <!-- TODO: edit用カラムを作り、ダイアログも用意する
        https://vuetifyjs.com/en/components/data-tables#crud-actions
       -->
      <!-- <v-dialog :return-value.sync="props.item.describe" large persistent @save="save(props.item)" @open="open">
        <template v-slot:input>
          <div class="mt-4 title">Update describe</div>
        </template>
        <template v-slot:input>
          <v-text-field v-model="props.item.describe" label="ex. サイドは..." autofocus></v-text-field>
        </template>
      </v-dialog> -->
    </template>
    <v-data-footer />
  </v-data-table>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import { Result, Bw } from '@/models/const/enums'
import UlTooltip from '@/components/ul-tooltip.vue'
import { Game } from '@/models/@types/game'

@Component({ components: { UlTooltip } })
export default class GameTable extends Vue {
  @Prop() items!: Game[]
  @Prop() headers!: string[]
  @Emit() updateGame(_game: Game) {}
  text = ''
  editDialog = false

  option = {
    sortBy: ['timestamp'],
    sortDesc: [true]
  }

  handleEditDialog(): void {
    this.editDialog = !this.editDialog
  }

  save(game: Game) {
    this.updateGame(game)
  }

  open() {
    this.text = ''
  }

  hasDescribe(describe: string): boolean {
    return describe !== ''
  }

  getWinColMessage(game: Game): string {
    if (game.wins) {
      return game.wins.toString()
    } else {
      return game.win
    }
  }

  getBwColMessage(game: Game): string {
    if (game.blacks) {
      return game.blacks.toString()
    } else {
      return game.black
    }
  }

  getIconEmotion(result: Result): string {
    return result === Result.win ? 'mdi-emoticon-cool' : 'mdi-emoticon-cry'
  }

  getIconBW(bw: Bw): string {
    return bw === Bw.black ? 'mdi-triangle' : 'mdi-triangle-outline'
  }
}
</script>
