<template>
  <v-card class="form">
    <v-form>
      <v-card-text>
        <v-select v-model="game.myDeck" :items="decklist" label="あなたのデッキ" />
        <v-select v-model="game.oppDeck" :items="decklist" label="対戦相手のデッキ" />
      </v-card-text>
      <v-divider class="mx-4"></v-divider>
      <section v-if="isBestOf3">
        <v-card-subtitle>先後</v-card-subtitle>
        <v-card-text>
          <v-chips-bws :match="match" @handle-bw="handleMatchBw" />
        </v-card-text>
        <v-card-subtitle>勝敗</v-card-subtitle>
        <v-card-text>
          <v-chips-wins :match="match" @handle-win="handleMatchWin" />
        </v-card-text>
      </section>
      <section v-else>
        <v-card-text>
          <v-btn large depressed class="sm-button" @click="changeWinOrLose">
            <v-icon left>{{ getIconEmotion(game.win) }}</v-icon>
            {{ game.win }}
          </v-btn>
          <v-btn large depressed class="sm-button" @click="changeBlackOrWhite">
            <v-icon left> {{ getIconBW(game.black) }} </v-icon>
            {{ game.black }}
          </v-btn>
        </v-card-text>
      </section>
      <section>
        <v-card-subtitle> 記入 </v-card-subtitle>
        <v-card-text>
          <v-textarea v-model="game.describe" auto-grow rows="3" outlined :placeholder="placeholderText"></v-textarea>
        </v-card-text>
      </section>
    </v-form>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn depressed :disabled="!canSubmit" @click="emitSubmitGame">
        登録
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import VChipsWins from '@/components/v-chips-wins.vue'
import VChipsBws from '@/components/v-chips-bws.vue'
import { Result, Bw, BestOf } from '@/models/const/enums'
import { GameInfo, Match, GameNumber } from '@/models/@types/game'
import { baseGameObj, baseMatchObj } from '@/models/const/base-game-object'

@Component({ components: { VChipsWins, VChipsBws } })
export default class SubmitGameForm extends Vue {
  @Prop({ required: true }) decklist!: string[]
  @Prop() bestOf!: BestOf
  @Emit() submit(_game: GameInfo) {}

  game: GameInfo = { ...baseGameObj }
  match: Match = { ...baseMatchObj }

  emitSubmitGame() {
    if (this.canSubmit) {
      if (!this.isBestOf3) {
        this.submit(this.game)
        this.game.oppDeck = null
      } else {
        const wins = [this.match.game1.win, this.match.game2.win]
        const blacks = [this.match.game1.bw, this.match.game2.bw]
        if (this.match.game1.win !== this.match.game2.win) {
          wins.push(this.match.game3!.win)
          blacks.push(this.match.game3!.bw)
        }
        this.submit({
          ...this.game,
          win: this.didYouWin(wins),
          black: blacks[0],
          wins,
          blacks
        })
        this.game = {
          myDeck: this.game.myDeck,
          ...baseGameObj
        }
        this.match = {
          ...baseMatchObj
        }
      }
    }
  }

  changeBlackOrWhite() {
    this.game.black = this.game.black === Bw.black ? Bw.white : Bw.black
  }

  changeWinOrLose() {
    this.game.win = this.game.win === Result.win ? Result.lose : Result.win
  }

  handleMatchWin(gameNumber: GameNumber) {
    switch (gameNumber) {
      case 'game1':
        this.match.game1.win = this.match.game1.win === Result.win ? Result.lose : Result.win
        break
      case 'game2':
        this.match.game2.win = this.match.game2.win === Result.win ? Result.lose : Result.win
        break
      case 'game3':
        if (this.match.game3) {
          this.match.game3.win = this.match.game3.win === Result.win ? Result.lose : Result.win
        }
        break
      default:
        break
    }
  }

  handleMatchBw(gameNumber: GameNumber) {
    switch (gameNumber) {
      case 'game1':
        this.match.game1.bw = this.match.game1.bw === Bw.black ? Bw.white : Bw.black
        break
      case 'game2':
        this.match.game2.bw = this.match.game2.bw === Bw.black ? Bw.white : Bw.black
        break
      case 'game3':
        if (this.match.game3) {
          this.match.game3.bw = this.match.game3.bw === Bw.black ? Bw.white : Bw.black
        }
        break
      default:
        break
    }
  }

  getIconEmotion(result: Result): string {
    return result === Result.win ? 'mdi-emoticon-cool' : 'mdi-emoticon-cry'
  }

  getIconBW(bw: Bw): string {
    return bw === Bw.black ? 'mdi-triangle' : 'mdi-triangle-outline'
  }

  get isBestOf3(): boolean {
    return this.bestOf === BestOf.Bo3
  }

  get isGame3(): boolean {
    return this.match.game1.win !== this.match.game2.win
  }

  get canSubmit() {
    return this.game.myDeck !== null && this.game.oppDeck !== null
  }

  get placeholderText(): string {
    return 'ex. サイド ボーディング、勝因、洞察...'
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

<style lang="scss">
.sm-button {
  margin: 1rem;
}
</style>
