<template>
  <section>
    <v-card class="form">
      <v-card-title>デッキ パフォーマンス</v-card-title>
      <v-card-text>
        <v-data-table :headers="headers" :items="items" />
      </v-card-text>
    </v-card>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { GameInfo } from '@/models/@types/game'
import { Header, VTableRow } from '@/models/@types/matrix'
import { AnalyticsHelper } from '@/lib/analytics-helper'

@Component({})
export default class PerformanceMatrix extends Vue {
  @Prop({ required: true }) games!: GameInfo[]
  isHiddenDraw = true

  get items(): VTableRow[] {
    const matrix = AnalyticsHelper.extractData(this.games)
    const decklist = AnalyticsHelper.getAllDecks(this.games)
    return AnalyticsHelper.transformMatrixIntoVDataset(matrix, decklist)
  }

  get headers(): Header[] {
    return AnalyticsHelper.extractHeader(this.games)
  }
}
</script>
