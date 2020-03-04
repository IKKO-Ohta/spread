<template>
  <section>
    <v-card class="form">
      <v-card-title>
        デッキ別 勝率集計
        <v-spacer></v-spacer>
        <v-btn icon small>
          <v-icon @click="handleDialog">mdi-settings</v-icon>
        </v-btn>
      </v-card-title>
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
    <v-dialog v-model="dialog" max-width="400px" overlay-opacity="1" class="form">
      <v-card>
        <v-card-title> デッキ別勝率集計の設定 </v-card-title>
        <v-spacer></v-spacer>
        <v-card-text> 現在の設定 {{ cardTitle }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" @click="set">
            変更する
          </v-btn>
          <v-btn @click="handleDialog">
            閉じる
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import { Header, VTableRow } from '@/models/@types/matrix'
import { MAX_SP_WIDTH } from '@/models/const/designs'
import { TestHelper } from '@/lib/test-helper'
import { PerformanceByDeckHeader, PerformanceByDeckBo1Header } from '@/models/const/performance-by-deck-const'
import { DisplayConfig } from '@/models/@types/display-config'

@Component({})
export default class PerformanceByDeck extends Vue {
  @Prop({ required: true }) items!: VTableRow[]
  @Prop({ required: true }) isBo3!: boolean
  @Prop({ required: true }) config!: DisplayConfig
  @Emit() setConfig(_config: DisplayConfig): void {}

  dialog: boolean = false

  shouldColored(headerVal: string): boolean {
    return headerVal !== 'name' && headerVal !== 'mirror'
  }

  getPerformanceColor(item: string): string {
    const arr = item.split('-')
    const X = parseInt(arr[0])
    const n = X + parseInt(arr[1])
    return TestHelper.execTest(X, n)
  }

  handleDialog(): void {
    this.dialog = !this.dialog
  }

  set(): void {
    this.dialog = false
    this.setConfig({
      ...this.config,
      countBothSide: !this.config.countBothSide
    })
  }

  get headers(): Header[] {
    return this.isBo3 ? PerformanceByDeckHeader : PerformanceByDeckBo1Header
  }

  get isPC(): boolean {
    return window.innerWidth > MAX_SP_WIDTH
  }

  get countBothSideString(): string {
    return this.config.countBothSide ? '対戦相手の結果を含んで集計' : 'あなたのデッキ視点のみ集計'
  }
}
</script>
