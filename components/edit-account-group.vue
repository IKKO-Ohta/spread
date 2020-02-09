<template>
  <section>
    <ul-tooltip message="メンバー管理">
      <v-icon @click="openDialog">mdi-account-group-outline</v-icon>
    </ul-tooltip>
    <!-- TODO: dialogを上に移し、v-modelで管理するようにし、ステートを減らす -->
    <v-dialog v-model="dialog" max-width="600px">
      <v-card class="form">
        <v-card-title>メンバー管理</v-card-title>
        <v-card-text>
          <v-list>
            <v-subheader>現在参加しているメンバー</v-subheader>
            <v-list-item v-for="(mem, i) in members" :key="i">
              <v-list-item-content>
                <span> {{ mem }}</span>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-text>
          <v-text-field v-model="mailAdressToInvite" label="招待を送るGmailアカウント" required> </v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn depressed :disabled="!canSubmit" @click="submit">
            招待メールを送る
          </v-btn>
          <v-btn depressed @click="closeDialog">
            閉じる
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Emit, Prop } from 'vue-property-decorator'
import UlTooltip from '@/components/ul-tooltip.vue'
import { SheetInfo } from '@/models/@types/sheet-info'

@Component({
  components: { UlTooltip }
})
export default class SettingAccountGroup extends Vue {
  @Prop() sheetInfo!: SheetInfo | null
  @Emit() invite(_mail: string): void {}

  members: string[] = []
  mailAdressToInvite = ''
  dialog = false

  openDialog() {
    this.members = this.getSheetMember()
    this.dialog = true
  }

  closeDialog() {
    this.dialog = false
    this.mailAdressToInvite = ''
  }

  submit(): void {
    if (!this.canSubmit) {
      return
    }

    this.dialog = false
    this.invite(this.mailAdressToInvite)
    this.mailAdressToInvite = ''
  }

  getSheetMember(): string[] {
    return this.sheetInfo ? this.sheetInfo.members : []
  }

  get canSubmit(): boolean {
    return this.mailAdressToInvite.includes('@gmail.com')
  }
}
</script>
