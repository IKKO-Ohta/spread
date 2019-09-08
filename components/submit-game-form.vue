<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col cols="12" md="2">
          <v-select
            v-model="select"
            :items="decklist"
            :rules="[v => !!v || '必須']"
            label="Your Deck"
            required
          ></v-select>
        </v-col>

        <v-col cols="12" md="2">
          <v-select
            v-model="select"
            :items="decklist"
            :rules="[v => !!v || '必須']"
            label="Opponent's Deck"
            required
          ></v-select>
        </v-col>

        <v-col cols="12" md="1">
          <v-btn :color="iconWLColor" depressed @click="changeWinOrLose" class="sm-button">
            <v-icon left>{{iconEmotion}}</v-icon>
            {{ win ? "WIN" : "LOSE"}}
          </v-btn>
        </v-col>

        <v-col cols="12" md="1">
          <v-btn :color="iconBWColor" depressed @click="changeBlackOrWhite" class="sm-button">
            <v-icon left>{{iconBW}}</v-icon>
            {{ black ? "先攻" : "後攻"}}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>


<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class submitGameForm extends Vue {
  @Prop({ required: true }) decklist!: string[]

  win = true
  black = true

  changeBlackOrWhite() {
    this.black = !this.black
  }
  changeWinOrLose() {
    this.win = !this.win
  }

  get iconEmotion(): string {
    return this.win ? 'mdi-emoticon-cool' : 'mdi-emoticon-cry'
  }
  get iconBW(): string {
    return this.black ? 'mdi-triangle' : 'mdi-triangle-outline'
  }

  get iconWLColor(): string {
    return this.win ? 'primary' : 'red'
  }
  get iconBWColor(): string {
    return this.black ? 'black' : 'azure'
  }
}
</script>

<style lang="scss">
.sm-button {
  margin: 5px;
}
</style>