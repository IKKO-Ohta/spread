<template>
  <nav>
    <v-toolbar flat>
      <v-toolbar-title>{{ sheetName }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <ul-tooltip message="対戦記録">
        <v-icon @click="goToSheetPage">mdi-checkerboard</v-icon>
      </ul-tooltip>
      <ul-tooltip message="分析">
        <v-icon @click="goToAnalyticsPage">mdi-chart-pie</v-icon>
      </ul-tooltip>
      <edit-decks :sheet-info="sheetInfo" @submit-deck="submit" @submit-decklist="submitDecklist" @submit-delete="submitDelete" />
      <edit-account-group :sheet-info="sheetInfo" @invite="invite" />
    </v-toolbar>
  </nav>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import UlTooltip from '@/components/ul-tooltip.vue'
import EditAccountGroup from '@/components/edit-account-group.vue'
import EditDecks from '@/components/edit-decks.vue'
import { SheetInfo } from '@/models/@types/sheet-info'

@Component({
  components: { UlTooltip, EditAccountGroup, EditDecks }
})
export default class SheetToolbar extends Vue {
  @Prop() sheet!: SheetInfo
  @Emit() sendMail(_mail: string): void {}
  @Emit() emitSubmitDeck(_deck: string): void {}
  @Emit() emitSubmitDecklist(_deck: string, _decklist: string): void {}
  @Emit() emitSubmitDelete(_deck: string): void {}

  submit(deck: string) {
    this.emitSubmitDeck(deck)
  }

  submitDecklist(deck: string, decklist: string) {
    this.emitSubmitDecklist(deck, decklist)
  }

  submitDelete(deck: string) {
    this.emitSubmitDelete(deck)
  }

  invite(mail: string): void {
    this.sendMail(mail)
  }

  goToAnalyticsPage(): void {
    this.$router.push(`/sheets/${this.$route.params.slug}/analytics`)
  }

  goToSheetPage(): void {
    this.$router.push(`/sheets/${this.$route.params.slug}/`)
  }

  get sheetInfo(): SheetInfo | null {
    return this.sheet || null
  }

  get sheetName(): string {
    if (this.sheet) {
      return this.sheet.sheetName
    } else {
      return ''
    }
  }
}
</script>

<style lang="scss" scoped></style>
