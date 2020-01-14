<template>
  <section>
    <v-card class="form">
      <v-card-title>デッキ パフォーマンス</v-card-title>
      <v-card-text>
        <v-data-table :headers="headers" />
      </v-card-text>
    </v-card>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Game } from '@/models/@types/game'
import { Header } from '@/models/@types/matrix'
import { AnalyticsHelper } from '@/lib/analytics-helper'

@Component({})
export default class PerformanceMatrix extends Vue {
  @Prop({ required: true }) games!: Game[]

  get headers(): Header[] {
    return AnalyticsHelper.extractHeader(this.games)
  }
}
</script>
