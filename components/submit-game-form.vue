<template>
  <v-card class="form">
    <v-form>
      <v-card-text>
        <v-select v-model="game.myDeck" :items="decklist" label="あなたのデッキ" />
        <v-select v-model="game.oppDeck" :items="decklist" label="対戦相手のデッキ" />
      </v-card-text>
      <v-divider class="mx-4"></v-divider>
      <v-card-title>対戦結果</v-card-title>

      <section v-if="isBestOf3">
        <v-card-subtitle>先後</v-card-subtitle>
        <v-card-text>
          <v-chip-group class="ma-2" column>
            <v-chip :color="game1BwColor" @click="handleMatchBw('game1')">
              <v-icon left> {{ getIconBW(match.game1.bw) }} </v-icon>
              {{ match.game1.bw }}
            </v-chip>
            <v-chip :color="game2BwColor" @click="handleMatchBw('game2')">
              <v-icon left> {{ getIconBW(match.game2.bw) }} </v-icon>
              {{ match.game2.bw }}
            </v-chip>
            <v-chip v-if="isGame3" :color="game3BwColor" @click="handleMatchBw('game3')">
              <v-icon left> {{ getIconBW(match.game3.bw) }} </v-icon>
              {{ match.game3.bw }}
            </v-chip>
          </v-chip-group>
        </v-card-text>
        <v-card-subtitle>勝敗</v-card-subtitle>
        <v-card-text>
          <v-chip-group class="ma-2" column>
            <v-chip :color="game1WlColor" @click="handleMatchWin('game1')">
              <v-icon left>{{ getIconEmotion(match.game1.win) }}</v-icon>
              {{ match.game1.win }}
            </v-chip>
            <v-chip :color="game2WlColor" @click="handleMatchWin('game2')">
              <v-icon left>{{ getIconEmotion(match.game2.win) }}</v-icon>
              {{ match.game2.win }}
            </v-chip>
            <v-chip v-if="isGame3" :color="game3WlColor" @click="handleMatchWin('game3')">
              <v-icon left>{{ getIconEmotion(match.game3.win) }}</v-icon>
              {{ match.game3.win }}
            </v-chip>
          </v-chip-group>
        </v-card-text>
      </section>
      <section v-else>
        <v-card-text>
          <v-btn large :color="getIconWLColor(game.win)" depressed class="sm-button" @click="changeWinOrLose">
            <v-icon left>{{ getIconEmotion(game.win) }}</v-icon>
            {{ game.win }}
          </v-btn>
          <v-btn large :color="getIconBWColor(game.black)" depressed class="sm-button" @click="changeBlackOrWhite">
            <v-icon left> {{ getIconBW(game.black) }} </v-icon>
            {{ game.black }}
          </v-btn>
        </v-card-text>
      </section>
    </v-form>
    <v-card-actions>
      <v-btn depressed :disabled="!canSubmit" @click="emitSubmitGame">
        登録
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import { Result, Bw, BestOf } from '@/models/const/enums'
import { Game, Match, GameNumber } from '@/models/@types/game'

@Component({})
export default class SubmitGameForm extends Vue {
  @Prop({ required: true }) decklist!: string[]
  @Prop() bestOf!: BestOf
  @Emit() submit(_game: Game) {}

  game: Game = {
    win: Result.win,
    black: Bw.black,
    myDeck: null,
    oppDeck: null,
    user: '',
    timestamp: '',
    describe: '',
    id: ''
  }

  match: Match = {
    game1: {
      win: Result.win,
      bw: Bw.black
    },
    game2: {
      win: Result.lose,
      bw: Bw.white
    },
    game3: {
      win: Result.win,
      bw: Bw.black
    }
  }

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
          wins,
          blacks
        })
        this.game.oppDeck = null
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

  getIconWLColor(result: Result): string {
    return result === Result.win ? 'primary' : 'red'
  }

  getIconBWColor(bw: Bw): string {
    return bw === Bw.black ? 'black' : 'gray'
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

  get game1WlColor(): string {
    return this.getIconWLColor(this.match.game1.win)
  }

  get game2WlColor(): string {
    return this.getIconWLColor(this.match.game2.win)
  }

  get game3WlColor(): string {
    return this.match.game3 ? this.getIconWLColor(this.match.game3!.win) : ''
  }

  get game1BwColor(): string {
    return this.getIconBWColor(this.match.game1.bw)
  }

  get game2BwColor(): string {
    return this.getIconBWColor(this.match.game2.bw)
  }

  get game3BwColor(): string {
    return this.match.game3 ? this.getIconBWColor(this.match.game3!.bw) : ''
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
