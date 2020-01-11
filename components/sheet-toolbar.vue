<template>
  <nav>
    <v-toolbar flat>
      <v-toolbar-title>{{ sheetName }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <ul-tooltip message="対戦記録">
        <v-icon dark>mdi-checkerboard</v-icon>
      </ul-tooltip>
      <ul-tooltip message="分析">
        <v-icon dark>mdi-chart-pie</v-icon>
      </ul-tooltip>
      <ul-tooltip message="デッキ管理">
        <v-icon dark>mdi-account</v-icon>
      </ul-tooltip>
      <setting-account-group :sheet-info="sheetInfo" @invite="invite" />
    </v-toolbar>
  </nav>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import UlTooltip from '@/components/ul-tooltip.vue'
import SettingAccountGroup from '@/components/setting-account-group.vue'
import { SheetInfo } from '@/models/@types/sheet-info'

@Component({
  components: { UlTooltip, SettingAccountGroup }
})
export default class SheetToolbar extends Vue {
  @Prop() sheet!: SheetInfo
  @Prop() sheetName!: string
  @Emit() sendMail(_mail: string): void {}

  invite(mail: string): void {
    this.sendMail(mail)
  }

  get sheetInfo(): SheetInfo | null {
    return this.sheet || null
  }
}
</script>

<style lang="scss" scoped></style>
