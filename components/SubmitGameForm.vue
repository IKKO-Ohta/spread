<template>
  <v-card class="form">
    <v-card-title>ゲームレコードを登録</v-card-title>
    <v-card-text>
      <v-form>
        <v-container>
          <v-row>
            <v-col cols="12" md="2">
              <v-select v-model="game.myDeck" :items="decklist" :rules="[(v) => !!v || '必須']" label="Your Deck" required />
            </v-col>

            <v-col cols="12" md="2">
              <v-select v-model="game.oppDeck" :items="decklist" :rules="[(v) => !!v || '必須']" label="Opponent's Deck" required />
            </v-col>

            <v-col cols="12" md="1">
              <v-btn large :color="iconWLColor" depressed class="sm-button" @click="changeWinOrLose">
                <v-icon left>
                  {{ iconEmotion }}
                </v-icon>
                {{ game.win }}
              </v-btn>
            </v-col>

            <v-col cols="12" md="1">
              <v-btn large :color="iconBWColor" depressed class="sm-button" @click="changeBlackOrWhite">
                <v-icon left>
                  {{ iconBW }}
                </v-icon>
                {{ game.black }}
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn depressed @click="emitSubmitGame">
        登録
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import format from 'date-fns/format'
import ja from 'date-fns/locale/ja'
import Game from '@/models/const/Game'
import { Result, Bw } from '@/models/const/Enums'

@Component({})
export default class SubmitGameForm extends Vue {
  @Prop({ required: true }) decklist!: string[]
  @Emit() submit(_game: Game) {}

  game: Game = {
    win: Result.win,
    black: Bw.black,
    myDeck: null,
    oppDeck: null,
    user: 'samayotta',
    timestamp: this.timestamp,
    describe: ''
  }

  async emitSubmitGame() {
    this.game.timestamp = this.timestamp
    if (this.canSubmit) {
      try {
        await this.sendFireStore()
        this.submit(this.game)
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('oops,', e)
      }
    }
  }

  changeBlackOrWhite() {
    this.game.black = this.game.black === Bw.black ? Bw.white : Bw.black
  }

  changeWinOrLose() {
    this.game.win = this.game.win === Result.win ? Result.lose : Result.win
  }

  sendFireStore() {
    return this.$firestore
      .collection('sheet')
      .doc(`${this.$route.params.slug}`)
      .collection('games')
      .add(this.game)
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

  get timestamp() {
    return format(new Date(), 'yyyy/MM/dd HH:mm:ss', { locale: ja })
  }

  get canSubmit() {
    return this.game.myDeck !== null && this.game.oppDeck !== null
  }
}
</script>

<style lang="scss">
.sm-button {
  margin: 5px;
}
</style>
