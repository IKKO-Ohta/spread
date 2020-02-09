<template>
  <section>
    <v-card class="form">
      <v-card-title>デッキ別 勝率集計</v-card-title>
      <v-card-text>
        <v-data-table :headers="headers" :items="items" disable-sort :hide-default-header="!isPC">
          <template v-if="isPC" v-slot:body="props">
            <tr v-for="(item, i) in props.items" :key="i">
              <td v-for="(header, j) in headers" :key="j">
                <v-chip v-if="shouldColored(header.value)" outlined :ripple="false" :color="getPerformanceColor(item[header.value])">{{ item[header.value] }}</v-chip>
                <nav v-else>{{ item[header.value] }}</nav>
              </td>
            </tr>
          </template>
          <template v-else v-slot:body="props">
            <tbody>
              <tr v-for="(item, i) in props.items" :key="i" class="v-data-table__mobile-table-row">
                <td v-for="(header, j) in headers" :key="j" class="v-data-table__mobile-row">
                  <div class="v-data-table__mobile-row__header">
                    {{ header.text }}
                  </div>
                  <div class="v-data-table__mobile-row__cell">
                    <v-chip v-if="header.value !== 'name' && header.value !== 'mirror'" outlined :ripple="false" :color="getPerformanceColor(item[header.value])">{{ item[header.value] }}</v-chip>
                    <nav v-else>{{ item[header.value] }}</nav>
                  </div>
                </td>
              </tr>
            </tbody>
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
import { MAX_SP_WIDTH } from '@/models/const/designs'
import { PerformanceByDeckHelper } from '@/lib/performance-by-deck-helper'
import { TestHelper } from '@/lib/test-helper'
import { PerformanceByDeckHeader, PerformanceByDeckBo1Header } from '@/models/const/performance-by-deck-const'

@Component({})
export default class PerformanceByDeck extends Vue {
  @Prop({ required: true }) games!: GameInfo[]
  @Prop() isBo3!: boolean | undefined

  shouldColored(headerVal: string): boolean {
    return headerVal !== 'name' && headerVal !== 'mirror'
  }

  getPerformanceColor(item: string): string {
    const arr = item.split('-')
    const X = parseInt(arr[0])
    const n = X + parseInt(arr[1])
    return TestHelper.execTest(X, n)
  }

  get items(): VTableRow[] {
    return PerformanceByDeckHelper.calcPerformanceByDeck(this.games)
  }

  get headers(): Header[] {
    return this.isBo3 ? PerformanceByDeckHeader : PerformanceByDeckBo1Header
  }

  get isPC(): boolean {
    return window.innerWidth > MAX_SP_WIDTH
  }
}
</script>
