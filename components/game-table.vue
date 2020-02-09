<template>
  <v-data-table :headers="headers" :options.sync="option" :items="items" :items-per-page="5" class="elevation-1 table">
    <template v-slot:top>
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline"> {{ editedItem.timestamp }} </span>
          </v-card-title>
          <v-card-text>
            <v-select v-model="editedItem.myDeck" :items="decklist" label="あなたのデッキ" />
            <v-select v-model="editedItem.oppDeck" :items="decklist" label="対戦相手のデッキ" />
            <v-divider />
            <section v-if="isBestOf3(editedItem)">
              <v-card-subtitle>先後</v-card-subtitle>
              <v-chips-bws :match="editedMatch" @handle-bw="handleMatchBw" />
              <v-card-subtitle>勝敗</v-card-subtitle>
              <v-chips-wins :match="editedMatch" @handle-win="handleMatchWin" />
            </section>
            <section v-else>
              <v-btn large depressed class="sm-button" @click="changeWinOrLose">
                <v-icon left>{{ getIconEmotion(editedItem.win) }}</v-icon>
                {{ editedItem.win }}
              </v-btn>
              <v-btn large depressed class="sm-button" @click="changeBlackOrWhite">
                <v-icon left> {{ getIconBW(editedItem.black) }} </v-icon>
                {{ editedItem.black }}
              </v-btn>
            </section>
            <v-card-subtitle>記入</v-card-subtitle>
            <v-textarea v-model="editedItem.describe" outlined auto-grow rows="3" />
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeEditDialog">閉じる</v-btn>
            <v-btn color="blue darken-1" text @click="save">変更する</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>

    <template v-slot:item.win="props">
      <ul-tooltip :message="getWinColMessage(props.item)">
        <v-icon>{{ getIconEmotion(props.item.win) }}</v-icon>
      </ul-tooltip>
    </template>
    <template v-slot:item.black="props">
      <ul-tooltip :message="getBwColMessage(props.item)">
        <v-icon>{{ getIconBW(props.item.black) }} </v-icon>
      </ul-tooltip>
    </template>
    <template v-slot:item.describe="props">
      <ul-tooltip v-if="hasDescribe(props.item.describe)" :message="props.item.describe">
        <v-icon>mdi-file-document</v-icon>
      </ul-tooltip>
    </template>
    <template v-slot:item.property="props">
      <v-icon @click="openEditDialog(props.item)"> mdi-dots-vertical </v-icon>
    </template>
    <v-data-footer />
  </v-data-table>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import UlTooltip from '@/components/ul-tooltip.vue'
import VChipsWins from '@/components/v-chips-wins.vue'
import VChipsBws from '@/components/v-chips-bws.vue'
import { baseGameObj, baseMatchObj } from '@/models/const/base-game-object'
import { GameInfo, Match, GameNumber } from '@/models/@types/game'
import { Result, Bw } from '@/models/const/enums'

// TODO: リファクタリングが必要。submit-game-formとの共通メソッドが多すぎる。mixinにする。
// TODO: v-chipsの実装もひどい。アイコン表示に関する純粋関数ははすべて一つにまとめるのも視野
@Component({ components: { UlTooltip, VChipsWins, VChipsBws } })
export default class GameTable extends Vue {
  @Prop() items!: GameInfo[]
  @Prop() headers!: string[]
  @Prop({ required: true }) decklist!: string[]
  @Emit() updateGame(_game: GameInfo) {}

  text = ''
  dialog = false

  option = {
    sortBy: ['timestamp'],
    sortDesc: [true]
  }

  editedItem: GameInfo = { ...baseGameObj }
  editedMatch: Match = { ...baseMatchObj }

  openEditDialog(game: GameInfo): void {
    this.editedItem = { ...game }
    this.dialog = true
  }

  closeEditDialog(): void {
    this.dialog = false
  }

  save(): void {
    this.closeEditDialog()

    if (!this.isBestOf3(this.editedItem)) {
      this.updateGame(this.editedItem)
      return
    }

    const wins = [this.editedMatch.game1.win, this.editedMatch.game2.win]
    const blacks = [this.editedMatch.game1.bw, this.editedMatch.game2.bw]
    if (this.editedMatch.game1.win !== this.editedMatch.game2.win) {
      wins.push(this.editedMatch.game3!.win)
      blacks.push(this.editedMatch.game3!.bw)
    }

    this.updateGame({
      ...this.editedItem,
      win: this.didYouWin(wins),
      wins,
      blacks
    })
  }

  open() {
    this.text = ''
  }

  handleMatchWin(gameNumber: GameNumber) {
    switch (gameNumber) {
      case 'game1':
        this.editedMatch.game1.win = this.editedMatch.game1.win === Result.win ? Result.lose : Result.win
        break
      case 'game2':
        this.editedMatch.game2.win = this.editedMatch.game2.win === Result.win ? Result.lose : Result.win
        break
      case 'game3':
        if (this.editedMatch.game3) {
          this.editedMatch.game3.win = this.editedMatch.game3.win === Result.win ? Result.lose : Result.win
        }
        break
      default:
        break
    }
  }

  handleMatchBw(gameNumber: GameNumber) {
    switch (gameNumber) {
      case 'game1':
        this.editedMatch.game1.bw = this.editedMatch.game1.bw === Bw.black ? Bw.white : Bw.black
        break
      case 'game2':
        this.editedMatch.game2.bw = this.editedMatch.game2.bw === Bw.black ? Bw.white : Bw.black
        break
      case 'game3':
        if (this.editedMatch.game3) {
          this.editedMatch.game3.bw = this.editedMatch.game3.bw === Bw.black ? Bw.white : Bw.black
        }
        break
      default:
        break
    }
  }

  hasDescribe(describe: string): boolean {
    return describe !== ''
  }

  getWinColMessage(game: GameInfo): string {
    if (game.wins) {
      return game.wins.toString()
    } else {
      return game.win
    }
  }

  getBwColMessage(game: GameInfo): string {
    if (game.blacks) {
      return game.blacks.toString()
    } else {
      return game.black
    }
  }

  changeBlackOrWhite() {
    this.editedItem.black = this.editedItem.black === Bw.black ? Bw.white : Bw.black
  }

  changeWinOrLose() {
    this.editedItem.win = this.editedItem.win === Result.win ? Result.lose : Result.win
  }

  getIconEmotion(result: Result): string {
    return result === Result.win ? 'mdi-emoticon-cool' : 'mdi-emoticon-cry'
  }

  getIconBW(bw: Bw): string {
    return bw === Bw.black ? 'mdi-triangle' : 'mdi-triangle-outline'
  }

  isBestOf3(game: GameInfo): boolean {
    return game.wins !== undefined
  }

  private didYouWin(wins: Result[]): Result {
    let i = 0
    for (const res of wins) {
      if (res === Result.win) {
        i = i + 1
      }
    }
    return i >= 2 ? Result.win : Result.lose
  }
}
</script>
