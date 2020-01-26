<template>
  <v-chip-group class="ma-2" column>
    <v-chip @click="handleMatchWin('game1')">
      <v-icon left>{{ getIconEmotion(match.game1.win) }}</v-icon>
      {{ match.game1.win }}
    </v-chip>
    <v-chip @click="handleMatchWin('game2')">
      <v-icon left>{{ getIconEmotion(match.game2.win) }}</v-icon>
      {{ match.game2.win }}
    </v-chip>
    <v-chip v-if="isGame3" @click="handleMatchWin('game3')">
      <v-icon left>{{ getIconEmotion(match.game3.win) }}</v-icon>
      {{ match.game3.win }}
    </v-chip>
  </v-chip-group>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import { Match, GameNumber } from '@/models/@types/game'
import { Result } from '@/models/const/enums'

@Component({})
export default class VChipsWins extends Vue {
  @Prop({ required: true }) match!: Match
  @Emit() handleWin(_gameNumber: GameNumber) {}

  handleMatchWin(gameNumber: GameNumber) {
    this.handleWin(gameNumber)
  }

  getIconEmotion(result: Result): string {
    return result === Result.win ? 'mdi-emoticon-cool' : 'mdi-emoticon-cry'
  }

  get isGame3(): boolean {
    return this.match.game1.win !== this.match.game2.win
  }
}
</script>
