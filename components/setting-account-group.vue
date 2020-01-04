<template>
  <section>
    <ul-tooltip message="メンバー管理">
      <v-icon dark @click="openDialog">mdi-account-group-outline</v-icon>
    </ul-tooltip>
    <v-dialog v-model="dialog" max-width="600px">
      <v-card class="form">
        <v-card-title>メンバー管理</v-card-title>
        <v-list>
          <v-subheader>現在参加しているメンバー</v-subheader>
          <v-list-item v-for="(member, i) in members" :key="i">
            <v-list-item-content>
              <span> {{ member }}</span>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-card-text>
          <v-text-field v-model="mailAdressToInvite" label="招待メールの送り先" required> </v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn depressed :disabled="!canSubmit" @click="submit">
            招待メールを送る
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Emit } from 'vue-property-decorator'
import UlTooltip from '@/components/ul-tooltip.vue'

@Component({
  components: { UlTooltip }
})
export default class SettingAccountGroup extends Vue {
  @Emit() invite(): void {}

  mailAdressToInvite = ''
  dialog = false
  members = ['samayotta@gmail.com', 'samayotta@apple.com']

  openDialog(): void {
    this.dialog = true
  }

  submit(): void {
    this.dialog = false
    this.invite()
  }

  get canSubmit(): boolean {
    return this.mailAdressToInvite !== ''
  }
}
</script>
