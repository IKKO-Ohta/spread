<template>
  <section>
    <sheet-toolbar :sheet="sheet" @send-mail="sendMail" @emit-submit-deck="submitDeck" @emit-submit-decklist="submitDecklist" @emit-submit-delete="submitDelete" />
    <performance-matrix :games="games" />
    <performance-by-deck :games="games" :is-bo3="isBo3" />
  </section>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import { Mixins } from 'vue-mixin-decorator'
import SheetPageMixin from '@/mixins/sheet-page-mixins'
import PerformanceMatrix from '@/components/performance-matrix.vue'
import PerformanceByDeck from '@/components/performance-by-deck.vue'
import SheetToolbar from '@/components/sheet-toolbar.vue'

@Component({
  components: {
    PerformanceMatrix,
    PerformanceByDeck,
    SheetToolbar
  }
})
export default class AnalyticsPage extends Mixins<SheetPageMixin>(SheetPageMixin) {}
</script>

<style lang="scss">
.form {
  margin-bottom: 1rem;
}
</style>
