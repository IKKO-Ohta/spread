<template>
  <section>
    <v-card class="form">
      <v-card-title>デッキ パフォーマンス</v-card-title>
      <v-card-text>
        <v-data-table :headers="headers" :items="items">
          <template v-slot:body="props">
            <tr v-for="(item, i) in props.items" :key="i">
              <td v-for="(header, j) in headers" :key="j">
                <v-chip v-if="header.value !== 'name'" outlined :ripple="false" :color="getPerformanceColor(item[header.value])">{{ item[header.value] }}</v-chip>
                <nav v-else>{{ item[header.value] }}</nav>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { GameInfo } from '@/models/@types/game'
import { Header, VTableRow } from '@/models/@types/matrix'
import { PerformanceMatrixHelper } from '@/lib/performance-matrix-helper'
import { TestHelper } from '@/lib/test-helper'

@Component({})
export default class PerformanceMatrix extends Vue {
  @Prop({ required: true }) games!: GameInfo[]
  isHiddenDraw = true

  get items(): VTableRow[] {
    const matrix = PerformanceMatrixHelper.extractData(this.games)
    const decklist = PerformanceMatrixHelper.getAllDecks(this.games)
    return PerformanceMatrixHelper.transformMatrixIntoVDataset(matrix, decklist)
  }

  get headers(): Header[] {
    return PerformanceMatrixHelper.extractHeader(this.games)
  }

  getPerformanceColor(item: string): string {
    const arr = item.split('-')
    const X = parseInt(arr[0])
    const n = X + parseInt(arr[1])
    return TestHelper.execTest(X, n)
  }
}
</script>
