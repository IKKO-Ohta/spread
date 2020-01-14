<template>
  <v-card class="form">
    <v-form>
      <v-card-text>
        <v-select v-model="game.myDeck" :items="decklist" label="あなたのデッキ" />
        <v-select v-model="game.oppDeck" :items="decklist" label="対戦相手のデッキ" />
      </v-card-text>
      <v-card-text>
        <v-btn large :color="iconWLColor" depressed class="sm-button" @click="changeWinOrLose">
          <v-icon left>{{ iconEmotion }}</v-icon>
          {{ game.win }}
        </v-btn>
        <v-btn large :color="iconBWColor" depressed class="sm-button" @click="changeBlackOrWhite">
          <v-icon left> {{ iconBW }} </v-icon>
          {{ game.black }}
        </v-btn>
      </v-card-text>
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
import { Result, Bw } from '@/models/const/enums'
import { Game } from '@/models/@types/game'

@Component({})
export default class SubmitGameForm extends Vue {
  @Prop({ required: true }) decklist!: string[]
  @Emit() submit(_game: Game) {}

  game: Game = {
    win: Result.win,
    black: Bw.black,
    myDeck: null,
    oppDeck: null,
    user: '',
    timestamp: '',
    describe: ''
  }

  emitSubmitGame() {
    if (this.canSubmit) {
      this.submit(this.game)
      this.game.oppDeck = null
    }
  }

  changeBlackOrWhite() {
    this.game.black = this.game.black === Bw.black ? Bw.white : Bw.black
  }

  changeWinOrLose() {
    this.game.win = this.game.win === Result.win ? Result.lose : Result.win
  }

  get iconEmotion(): string {
    return this.game.win === Result.win ? 'mdi-emoticon-cool' : 'mdi-emoticon-cry'
  }

  get iconBW(): string {
    return this.game.black === Bw.black ? 'mdi-triangle' : 'mdi-triangle-outline'
  }

  get iconWLColor(): string {
    return this.game.win === Result.win ? 'primary' : 'red'
  }

  get iconBWColor(): string {
    return this.game.black === Bw.white ? 'black' : 'azure'
  }

  get canSubmit() {
    return this.game.myDeck !== null && this.game.oppDeck !== null
  }
}
</script>

<style lang="scss">
.sm-button {
  margin: 1rem;
}
</style>
