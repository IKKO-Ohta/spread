<template>
  <section>
    <sheet-toolbar :sheet="sheet" @send-mail="sendMail" @emit-submit-deck="submitDeck" @emit-submit-decklist="submitDecklist" @emit-submit-delete="submitDelete" />
    <performance-matrix :games="games" />
    <performance-by-deck :items="performanceByDeckItems" :config="performanceByDeckConfig" :is-bo3="isBo3" @set-config="setPerformanceByDeckConfig" />
  </section>
</template>

<script lang="ts">
import { Component, Watch } from 'nuxt-property-decorator'
import { Mixins } from 'vue-mixin-decorator'
import SheetPageMixin from '@/mixins/sheet-page-mixins'
import PerformanceMatrix from '@/components/performance-matrix.vue'
import PerformanceByDeck from '@/components/performance-by-deck.vue'
import SheetToolbar from '@/components/sheet-toolbar.vue'
import { DisplayConfig } from '@/models/@types/display-config'
import { defaultDisplayConfig } from '@/models/const/default-display-config'
import { PerformanceByDeckHelper } from '@/lib/performance-by-deck-helper'

import { VTableRow } from '@/models/@types/matrix'

@Component({
  components: {
    PerformanceMatrix,
    PerformanceByDeck,
    SheetToolbar
  }
})
export default class AnalyticsPage extends Mixins<SheetPageMixin>(SheetPageMixin) {
  performanceByDeckConfig: DisplayConfig = { ...defaultDisplayConfig }
  performanceByDeckHelper!: PerformanceByDeckHelper
  performanceByDeckItems: VTableRow[] = []

  created(): void {
    this.performanceByDeckHelper = new PerformanceByDeckHelper(this.performanceByDeckConfig)
  }

  setPerformanceByDeckConfig(config: DisplayConfig) {
    this.performanceByDeckConfig = config
    this.performanceByDeckHelper = new PerformanceByDeckHelper(this.performanceByDeckConfig)
    this.performanceByDeckItems = [...this.performanceByDeckHelper.calcPerformanceByDeck(this.games)]
  }

  @Watch('games')
  setPerformanceByDeckItems(): void {
    this.performanceByDeckItems = [...this.performanceByDeckHelper.calcPerformanceByDeck(this.games)]
  }
}
</script>

<style lang="scss">
.form {
  margin-bottom: 1rem;
}
</style>
