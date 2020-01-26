<template>
  <v-chip-group class="ma-2" column>
    <v-chip @click="handleMatchBw('game1')">
      <v-icon left> {{ getIconBW(match.game1.bw) }} </v-icon>
      {{ match.game1.bw }}
    </v-chip>
    <v-chip @click="handleMatchBw('game2')">
      <v-icon left> {{ getIconBW(match.game2.bw) }} </v-icon>
      {{ match.game2.bw }}
    </v-chip>
    <v-chip v-if="isGame3" @click="handleMatchBw('game3')">
      <v-icon left> {{ getIconBW(match.game3.bw) }} </v-icon>
      {{ match.game3.bw }}
    </v-chip>
  </v-chip-group>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import { Match, GameNumber } from '@/models/@types/game'
import { Bw } from '@/models/const/enums'

@Component({})
export default class VChipsWBws extends Vue {
  @Prop({ required: true }) match!: Match
  @Emit() handleBw(_gameNumber: GameNumber) {}

  handleMatchBw(gameNumber: GameNumber) {
    this.handleBw(gameNumber)
  }

  getIconBW(bw: Bw): string {
    return bw === Bw.black ? 'mdi-triangle' : 'mdi-triangle-outline'
  }

  get isGame3(): boolean {
    return this.match.game1.win !== this.match.game2.win
  }
}
</script>
