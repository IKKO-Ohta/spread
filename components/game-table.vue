<template>
  <v-data-table :headers="headers" :options.sync="option" :items="items" :items-per-page="5" class="elevation-1 table">
    <template v-slot:top>
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline"> ゲームタイトル </span>
          </v-card-title>
          <v-card-text>
            <v-select v-model="editedItem.myDeck" :items="decklist" label="あなたのデッキ" />
            <v-select v-model="editedItem.oppDeck" :items="decklist" label="対戦相手のデッキ" />
            <v-divider />

            <v-subheader> 勝敗 </v-subheader>
            <span> {{ editedItem.win }} </span>
            <v-subheader> 詳細 </v-subheader>
            <span> {{ editedItem.wins }} </span> <br />
            <span> {{ editedItem.timestamp }} </span>
            <v-subheader> 記入 </v-subheader>
            <span> {{ editedItem.describe }} </span>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text>Cancel</v-btn>
            <v-btn color="blue darken-1" text>Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>

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
    </template>
    <template v-slot:item.property="props">
      <ul-tooltip message="詳細を見る">
        <v-icon dark @click="openEditDialog(props.item)"> mdi-dots-vertical </v-icon>
      </ul-tooltip>
    </template>
    <v-data-footer />
  </v-data-table>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import { Result, Bw } from '@/models/const/enums'
import UlTooltip from '@/components/ul-tooltip.vue'
import { baseGameObj } from '@/models/const/base-game-object'
import { Game } from '@/models/@types/game'

@Component({ components: { UlTooltip } })
export default class GameTable extends Vue {
  @Prop() items!: Game[]
  @Prop() headers!: string[]
  @Prop({ required: true }) decklist!: string[]
  @Emit() updateGame(_game: Game) {}

  text = ''
  dialog = false

  option = {
    sortBy: ['timestamp'],
    sortDesc: [true]
  }

  editedItem: Game = { ...baseGameObj }

  openEditDialog(game: Game): void {
    this.editedItem = { ...game }
    this.dialog = true
  }

  closeEditDialog(): void {
    this.dialog = false
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
